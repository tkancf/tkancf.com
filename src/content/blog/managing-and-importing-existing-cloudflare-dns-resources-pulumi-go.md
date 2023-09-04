---
title: "Pulumi+GoでCloudflareのDNS既存リソースをインポートして管理してみた"
description: "CloudflareのDNS設定をPulumiを利用して、Goのコードで管理してみたのでメモ。既存リソースのインポートも試した。"
pubDate: "2023/09/04"
heroImage: "/placeholder-hero.webp"
---

最近Pulumiについてちょくちょく言及されているのを見て、気になったので試してみる。
まずは簡単な所から、Cloudflareで管理しているドメインのDNS設定を整理したかったので、そこをPulumiでコード管理にしてみた。

## 環境

- MacBook Air M1, 2020(Apple M1)
- macOS Ventura バージョン13.3.1 (a)
- go version go1.20.5 darwin/arm64

## 環境構築

### Pulumiのインストール

[Download & Install Pulumi | Pulumi Docs](https://www.pulumi.com/docs/install/)を参考にHomebrewを利用してインストールする。
いくつか選択肢があったが、素直にCommunity Homebrewを利用してインストールする。

```sh
brew install pulumi
```

```sh
$ pulumi version
v3.79.0
```

### Pulumiプロジェクトの作成

[Pulumi & AWS: Create new project](https://www.pulumi.com/docs/clouds/aws/get-started/create-project/) を参考に実施する。

```sh
mkdir <my-cloudflare-project>
cd <my-cloudflare-project>
pulumi new go --name <my-cloudflare-project>
```

`pulumi new` すると、Pulumi Cloudへのログインを求められるので、Enterを押してブラウザからログインする。
Pulumi Cloudのアカウントがない場合は、作成をしてログインする。

```sh
$ pulumi new go --name <my-cloudflare-project>
Manage your Pulumi stacks by logging in.
Run `pulumi login --help` for alternative login options.
Enter your access token from https://app.pulumi.com/account/tokens
    or hit <ENTER> to log in using your browser                   :
We've launched your web browser to complete the login process.
```

ブラウザでログインが完了すると、他項目の入力を求められるので入力していく。
stackについては、  `tkancf/prod` とするとPulumi Cloud上で `https://app.pulumi.com/tkancf/<my-cloudflare-project>/prod` というpath構造になった。

```sh
Waiting for login to complete...


  Welcome to Pulumi!

  Pulumi helps you create, deploy, and manage infrastructure on any cloud using
  your favorite language. You can get started today with Pulumi at:

      https://www.pulumi.com/docs/get-started/

  Tip: Resources you create with Pulumi are given unique names (a randomly
  generated suffix) by default. To learn more about auto-naming or customizing resource
  names see https://www.pulumi.com/docs/intro/concepts/resources/#autonaming.


This command will walk you through creating a new Pulumi project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

project description: (A minimal Go Pulumi program) My infrastructure code
Created project '<my-cloudflare-project>'

Please enter your desired stack name.
To create a stack in an organization, use the format <org-name>/<stack-name> (e.g. `acmecorp/dev`).
stack name: (dev) tkancf/prod
Created stack 'prod'

Installing dependencies...
(中略)
go: downloading github.com/kr/pretty v0.3.1
go: downloading github.com/anmitsu/go-shlex v0.0.0-20200514113438-38f4b401e2be
go: downloading github.com/kr/text v0.2.0
Finished installing dependencies

Your new project is ready to go! ✨

To perform an initial deployment, run `pulumi up`
```

## GoのSDKをインストール

```sh
go mod tidy
go get github.com/pulumi/pulumi-cloudflare/sdk/v5
```

## CloudflareのAPIトークンを設定する

CloudflareのAPIトークンを取得する。
Cloudflareにログインし、`Get your API token`からTokenを作成する。今回は、`Zone:Read, DNS:Read, DNS:Edit`権限があればOK。

## 取得したAPIトークンを保存する

[PulumiのCloudflareのドキュメント Cloudflare: Installation & Configuration https://www.pulumi.com/registry/packages/cloudflare/installation-configuration/]を参考に実施する。

環境変数として定義することも可能だが、下記コマンドでPulumiスタックと一緒に保存することができる。
複数ユーザーが簡単にアクセスできるようになり、公式でも推されていたのでこちらの方法で実施した。

```sh
pulumi config set cloudflare:apiToken --secret
```

`Pulumi.prod.yaml`が生成され、APIトークンは暗号化されて保存されている。
Pulumi Cloud によって管理されるスタックごとの暗号化キーと値ごとのソルトを使用して値を暗号化されるらしい。
<https://www.pulumi.com/docs/concepts/secrets/>

## コードを書く

コードは長いのでGistにサンプルを置いた。

- <https://gist.github.com/tkancf/9945a1f319d5e3ce2162d7b2b0462e11#file-main-go>
`ExistingId` 関連の箇所は既存のDNSレコードをインポートするために、既存のDNSレコードのIDが必要なので入れておく。
インポート完了後は不要になるので、消してOK。

## デプロイ

```sh
pulumi up
```

インポートしようとしているリソースと差分があると、以下のように警告を出してくれるので差分がなくなるようにコードを修正していく。

```sh
- Diagnostics:
  - cloudflare:index:Record (TXT-test.lotkan.com-test):
    - warning: inputs to import do not match the existing resource; importing this resource will fail
```

`ExistingId` 関連の箇所をコードから消して終わり。
