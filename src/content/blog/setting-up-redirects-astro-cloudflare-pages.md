---
title: "CloudFlare PagesでホストしているAstro.jsブログでリダイレクトする方法"
description: "CloudFlare PagesでホストしているAstro.jsのブログで、/feedへのアクセスに/rss.xmlの内容を返す必要があり、CloudFlare Pagesのリダイレクト設定を利用してやってみたのでそのメモです。"
pubDate: "2023/12/07"
heroImage: "/placeholder-hero.webp"
---

## 解決したかった課題

CloudFlare PagesでホストしているAstro.jsのブログで、`/feed`へのアクセスでも`/rss.xml`の内容を返す必要があり、CloudFlare Pagesのリダイレクト設定を利用してやってみたのでそのメモです。

## 解決方法

CloudFlare Pagesのリダイレクト設定は、公開するディレクトリのルートに`_redirects`ファイルを作成して、そのファイルに設定するだけでOKです。  
Astroプロジェクトの場合は、`public`ディレクトリに`_redirects`ファイルを作成すれば良かったです。  
今回の`/feed`へのアクセスを`/rss.xml`へリダイレクトする場合は、`_redirects`ファイルに以下のように記述すれば行けました。

```_redirects
/feed /rss.xml 301
```

## 参考

- [Astro Documentation Project Structure | Docs](https://docs.astro.build/en/core-concepts/project-structure/)
- [Redirects · Cloudflare Pages docs](https://developers.cloudflare.com/pages/platform/redirects/)
