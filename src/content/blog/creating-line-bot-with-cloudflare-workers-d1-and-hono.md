---
title: "CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました"
description: ""
pubDate: "2023/05/09"
heroImage: "/placeholder-hero.webp"
---

妻とのお買い物リスト共有にLINEを利用しているのですが、かなり昔に投稿した買いたい物が流れてしまって遡るのが大変という事象が発生していたので、解決するためにLINE botを作成しました。
作成時の流れ、ハマった事、気づいた事などをまとめておきます。私自身がTypeScriptほぼ初心者かつ、CloudFlare Workers、Cloudflare D1、Honoを利用したことがなかったので、間違っている部分があるかもしれませんのでご了承くださいませ。

## 利用技術

CloudFlare Workersが少し前から気になっていたので、下記技術スタックで作成してみました。  

- CloudFlare Workers
- CloudFlare D1
- Hono
- LINE Messaging API

内容的に単純な文字列の追加・削除を行うbotですので、Workers KV（CloudFlare WorkersのKVストア）でも良かったんですが、CloudFlare D1を触ってみたかったのもあり、この構成になりました。

## 作成したLINE bot

作成したbotのソースコードは、[tkancf-sandbox/cf-d1-line-sample](https://github.com/tkancf-sandbox/cf-d1-line-sample)にありますので、こちらを参照してください。
（wrangler.toml内のdatabase_idが公開しても良い情報なのか確信が持てなかったので、歴史含めて改ざんしてbot名と一緒に変更してあります。）
基本的なLINE botの機能は以下の通りです。

- 一覧という言葉に反応して一覧を返す
- 追加という言葉に反応して追加する
- 削除という言葉に反応して削除する

## LINE botの作成

LINE botの作成については、下記記事とドキュメントを参考にさせていただきました。  

- [Cloudflare Worker + D1 + Hono + OpenAIでLINE Botを作る](https://zenn.dev/razokulover/articles/4d0ba10083524e)
- [LINE Developersコンソールへのログイン](https://developers.line.biz/ja/docs/line-developers-console/login-account/)
- [Messaging APIを始めよう](https://developers.line.biz/ja/docs/messaging-api/getting-started/)

LINE DevelopeLINE Developersコンソールへログイン後、下記設定を行いました。

- チャネル作成
- Messaging APIの設定
- アクセストークンの取得

その後、[Cloudflare Worker + D1 + Hono + OpenAIでLINE Botを作る](https://zenn.dev/razokulover/articles/4d0ba10083524e)を参考にしながら、まずは動作確認のためにLINEでメッセージを投げたら、CloudFlare Workersのログが出力されるだけのものを作成してみます。  
[GitHubでの該当commit](https://github.com/tkancf-sandbox/cf-d1-line-sample/blob/fc77444cabb66afa448474e3bf689e633c5af639/src/index.ts)

```typescript
import { Hono } from "hono";
 
const app = new Hono();

app.get("*", (c) => c.text("Hello World!"));

app.post("/api/webhook", async (c) => {
  console.log(JSON.stringify(c));
  return c.json({ message: "Hello World!" });
});

export default app;
```
