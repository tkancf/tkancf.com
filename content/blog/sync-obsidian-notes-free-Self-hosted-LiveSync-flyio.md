---
title: "Self-hosted LiveSyncとFly.ioを使って、Obsidianのメモを無料で同期する"
description: "Self-hosted LiveSyncとFly.ioを使って、Obsidianのメモを無料で同期する方法のメモです。"
pubDate: "2023/12/17"
heroImage: "/placeholder-hero.webp"
---

## はじめに

メモアプリとしてObsidianを使っているのですが、メモの複数端末間での同期が有料プランになっているのが唯一のネックで、iPhoneでのメモはGitHub issueに書いていました。
サードパーティの同期方法はいくつか存在していてそれぞれ試したのですが、これといったものがない状態でした。  
サードパーティの同期プラグインの一つであるSelf-hosted LiveSyncについても存在は以前から知っていましたが、ドキュメントに記載のIBM Cloudを利用しようとした際に、IBM Cloudへのクレジットカード登録が上手く出来ず、利用を諦めていました。  
[Obsidianにfly.ioでSelf-hosted LiveSyncを設定する](https://www.lisz-works.com/entry/obsidian-self-hosted-livecync)という記事を見かけて、IBM Cloud以外でも出来そうと分かったので参考にしつつやってみた所、Obsidianライフがめちゃくちゃ快適になったので、だれかの参考になればと思い記事にします。

## 設定環境

- MacBook Air M1, 2020
- macOS Ventura 13.6

## 手順

### fly.ioのコントロール用CLIをインストール

Macなら、Homebrewでインストールできました。

```bash
brew install flyctl
```

### fly.ioへサインアップ

```bash
flyctl auth signup
```

上記実行すると、ブラウザでfly.ioの登録画面へ遷移するので会員登録します。

### Applicationセットアップ

このあと設定ファイルなどが作成されるので、作業ディレクトリなど作るとよいです。

```bash
mkdir <任意のディレクトリ名>
cd <任意のディレクトリ名>
```

fly.tomlファイルを作成します。nrtリージョンが東京らしいです。

```bash
flyctl launch --generate-name --detach --no-deploy --region nrt
```

ディスクを作成します。

```bash
flyctl volumes create --region nrt <ディスク名> --size 2 --yes
```

fly.toml が生成されているはずなので、編集します。

```toml
app = "<任意のアプリ名>"
primary_region = "nrt"

[http_service]
  internal_port = 5984
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[env]
  COUCHDB_USER = "<ユーザ名>"
  ERL_FLAGS="-couch_ini /opt/couchdb/etc/default.ini /opt/couchdb/etc/default.d/ /opt/couchdb/etc/local.d /opt/couchdb/etc/local.ini /opt/couchdb/data/persistence.ini"

[mounts]
  source="<ディスク名>"
  destination="/opt/couchdb/data"

[build]
  dockerfile = "./Dockerfile"
```

Dockerfileを用意します。

```docker
FROM couchdb:latest
RUN sed -i '2itouch /opt/couchdb/data/persistence.ini && chmod +w /opt/couchdb/data/persistence.ini' /docker-entrypoint.sh
```

CouchDBのパスワードを設定します。

```bash
flyctl secrets set COUCHDB_PASSWORD=<パスワード>
```

デプロイします。

```bash
flyctl deploy --detach --remote-only
```

fly.tomlへ記載した `https://<任意のアプリ名>.fly.dev`というURLでアクセス可能になっているはずです。

### CouchDBのセットアップ

 `https://<任意のアプリ名>.fly.dev/_utils/`へアクセスすると、ログイン画面が出てくるので、fly.tomlへ記載したCOUCHDB_USERのユーザ名とflyctl secretsで指定したCOUCHDB_PASSWORDでログインします。

設定画面で、Setup Apache CouchDBを開いて、Configure a Single Nodeをすすめます。
ユーザ名、パスワードを設定して、完了します。

### Obsidian側のSelf-hosted LiveSyncを設定する

こちら側は上記で設定したユーザ名、パスワード、DBのURL等をSelf-hosted LiveSyncの🛰マークの設定に入力していくだけで完了です。

## その他

- fly.ioに CouchDBのイメージがあるんですが、これを利用すると定期的にSelf-hosted LiveSyncの接続が切れる状態になってしまいました。
  - 原因は不明ですがDockerfileに変更すると事象が解消したので、Dockerfileを利用するのがおすすめです。
- iPhoneの設定でObsidianのモバイル通信をOFFにしておくと、WiFi接続時のみ同期するようになり通信量を抑えられるのでおすすめです。

## 参考資料

- [Obsidianにfly.ioでSelf-hosted LiveSyncを設定する
](https://www.lisz-works.com/entry/obsidian-self-hosted-livecync)
- [Setup CouchDB on fly.io](https://github.com/vrtmrz/obsidian-livesync/blob/c2491fdfad043d8301c3a20e4f0727150d67376a/docs/setup_flyio.md)
