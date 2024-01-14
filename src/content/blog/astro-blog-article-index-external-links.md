---
title: "Astroのブログ記事一覧ページに、外部サイトのリンクも合わせて表示するようにしました"
description: "Astroのブログ記事一覧ページに、外部サイトのリンクも合わせて表示するようにしたので、その方法についてざっくりメモを残します。"
pubDate: "2024/01/14"
heroImage: "/placeholder-hero.webp"
---

## 概要

Astroのブログ記事一覧ページに、過去に他の場所で書いた記事も一覧表示したかったので対応しました。
やったことについては、このcommitを見てもらうのが一番早いです。  
https://github.com/tkancf/tkancf.com/pull/28/commits/4ff45a1cf5c75fd5d37d0649eb1c65b743481507

## もう少し詳しく How to

- IndexページのAstroファイル (`src/pages/blog/index.astro`)に、externalPostsという配列で、外部記事のリンク集を用意
- 既存の記事 (`getCollection("blog")`)とガッチャンコ
- 合わせた配列を日付順に表示して一覧表示
- 一覧表示する際に、外部記事の場合はリンク先を外部サイトにしつつ、タイトルの前に `(外部リンク):` という文字列を付与

というのが、ざっくりやったことです。

### 変更のdiff

[commitの内容](https://github.com/tkancf/tkancf.com/pull/28/commits/4ff45a1cf5c75fd5d37d0649eb1c65b743481507)より、一部抜粋

```diff
--- a/src/pages/blog/index.astro
+++ b/src/pages/blog/index.astro
@@ -6,15 +6,133 @@ import { SITE_TITLE, SITE_DESCRIPTION } from "../../consts";
 import { getCollection } from "astro:content";
 import FormattedDate from "../../components/FormattedDate.astro";

+const externalPosts = [
+  {
+    id: "external-1",
+    slug: "",
+    body: "",
+    collection: "external",
+    data: {
+      title: "VimでMarkdownの日本語メモを取るための設定をする",
+      pubDate: new Date("2017-04-27"),
+      url: "https://qiita.com/tkancf/items/e61b7c09def497204628",
+    },
+  },
+  {
+    id: "external-2",
+    slug: "",
+    body: "",
+    collection: "external",
+    data: {
+      title: "この1冊ですべてわかる 新版 コーチングの基本を読みました",
+      pubDate: new Date("2022-08-21"),
+      url: "https://tkancf.hateblo.jp/blog/%E3%81%93%E3%81%AE1%E5%86%8A%E3%81%A7%E3%81%99%E3%81%B9%E3%81%A6%E3%82%8F%E3%81%8B%E3%82%8B_%E6%96%B0%E7%89%88_%E3%82%B3%E3%83%BC%E3%83%81%E3%83%B3%E3%82%B0%E3%81%AE%E5%9F%BA%E6%9C%AC%E3%82%92%E8%AA%AD%E3%81%BF%E3%81%BE",
+    },
+  },
(中略)
+  {
+    id: "external-10",
+    slug: "",
+    body: "",
+    collection: "external",
+    data: {
+      title: "fish shellの初期設定覚え書き（PATHの設定とか）",
+      pubDate: new Date("2017-03-30"),
+      url: "https://tkancf.hateblo.jp/blog/2017/03/30",
+    },
+  },
+];
+
 const posts = (await getCollection("blog")).sort(
   (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
 );
+
+const combinedPosts = [...posts, ...externalPosts].sort(
+  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
+);
 ---
@@ -40,10 +158,19 @@ const posts = (await getCollection("blog")).sort(
       <section>
         <ul>
           {
-            posts.map((post) => (
+            combinedPosts.map((post) => (
               <li>
                 <FormattedDate date={post.data.pubDate} />
-                <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
+                <a
+                  href={
+                    post.collection === "external"
+                      ? post.data.url
+                      : `/blog/${post.slug}/`
+                  }
+                >
+                  {post.collection === "external" ? "(外部リンク): " : ""}
+                  {post.data.title}{" "}
+                </a>
               </li>
             ))
           }
```

以上、とっても簡単でした。Astroは便利ですね。
