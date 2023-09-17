---
title: "Astroのバージョンをv2からv3に上げました"
description: "Astroのバージョンをv2からv3に上げたのでメモ"
pubDate: "2023/09/17"
heroImage: "/placeholder-hero.webp"
---

本ブログのビルドツールである[Astro](https://astro.build/)のバージョンをv2からv3に上げました。

## アップデート手順

公式にアップデート手順があるので、それに従ってバージョンを上げます。
[Astro v3へのアップグレード](https://docs.astro.build/en/guides/upgrade-to/v3/)

```bash
npm install astro@latest
```

## 変更への対応

`Experimental Flags` が削除されたようなので、`astro.config.mjs` から `experimental` を削除します。

```diff
 import { defineConfig } from 'astro/config';
 
 export default defineConfig({
-  experimental: {
-    assets: true,
-    viewTransitions: true,
-  },
 })
```

これらの機能はデフォルトで利用可能になったようです。
