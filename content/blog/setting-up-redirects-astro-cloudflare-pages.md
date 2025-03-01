---
id: setting-up-redirects-astro-cloudflare-pages
aliases:
  - CloudFlare PagesでホストしているAstroブログでリダイレクト
tags:
  - Astro
  - CloudFlare
created: 2023-12-07 17:01
description: CloudFlare PagesでホストしているAstro.jsのブログで、/feedへのアクセスに/rss.xmlの内容を返す必要があり、CloudFlare Pagesのリダイレクト設定を利用してやってみたのでそのメモです。
title: CloudFlare PagesでホストしているAstroブログでリダイレクト
updated: 2025-02-06 17:01
---

# CloudFlare PagesでホストしているAstroブログでリダイレクト

## 解決したかった課題

CloudFlare PagesでホストしているAstro.jsのブログで、`/feed`へのアクセスでも`/rss.xml`の内容を返す必要があり、CloudFlare Pagesのリダイレクト設定を利用してやってみたのでそのメモです。

## 解決方法

CloudFlare Pagesのリダイレクト設定は、公開するディレクトリのルートに`_redirects`ファイルを作成して、そのファイルに設定するだけでOKです。  
Astroプロジェクトの場合は、`public`ディレクトリに`_redirects`ファイルを作成すれば良かったです。  
今回の`/feed`へのアクセスを`/rss.xml`へリダイレクトする場合は、`_redirects`ファイルに以下のように記述すれば行けました。

```
/feed /rss.xml 301
```

## 参考

- [Astro Documentation Project Structure | Docs](https://docs.astro.build/en/core-concepts/project-structure/)
- [Redirects · Cloudflare Pages docs](https://developers.cloudflare.com/pages/platform/redirects/)
