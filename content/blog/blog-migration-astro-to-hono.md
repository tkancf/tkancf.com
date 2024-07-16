---
title: "ブログをAstroからHonoのSSGに移行しました"
description: "このブログの生成をAstroからHonoのSSG機能での自作に移行しました。移行にあたり知見がいくつか溜まったので、メモとして公開します。"
pubDate: "2024-03-04"
---

このブログは元々Astroを使って生成していました。

Astroはサクッとコンテンツメインのサイトが作れて便利なんですが、[Blogを作り、育み、慈しむ ~ Blog Hacks 2024](https://junkyard.song.mu/slides/yapc-hiroshima-2024/#0)というスライドを見て、もうちょっと「好きなもの」を使って作り変えるのも良いかなと思っていました。

同じくらいの時期に[Honoのv4でSSGが可能になり](https://zenn.dev/yusukebe/articles/b20025ebda310a)、触ってみたい気持ちが高まっていたので移行してみました。

Honoは以前、CloudFlare Workersで[LINE botを作ったとき](https://tkancf.com/blog/creating-line-bot-with-cloudflare-workers-d1-and-hono)に使ったんですが、かなり感触が良かったので定期的に状況をウォッチしていました。  
Hono自体も良いですし、[作者さん(@yusukebe)](https://github.com/yusukebe)のブログがワクワクする内容で好きなんですよね。  
[Honoのv4が2月9日にリリースされます](https://zenn.dev/yusukebe/articles/b20025ebda310a)とか、[OSSで世界と戦うために - ゆーすけべー日記](https://yusukebe.com/posts/2023/oss-against-the-world/)とか。

## 移行作業について

移行と言いつつ既存のコードはほとんど残っておらず、記事以外はほぼ作り直しになりましたが、Honoはシンプルで公式ドキュメントもexampleが分かりやすく、[先行事例](https://zenn.dev/razokulover/articles/9818ef632f677f)もあったので、大きくハマって悩むこともなく作れました。  
ざっくり以下のような流れで作りました。

- [yusukebe/hono-ssg-example](https://github.com/yusukebe/hono-ssg-example/)を参考に最小構成で動くことを確認
- [remark](https://remark.js.org/)を使ってMarkdownからHTML生成→表示確認
- CSSを適用
- sitemapを追加
- RSSフィード作成
- デプロイして動作確認

## やったこと

私が雑にお試しして試行錯誤しているリポジトリは[GitHub - tkancf/sandbox](https://github.com/tkancf/sandbox/tree/main/hono-ssg)です。

### 最小構成で動かしてみる

まずは、Hono作者さんの[yusukebe/hono-ssg-example](https://github.com/yusukebe/hono-ssg-example/)を参考に別のリポジトリでとりあえず生成できることを確認するだけのコードを用意してみました。  
[yusukebe/hono-ssg-example](https://github.com/yusukebe/hono-ssg-example/)はHono v4公開前にpatchを適用して作成しているexampleだったので、改変しつつ動かしてみました。  
[この辺りのcommit](https://github.com/tkancf/sandbox/tree/22af695683965d210df1c0d50d87c14ad1b5a1fd/hono-ssg)が最小構成で動くことを確認できた所だと思います。  

[Hono v4紹介記事](https://zenn.dev/yusukebe/articles/b20025ebda310a)では、静的ページを生成するために`build.ts`というファイルを作っていましたが、`@hono/vite-ssg`というViteのプラグインを使えば`build.ts`は不要でした。  
細かい部分は[該当commit](https://github.com/tkancf/sandbox/tree/22af695683965d210df1c0d50d87c14ad1b5a1fd/hono-ssg)をみてもらうと分かりますが、ポイントを一部抜粋して記載します。

以下が`vite.config.ts`です。  
`@hono/vite-ssg`を使うと、`vite build`実行時に各ページを生成してくれます。

```typescript
import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg"; // 追加
import devServer from "@hono/vite-dev-server";

const entry = "src/index.tsx";

export default defineConfig(() => {
  return {
    plugins: [devServer({ entry }), ssg({ entry })], // ssg({entry})を追加
  };
});
```

`src/index.tsx`についてはほぼ見た通りで、該当コードは[こちら](https://github.com/tkancf/sandbox/blob/22af695683965d210df1c0d50d87c14ad1b5a1fd/hono-ssg/src/index.tsx)です。  
`ssgParams(() => posts),`の部分は、Path Parameterがついた各パスに静的に生成されるパスを割り当てるためのミドルウェアです。  
これがないと、`/posts/hoge`みたいなページが生成されません。  

私はNext.jsを触ったことがないので知りませんでしたが、Next.jsの[generateStaticPaths](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)と似た機能らしいです。  

```typescript
app.get(
  "/posts/:id",
  ssgParams(() => posts),
  (c) => {
    return c.render(<h1>{c.req.param("id")}</h1>);
  }
);
```

### Markdownから記事生成

ここはHono関係なく、Astroのブログテンプレートだとデフォルトで用意されていたMarkdown→HTML変換を自前で用意する工程です。  
[Astroのドキュメント](https://docs.astro.build/en/guides/markdown-content/)を見ると[remark](https://remark.js.org/)というライブラリを使っていると書いていたので、同じライブラリを使って同様の機能を用意しました。  
該当コードは[src/lib/post.ts](https://github.com/tkancf/tkancf.com/blob/bc9f6936b2bd0a73d997281892e1c11c16bfce14/src/lib/post.ts)です。remarkを使えば簡単に用意できました。

こんな感じでパースできます。便利。

```typescript
      const content = fs.readFileSync(filePath, { encoding: "utf-8" });
      const result = await remark()
        .use(remarkParse)
        .use(remarkFrontmatter, [
          { type: "yaml", marker: "-", anywhere: false },
        ])
        .use(remarkExtractFrontmatter, {
          yaml: yaml.parse,
          name: "frontMatter",
        })
        .use(remarkExpressiveCode, {
          theme: "github-light",
        })
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .use(remarkGfm)
        .process(content);
```

### sitemapの生成

こちらもAstroのブログテンプレートだとデフォルトで用意されていましたが、自前で生成してあげる必要があります。  
とは言ってもコード書くまでもなかったです。

`vite-plugin-sitemap`を入れて、`vite.config.ts`に設定を書いてあげるだけで完了しました。

追加後の`vite.config.ts`

```typescript
import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";
import devServer from "@hono/vite-dev-server";
import Sitemap from "vite-plugin-sitemap";  // vite-plugin-sitemapをいれて
import { baseURL } from "./src/lib/constants";

const entry = "src/index.tsx";

export default defineConfig(() => {
  return {
    plugins: [
      devServer({ entry }),
      ssg({ entry }),
      Sitemap({ hostname: baseURL, generateRobotsTxt: true }), // ←追加した設定はこの部分
    ],
  };
});
```

### RSSフィードの生成

こちらもAstroのブログテンプレートだとデフォルトで用意されていたRSSフィードを生成してあげます。  
記事一覧のデータさえ用意出来ていれば`rss`を利用してサクッと作れます。

```typescript
import RSS from "rss";

(中略)

const generateFeed = async () => {
  const rss = new RSS({
    title: siteName,
    site_url: baseURL,
    description: siteName,
    feed_url: baseURL + "/feed",
    generator: siteName,
  });
  posts.forEach(async (post: any) => {
    const url = baseURL + "/blog/" + post.slug;
    rss.item({
      title: post.title,
      url: url,
      date: new Date(post.pubDate),
      description: post.description,
    });
  });

  return rss.xml();
};

app.get("/feed", async (c) => {
  const feeds = await generateFeed();
  return c.text(feeds, 200, {
    "Content-Type": "text/xml",
  });
});
```

### CSSの適用

Honoには`hono/css`というCSS in JSのヘルパーがあるので、それを利用しました。  

グローバルなCSSをどう適用すれば良いのかちょっと試行錯誤しましたが、以下のようにhtmlタグに全体適用したいCSSを付与してあげて、headタグ内に `<Style />`を書いておけば良い感じになりました。

```typescript
export const Layout: FC = (props) => {
  return (
    <html class={globalCSS}> // ここでグローバルなCSSを適用
      <Head metadata={props.metadata} />
      <Header {...props} />
      <main>{props.children}</main>
      <Footer />
    </html>
  );
};
```

```typescript
export const Head: FC = (props) => {
  return (
    <head>
      <title>{props.metadata.title}</title>
      <Style /> // これが必要
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <link rel="sitemap" href="/sitemap.xml" />
      <meta charset="utf-8" />
(中略)
    </head>
  );
};
```

### DOCTYPEの設定

`jsxRenderer`ミドルウェアを利用して以下のように付与できます。最初`jsxRenderer`ミドルウェア要らないかなと思って消していたんですが、PageSpeed InsightsでDOCTYPEが無いと警告されました。  

`jsxRenderer`ミドルウェアを利用していれば、デフォルトで付与されます。`{ docType: false }`とすることで明示的に消すことも可能なようです。

```typescript
import { jsxRenderer } from "hono/jsx-renderer";
(中略)
app.all(
  "*",
  jsxRenderer(
    ({ children }) => {
      return <>{children}</>;
    },
    { docType: "<!DOCTYPE html>" }
  )
);
```

### デプロイ

Astroを利用していたときからCloudflare Pagesでホストしていたので、そこは変えませんでした。  
GitHubリポジトリと接続してあるので、Cloudflare Pagesの設定画面からBuild configurationsだけ今回構築したものと合わせてあげるだけでOKです。  

※ただ、今回はoutput directoryも何も変わらなかったので全部そのままです。

[yusukebe/hono-ssg-example](https://github.com/yusukebe/hono-ssg-example/blob/main/package.json)を参考にしたんですが、`package.json`に以下のようなスクリプトがあると、`./dist`配下をCloudflare Pagesへすぐにデプロイできます。  
ある程度完成した段階で「Cloudflare Pages上で動き見てみたいな」と思ったときにシュッと確認できて便利でした。

```json
  "scripts": {
(中略)
    "deploy": "$npm_execpath run build && wrangler pages deploy ./dist --commit-dirty=true"
  },
```

## まとめ

以上、AstroからHonoのSSGへの移行記録でした。  
最終的な成果物は[GitHub - tkancf/tkancf.com](https://github.com/tkancf/tkancf.com)にあるので、興味があれば見てみてください。

Astroがよしなにやってくれてたんだな〜というありがたみを感じつつ、思った以上にシュッとHonoへ移行できたので良かったです。

よく分からずにAstroデフォルトのテンプレートを使ってる状態から脱したので「自分で作った感」が得られたのが一番良いですね。  
今後もブログ弄りが捗りそうです。

## 参考資料

下記リンク先を参考にさせていただきました。大感謝です。

- [Honoのv4が2月9日にリリースされます](https://zenn.dev/yusukebe/articles/b20025ebda310a)
- [個人ブログをNext.jsのSSGからHonoのSSGに移行した](https://zenn.dev/razokulover/articles/9818ef632f677f)
- [YuheiNakasaka/gialog-diary](https://github.com/YuheiNakasaka/gialog-diary/)
- [yusukebe/hono-ssg-example](https://github.com/yusukebe/hono-ssg-example/)
- [DOM 要素 – React](https://ja.legacy.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [jbaubree/vite-plugin-sitemap: Sitemap generator plugin for Vite](https://github.com/jbaubree/vite-plugin-sitemap)
- [Blogを作り、育み、慈しむ ~ Blog Hacks 2024](https://junkyard.song.mu/slides/yapc-hiroshima-2024/#0)
- [Data Fetching: getStaticPaths | Next.js](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)
- Honoドキュメント
  - [JSX Renderer Middleware - Hono](https://hono.dev/middleware/builtin/jsx-renderer)
  - [App - Hono - Hono](https://hono.dev/api/hono)
  - [SSG Helper - Hono](https://hono.dev/helpers/ssg)
  - [css Helper - Hono](https://hono.dev/helpers/css)
- remark関連
  - [remark - markdown processor powered by plugins](https://remark.js.org/)
  - [remarkjs/remark-gfm: remark plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists)](https://github.com/remarkjs/remark-gfm)
  - [remarkjs/remark: markdown processor powered by plugins part of the @unifiedjs collective](https://github.com/remarkjs/remark)
  - [expressive-code/packages/remark-expressive-code at main · expressive-code/expressive-code](https://github.com/expressive-code/expressive-code/tree/main/packages/remark-expressive-code)
  - [Syntax Highlighting | Expressive Code](https://expressive-code.com/key-features/syntax-highlighting/)
