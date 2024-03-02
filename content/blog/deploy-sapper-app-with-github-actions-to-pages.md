---
title: "Sapperで作ったアプリをGitHub ActionsでビルドしてGitHub Pagesで公開する"
description: "Sapperで作ったアプリをGitHub ActionsでビルドしてGitHub Pagesで公開する方法についてハマりどころがあったのでメモ"
pubDate: "2022/08/21"
heroImage: "/placeholder-hero.webp"
---

## 概要

Sapperで作ったアプリをGitHub ActionsでビルドしてGitHub Pagesで公開しようとした所、
BaseURLの設定周りで思ったよりハマってしまったので、記事にしておきます。

- [サンプルリポジトリ](https://github.com/tkancf/sapper-gh-pages-gh-actions)  

## 実現したいこと

- アプリのexportはGitHub Actionsで実行する
- Sapperで作ったアプリをGitHub Pagesで公開する
  - 公開先のURLは `https://<username>.github.io/<repository name>/` とする

## 前提

- Sapper v0.28.10
- node v14.13.0

## 手順

## アプリを作成

今回は[公式ページ](https://sapper.svelte.dev/)に書いてあるテンプレートのアプリをデプロイしますので、
まずはテンプレートアプリをnpxでとってきます。

```bash
❯ npx degit "sveltejs/sapper-template#rollup" sapper-gh-pages-gh-actions
npx: installed 1 in 1.19s
> cloned sveltejs/sapper-template#rollup to sapper-gh-pages-gh-actions
❯ cd sapper-gh-pages-gh-actions
```

現在はTypeScriptがサポートされているので、TypeScriptを有効化しておきます。  
下記コマンドを実行するだけです。

```bash
❯ node scripts/setupTypeScript.js
Adding TypeScript with Rollup...
Converted to TypeScript.
```

`npm install` を実行後、 `npm run dev` を実行して、動作確認してみます。  
localhost:3000 をブラウザから開くと、ナイスガイが決めポーズをしている画像が表示されるはずです。

```bash
❯ npm install
.
.
```

※`npm install`長いので割愛してます。

```bash
❯ npm run dev

> TODO@0.0.1 dev /Users/tkancf/src/github.com/tkancf/sapper-gh-pages-gh-actions
> sapper dev

✔ server (2.7s)
✔ client (2.7s)
> Listening on http://localhost:3000
✔ service worker (576ms)
```

ここまでは [公式ページのGetting started](https://sapper.svelte.dev/docs#Getting_started) にも書いてある内容なので、
問題ないはずです。

## BaseURL の変更

公開したいページのURLが  
`https://<username>.github.io/<repository name>/` となります。  
末尾にサブディレクトリの形でリポジトリ名が入っており、今のアプリのままでは画像等が表示されません。

まずはアプリをこのURL形式に対応させます。変更箇所は以下の2箇所です。  
Gitのdiffを貼っておきます。各々のリポジトリ名に合わせて読み替えて下さい。

### `src/server.ts`

```diff
diff --git a/src/server.ts b/src/server.ts
index c77f593..085e55a 100644
--- a/src/server.ts
+++ b/src/server.ts
@@ -8,6 +8,7 @@ const dev = NODE_ENV === 'development';

 polka() // You can also use Express
        .use(
+               'sapper-gh-pages-gh-actions',
                compression({ threshold: 0 }),
                sirv('static', { dev }),
                sapper.middleware()
```

### `rollup.config.js`

```diff
diff --git a/rollup.config.js b/rollup.config.js
index b5f1b96..3999295 100644
--- a/rollup.config.js
+++ b/rollup.config.js
@@ -39,7 +39,7 @@ export default {
                        }),
                        url({
                                sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
-                               publicPath: '/client/'
+                               publicPath: '/sapper-gh-pages-gh-actions/client/'
                        }),
                        resolve({
                                browser: true,
```

上記を追加した後、再度 `npm run dev` を実行すると、 `localhost:3000/<repository name>` がアプリのURLになっているはずです。

## GitHub Actionsの設定

アプリは用意出来たのでGitHub Actionsを設定します。  
`.github/workflows/deploy.yml` というファイルを作成して以下の内容を書きます。(`sapper-gh-pages-gh-actions` の部分は適宜自分のリポジトリ名に変更して下さい。)

GitHub Actionsの [truewebartisans/actions-sapper](https://github.com/truewebartisans/actions-sapper)、
[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)を利用しています。  

```yaml
name: deploy
on: push
jobs:
  build_deploy:
    name: Build sapper app
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@master
      - name: Build Sapper
        uses: truewebartisans/actions-sapper@master
        with:
          args: "--legacy --basepath sapper-gh-pages-gh-actions"
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: __sapper__/export/sapper-gh-pages-gh-actions
          publish_branch: gh-pages
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## デプロイ

GitHubへpushしたら、リポジトリのSettingsからGithub PagesのSourceを gh-pages ブランチの `/(root)`に設定します。

ここまでの設定が問題なく完了していれば、 `https://<username>.github.io/<repository name>/` でアプリが確認出来るはずです。

## あとがき

今回GitHub Actionsを初めて使ったんですが、便利ですね。色々と使い道はあるようなので、調べつつもう少し試してみたいと思います。  
