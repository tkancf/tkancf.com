---
title: "CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました"
description: "CloudFlare Workers、CloudFlare D1、Hono.jsを利用して、シンプルなLINE botを作成しました。作成時の流れ、ハマった事、気づいた事などをまとめておきます。"
pubDate: "2023/05/10"
heroImage: "/placeholder-hero.webp"
---

## はじめに

妻とのお買い物リスト共有にLINEを利用しているのですが、かなり昔に投稿した買いたい物が流れてしまって遡るのが大変という事象が発生していたので、解決するためにLINE botを作成しました。
作成時の流れ、ハマった事、気づいた事などをまとめておきます。

私自身がTypeScriptほぼ初心者かつ、CloudFlare Workers、Cloudflare D1、Honoを利用したことがなく、間違っている部分があるかもしれませんのでご了承くださいませ。

## 利用技術

CloudFlare Workersが少し前から気になっていたので、下記技術スタックで作成してみました。  

- CloudFlare Workers
- CloudFlare D1
- Hono
- LINE Messaging API

内容的に単純な文字列の追加・削除を行うbotですので、Workers KV（CloudFlare WorkersのKVストア）でも良かったんですが、CloudFlare D1を触ってみたかったのもあり、この構成になりました。

## 作成したLINE bot

作成したbotのソースコードは、[tkancf-sandbox/cf-d1-line-sample](https://github.com/tkancf-sandbox/cf-d1-line-sample)にありますので、こちらを参照してください。  
※wrangler.toml内のdatabase_idが公開しても良い情報なのか確信が持てなかったので、歴史含めて改ざんしてbot名と一緒に変更してあります。  
基本的なLINE botの機能は以下の通りです。

- 一覧という言葉に反応して一覧を返す
- 追加という言葉に反応して追加する
- 削除という言葉に反応して削除する

## 最低限の機能を持ったLINE botの作成

LINE botの作成については、下記記事とドキュメントを参考にさせていただきました。  

- [Cloudflare Worker + D1 + Hono + OpenAIでLINE Botを作る](https://zenn.dev/razokulover/articles/4d0ba10083524e)
- [LINE Developersコンソールへのログイン](https://developers.line.biz/ja/docs/line-developers-console/login-account/)
- [Messaging APIを始めよう](https://developers.line.biz/ja/docs/messaging-api/getting-started/)

LINE DevelopeLINE Developersコンソールへログイン後、下記設定を行いました。

- チャネル作成
- Messaging APIの設定
- アクセストークンの取得

その後、[Cloudflare Worker + D1 + Hono + OpenAIでLINE Botを作る](https://zenn.dev/razokulover/articles/4d0ba10083524e)を参考にしながら、まずは動作確認のためにLINEでメッセージを投げたら、CloudFlare Workersのログが出力されるだけのものを作成してみます。  

プロジェクトの初期化は下記コマンドで行いました。これにより、最低限のファイル群が作成されます。

```bash
npx wrangler init プロジェクト名 -y
```

[GitHubでの該当commitのソースコード](https://github.com/tkancf-sandbox/cf-d1-line-sample/blob/fc77444cabb66afa448474e3bf689e633c5af639/src/index.ts)

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

`npm run start`でローカル環境での動作確認が可能です。  
curlでPOSTリクエストを投げることで、Hello World!が返ってくることを確認します。

```bash
curl -X POST http://localhost:8787/api/webhook
```

上記確認が問題なければ、CloudFlare Workersにデプロイします。  
これも下記コマンドを実行するだけで簡単です。

```bash
npm run deploy
```

デプロイ後、CloudFlare WorkersにデプロイされたWorkerのURLをLINE DevelopersコンソールのWebhook URLに設定します。
URLの形式は `https://XXXX.workers.dev/api/webhook` になります。
また、今回作りたいLINE botはグループトークでの利用を想定しているので、LINE DevelopersコンソールのWebhookの利用設定で「グループ・複数人トークへの参加を許可」にチェックを入れておきます。
![LINE DevelopersコンソールのWebhookグループへの参加を許可する設定画像](/creating-line-bot-with-cloudflare-workers-d1-and-hono/LINE-DeveloperConsole-group-setting.webp)

設定が完了したら、CloudFlare WorkersのLogsタブ内からリアルタイムでログを確認できるので、確認しながらLINEでメッセージを投げてみます。
メッセージを送った際にリアルタイムログが更新されれば、LINEとCloudFlare Workersの連携は成功しています。

## オウム返しするLINE botの作成

少し機能を追加して、LINEで送信したメッセージをオウム返しするLINE botを作成します。こちらも引き続き[Cloudflare Worker + D1 + Hono + OpenAIでLINE Botを作る](https://zenn.dev/razokulover/articles/4d0ba10083524e#%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%82%92%E3%81%8A%E3%81%86%E3%82%80%E8%BF%94%E3%81%97%E3%81%99%E3%82%8Bbot%E3%82%92%E4%BD%9C%E3%82%8B)を参考にさせていただきました。

[GitHubでの該当commitのソースコード](https://github.com/tkancf-sandbox/cf-d1-line-sample/blob/857a700b975851265ce82d73d7a1543119b83d74/src/index.ts)  

```typescript
import {
  MessageAPIResponseBase,
  TextMessage,
  WebhookEvent,
} from "@line/bot-sdk";
import { Hono } from "hono";

const app = new Hono();
app.get("*", (c) => c.text("Hello World!"));

app.post("/api/webhook", async (c) => {
  const data = await c.req.json();
  const events: WebhookEvent[] = (data as any).events;
  // @ts-ignore アクセストークンが読めずにエラーになるが、実環境では読めるので無視する
  const accessToken: string = c.env.CHANNEL_ACCESS_TOKEN;

  await Promise.all(
    events.map(async (event: WebhookEvent) => {
      try {
        await textEventHandler(event, accessToken);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
        }
        return c.json({
          status: "error",
        });
      }
    })
  );
  return c.json({ message: "ok" });
});

const textEventHandler = async (
  event: WebhookEvent,
  accessToken: string
): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  const { replyToken } = event;
  const { text } = event.message;
  const response: TextMessage = {
    type: "text",
    text,
  };
  await fetch("https://api.line.me/v2/bot/message/reply", {
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [response],
    }),
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export default app;
```

上記コードについて、下記部分にVSCode上で警告が出ており、この時点で良い解決策が分からなかったので`@ts-ignore`で無視しています。  
※無視せずに解決しましたので、この先に解決方法を記載します。

```typescript
  // @ts-ignore アクセストークンが読めずにエラーになるが、実環境では読めるので無視する
  const accessToken: string = c.env.CHANNEL_ACCESS_TOKEN;
```

上記コードを `npm run deploy` でデプロイした後、アクセストークンをCloudFlare Workersへ設定します。 [wranglerのドキュメントのCommands](https://developers.cloudflare.com/workers/wrangler/commands/#secret)にやり方があるのでその通りに実行します。

```bash
wrangler secret put CHANNEL_ACCESS_TOKEN
```

この状態で対象のLINE botに対してLINEでメッセージを送信すると、オウム返ししてくれることを確認します。

### ローカルでの動作確認

手元で`npm run start`で動作している状態でも動作確認をしたくなります。  
下記LINEのMessaging APIのドキュメントを確認すると、トークでユーザーからメンションと絵文字を含むテキストメッセージが送られた場合のJSONが例示されているのでイメージしやすいです。  
[Messaging APIリファレンス](https://developers.line.biz/ja/reference/messaging-api/#wh-text)
curlでやると以下のようになりますが、ここまで長いとPostmanなどを使った方が楽です。

```bash
curl --location 'http://127.0.0.1:8787/api/webhook' \
--header 'Content-Type: application/json' \
--data-raw '

{
    "destination": "xxxxxxxxxx",
    "events": [
        {
            "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
            "type": "message",
            "mode": "active",
            "timestamp": 1462629479859,
            "source": {
                "type": "group",
                "groupId": "Ca56f94637c...",
                "userId": "U4af4980629..."
            },
            "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
            "deliveryContext": {
                "isRedelivery": false
            },
            "message": {
                "id": "444573844083572737",
                "type": "text",
                "text": "@All @example Good Morning!! (love)",
                "emojis": [
                    {
                        "index": 29,
                        "length": 6,
                        "productId": "5ac1bfd5040ab15980c9b435",
                        "emojiId": "001"
                    }
                ],
                "mention": {
                    "mentionees": [
                        {
                            "index": 0,
                            "length": 4,
                            "type": "all"
                        },
                        {
                            "index": 5,
                            "length": 8,
                            "userId": "U49585cd0d5...",
                            "type": "user"
                        }
                    ]
                }
            }
        }
    ]
}'
```

## CloudFlare D1を利用したLINE botの作成

[Cloudflare D1 documentationのGet started](https://developers.cloudflare.com/d1/get-started/) を参考にしながら、Cloudflare D1の設定を行います。

### D1の作成

下記コマンドを実行すると、Cloudflare D1のDBが作成されます。

```bash
❯ wrangler d1 create <D1のDB名>
Delegating to locally-installed wrangler@2.15.1 over global wrangler@2.16.0...
Run `npx wrangler d1 create <D1のDB名>` to use the local version directly.

--------------------
🚧 D1 is currently in open alpha and is not recommended for production data and traffic
🚧 Please report any bugs to https://github.com/cloudflare/workers-sdk/issues/new/choose
🚧 To request features, visit https://community.cloudflare.com/c/developers/d1
🚧 To give feedback, visit https://discord.gg/cloudflaredev
--------------------

✅ Successfully created DB '<D1のDB名>'!

Add the following to your wrangler.toml to connect to it from a Worker:

[[ d1_databases ]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<D1のDB名>"
database_id = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

出力の通り、末尾に出力された下記の設定をコピーして`wrangler.toml`に追記します。

```toml
[[ d1_databases ]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<D1のDB名>"
database_id = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

### ローカルのD1の初期化

ローカルでもテスト用のDBが作成できるので、初期化用のSQLを作成します。

[migration.sql](https://github.com/tkancf-sandbox/cf-d1-line-sample/blob/bf3c4fde617f059f36bd8c64a743c17a6469db5d/migration.sql)

```sql
DROP TABLE IF EXISTS shopping_list;
CREATE TABLE shopping_list (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item TEXT NOT NULL,
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO shopping_list (item) VALUES ('milk');
```

下記コマンドでローカルのDBを初期化します。

```bash
wrangler d1 execute <D1のDB名> --local --file=./migration.sql
```

初期化したローカルのDBを参照して、データが入っていることを確認します。

```bash
wrangler d1 execute <D1のDB名> --local --command='SELECT * FROM shopping_list;'
(中略)
┌────┬──────┬─────────────────────┐
│ id │ item │ added_at            │
├────┼──────┼─────────────────────┤
│ 1  │ milk │ 2023-04-24 14:32:22 │
└────┴──────┴─────────────────────┘
```

### CloudFlare D1を参照するプログラムの作成

D1の設定が完了して、ローカルのDBも初期化できたのでworkerから参照してみます。  
あわせて、先程VSCodeで警告されていた以下のようなエラーも解消します。

- 'c.env' は 'undefined' の可能性があります。
- 'c.env.DB''は 'unknown' 型です。
- 型 'unknown' を型 'string' に割り当てることはできません。

[GitHub上の対象commitのソースコード](https://github.com/tkancf-sandbox/cf-d1-line-sample/blob/bf3c4fde617f059f36bd8c64a743c17a6469db5d/src/index.ts)

```typescript
import {
  MessageAPIResponseBase,
  TextMessage,
  WebhookEvent,
} from "@line/bot-sdk";
import { Hono } from "hono";
import { Env as BaseEnv } from "hono/dist/types/types";

type Env = BaseEnv & {
  CHANNEL_ACCESS_TOKEN: string;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

type ShoppingItem = {
  id: number;
  item: string;
  added_at: string;
};

app.get("/api/select-test", async (c) => {
  const stmt = await c.env.DB.prepare(`SELECT * FROM shopping_list;`);
  const allResults: D1Result<ShoppingItem> = await stmt.all();

  if (!allResults.results) {
    // undefiled result
    return c.json({ message: "no results" });
  }

  const results: { results: ShoppingItem[] } = {
    results: allResults.results || [],
  };
  return c.json(results);
});

app.post("/api/webhook", async (c) => {
  const data = await c.req.json();
  const events: WebhookEvent[] = (data as any).events;
  const accessToken: string = c.env.CHANNEL_ACCESS_TOKEN;

  await Promise.all(
    events.map(async (event: WebhookEvent) => {
      try {
        await textEventHandler(event, accessToken);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
        }
        return c.json({
          status: "error",
        });
      }
    })
  );
  return c.json({ message: "ok" });
});

const textEventHandler = async (
```

`app.get("/api/select-test", async (c) => {`部分のメソッドで、CloudFlare D1のDBに接続して、データを取得しています。

VSCodeの警告については、Honoの初期化時にEnvを渡してあげることで解消しました。  
元々、HonoのtypeにEnvがあったので、これを拡張して、LINEのチャネルアクセストークンとD1のDBを追加しています。  
TypeScript全然分からないまま書いているので、もしかしたらもっと良い書き方があるかもしれません。  

- 変更前

    ```typescript
    const app = new Hono();
    ```

- 変更後

    ```typescript
    type Env = BaseEnv & {
    CHANNEL_ACCESS_TOKEN: string;
    DB: D1Database;
    };

    const app = new Hono<{ Bindings: Env }>();
    ```

### ローカルのCloudFlare D1を利用するworkerの起動

デフォルトで設定されている `npm run start` では、 `wrangler dev` を実行するようになっていますが、オプションなしで `wrangler dev` を実行しても、ローカルのCloudFlare D1を利用するようにはなっていません。  
そこで、`package.json`に`dev`というスクリプトを追加して、そちらには `--local --persist`オプションを追加することで、ローカルのCloudFlare D1を利用するようにします。

```diff
     "start": "wrangler dev",
+    "dev": "wrangler dev --local --persist",
```

### CloudFlare D1を参照するworkerの動作確認

上記までの作業が完了していれば、 `npm run dev` でローカルのworkerが起動します。  
`/api/select-test` という新しいエンドポイントを生やして参照できるようにしたので、動作を確認してみます。  
シンプルにcurlでGETリクエストを投げれば、DBから取得したデータが返ってくることが確認できます。

```bash
curl http://127.0.0.1:8787/api/select-test
```

## 全部組み合わせて、LINE botを完成させる

ここまででLINE botの動作に必要なものは全て揃いましたので、あとはそれらを組み合わせてLINE botを完成させます。  
[GitHub上での該当commitソースコード](https://github.com/tkancf-sandbox/cf-d1-line-sample/blob/e384106693da9c7f9f4295017b7a3a052ff76287/)

index.ts

```typescript
import { TextMessage, WebhookEvent } from "@line/bot-sdk";
import { Hono } from "hono";
import { Env as BaseEnv } from "hono/dist/types/types";
import { Line } from "./line";

type Env = BaseEnv & {
  CHANNEL_ACCESS_TOKEN: string;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

type ShoppingItem = {
  id: number;
  item: string;
  added_at: string;
};

app.get("/api/select-test", async (c) => {
  const stmt = await c.env.DB.prepare(`SELECT * FROM shopping_list;`);
  const allResults: D1Result<ShoppingItem> = await stmt.all();

  if (!allResults.results) {
    // undefiled result
    return c.json({ message: "no results" });
  }

  const results: { results: ShoppingItem[] } = {
    results: allResults.results || [],
  };
  return c.json(results);
});

app.post("/api/insert-test", async (c) => {
  const data = await c.req.json();
  const item = data.item;
  console.log(item);
  const stmt = await c.env.DB.prepare(
    `INSERT INTO shopping_list (item) VALUES (?);`
  ).bind(item);
  const result = await stmt.run();
  return c.json(result);
});

app.post("/api/webhook", async (c) => {
  const data = await c.req.json();
  const events: WebhookEvent[] = (data as any).events;
  const event = events
    .map((event: WebhookEvent) => {
      if (event.type != "message" || event.message.type != "text") {
        return;
      }
      return event;
    })
    .filter((event) => event)[0];
  // undefinedを除外
  if (!event) {
    return c.json({ message: "No event: ${events}" });
  }
  const { replyToken } = event;
  const { text } = event.message as TextMessage;
  const client = new Line(c.env.CHANNEL_ACCESS_TOKEN);

  if (text === "一覧") {
    const message: string = await fetchAllItems(c);
    // messageの内容がからの場合、「内容がないよう」と返信する
    if (!message) {
      await client.replyMessage("内容がないよう", replyToken);
    } else {
      await client.replyMessage(message, replyToken);
    }
    return c.json({ message: "LINE 一覧" });
  } else if (text.startsWith("追加")) {
    const items = text.replace("追加", "").split("\n");
    for (const item of items) {
      if (!item) {
        continue;
      }
      const stmt = await c.env.DB.prepare(
        `INSERT INTO shopping_list (item) VALUES (?);`
      ).bind(item);
      await stmt.run();
    }
    await client.replyMessage("追加しました", replyToken);
    return c.json({ message: "LINE 追加" });
  } else if (text.startsWith("削除")) {
    const item = text.replace("削除", "");
    const stmt = await c.env.DB.prepare(
      `DELETE FROM shopping_list WHERE item = ?;`
    ).bind(item);
    await stmt.run();
    await client.replyMessage("削除しました", replyToken);
    return c.json({ message: "LINE 削除" });
  } else if (text === "全てを削除してください" || text === "全てを削除") {
    const stmt = await c.env.DB.prepare(`DELETE FROM shopping_list;`);
    await stmt.run();
    await client.replyMessage("全て削除しました", replyToken);
    return c.json({ message: "LINE 全てを削除してください" });
  }
  return c.json({ message: "ok" });
});

const convertResultToMessage = (allResults: D1Result<ShoppingItem>): string => {
  if (!allResults.results) {
    // undefiled result
    console.log("message: ", "no results");
  }

  const results: { results: ShoppingItem[] } = {
    results: allResults.results || [],
  };
  // convert results to string
  const message: string = results.results
    .map((result) => {
      return `${result.id}: ${result.item}`;
    })
    .join("\n");
  return message;
};

const fetchAllItems = async (c: any) => {
  const stmt = await c.env.DB.prepare(`SELECT * FROM shopping_list;`);
  const allResults: D1Result<ShoppingItem> = await stmt.all();
  // allResultsのIDを1からの連番へ変換する
  if (allResults.results) {
    allResults.results = allResults.results.map((result, index) => {
      result.id = index + 1;
      return result;
    });
  }
  const message = convertResultToMessage(allResults);
  return message;
};

export default app;
```

line.ts

```typescript
import { TextMessage } from "@line/bot-sdk";

export class Line {
  private readonly headers: Record<string, string>;
  private readonly baseUrl = "https://api.line.me";

  constructor(accessToken: string) {
    this.headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  public async replyMessage(
    text: string,
    replyToken: string
  ): Promise<Response | null> {
    const message: TextMessage = {
      type: "text",
      text,
    };
    return await fetch(`${this.baseUrl}/v2/bot/message/reply`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [message],
      }),
    }).catch((err) => {
      console.log(`LINE API error: ${err}`);
      return null;
    });
  }
}
```

ここまでの内容を `npm run deploy` でデプロイすることで、LINE Botの完成です。

## まとめ

CloudFlareの製品はいままでCDNくらいしか使っていなかったのですが、ブログをCloudFlare Pagesへ載せた際に興味を持って色々触ってみました。
CloudFlare Workers、Cloudflare D1、Honoいずれも初めて触りましたが無料でこれだけ遊べるのはすごいですね。特にD1はRDBが無料でこんなに使えて良いのかと驚きました。今回のような小規模な趣味プロジェクトで使うには十分すぎます。  
フレームワークはHonoを利用させていただきましたが、シンプルでドキュメントも十分なものがあり、私のようなTypeScript初心者にはとても使いやすかったです。  
他にも色々と作って遊びたいと思います。

また、今回[こちらの記事(Cloudflare Worker + D1 + Hono + OpenAIでLINE Botを作る)](https://zenn.dev/razokulover/articles/4d0ba10083524e)をずっと参考にさせていただきました。この記事がなければ、今回のLINE Botは作れませんでした。この記事を書いてくださった[YuheiNakasaka](https://zenn.dev/razokulover)様に感謝します。  

## 参考

- [LINE Developersコンソールへのログイン](https://developers.line.biz/ja/docs/line-developers-console/login-account/)
- [Messaging APIを始めよう](https://developers.line.biz/ja/docs/messaging-api/getting-started/)
- [Messaging APIリファレンス](https://developers.line.biz/ja/reference/messaging-api/#wh-text)
- [Cloudflare D1 documentationのGet started](https://developers.cloudflare.com/d1/get-started/)  
- [hono.dev](https://hono.dev/)
- [honojs/examples/tree/main/durable-objects](https://github.com/honojs/examples/tree/main/durable-objects)
- [Cloudflare Worker + D1 + Hono + OpenAIでLINE Botを作る](https://zenn.dev/razokulover/articles/4d0ba10083524e)
- [YuheiNakasaka/line-bot-cf-worker-sample](https://github.com/YuheiNakasaka/line-bot-cf-worker-sample/tree/main)
