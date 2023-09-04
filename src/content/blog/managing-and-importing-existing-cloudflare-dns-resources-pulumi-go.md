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
インストール方法はいくつか選択肢があったが、素直にCommunity Homebrewを利用してインストールする。

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

![Cloudflare API TOKEN取得 参考画像](/managing-and-importing-existing-cloudflare-dns-resources-pulumi-go/Cloudflare-API-get-token.webp)

## 取得したAPIトークンを保存する

[PulumiのCloudflareのドキュメント Cloudflare: Installation & Configuration](https://www.pulumi.com/registry/packages/cloudflare/installation-configuration/)を参考に実施する。

環境変数として定義することも可能だが、下記コマンドでPulumiスタックと一緒に保存することができる。
複数ユーザーが簡単にアクセスできるようになり、公式でも推されていたのでこちらの方法で実施した。

```sh
pulumi config set cloudflare:apiToken --secret
```

`Pulumi.prod.yaml`が生成され、APIトークンは暗号化されて保存されている。
Pulumi Cloud によって管理されるスタックごとの暗号化キーと値ごとのソルトを使用して値を暗号化されるらしい。
https://www.pulumi.com/docs/concepts/secrets/

## コードを書く

`ExistingId` 関連の箇所は既存のDNSレコードをインポートするために、既存のDNSレコードのIDが必要なので入れておく。
インポート完了後は不要になるので、消してOK。
コードはgistにもサンプルを上げておく。 (https://gist.github.com/tkancf/bbcfc04e14c05529d2ec8e022ff1c85a#file-pulumi-go-cloudflare-dns-go)

```go
package main

import (
 "fmt"

 "github.com/pulumi/pulumi-cloudflare/sdk/v5/go/cloudflare"
 "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type DnsRecord struct {
 Name       string
 Value      string
 Kind       string
 Ttl        int
 Zone       string
 Note       string
 Proxied    bool
 ExistingId string
}

func addRecord(ctx *pulumi.Context, r *DnsRecord) error {
 _, err := cloudflare.NewRecord(ctx, fmt.Sprintf("%s-%s-%s", r.Kind, r.Name, r.Value), &cloudflare.RecordArgs{
  Name:    pulumi.String(r.Name),
  Value:   pulumi.String(r.Value),
  Type:    pulumi.String(r.Kind),
  ZoneId:  pulumi.String(r.Zone),
  Ttl:     pulumi.Int(r.Ttl),
  Comment: pulumi.StringPtr(r.Note),
  Proxied: pulumi.Bool(r.Proxied),
 }, pulumi.Import(pulumi.ID(r.ExistingId)))
 return err
}

func main() {
 pulumi.Run(
  func(ctx *pulumi.Context) error {
   const zoneId = "XXXXXXXXXXXXXXXXXXXXXXXXX"
   dnsRecords := []DnsRecord{
    {
     Name:       "localhost",
     Value:      "127.0.0.1",
     Kind:       "A",
     Ttl:        1,
     Zone:       zoneId,
     Note:       "localhost test",
     Proxied:    false,
    },
    {
     Name:       "lotkan.com",
     Value:      "lotkan-site.pages.dev.",
     Kind:       "CNAME",
     Ttl:        1,
     Zone:       zoneId,
     Proxied:    true,
     ExistingId: zoneId + "/" + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
     Name:       "lotkan.com",
     Value:      "my memo",
     Kind:       "TXT",
     Ttl:        1,
     Zone:       zoneId,
     Note:       "my memo",
     Proxied:    false,
     ExistingId: zoneId + "/" + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
     Name:       "test",
     Value:      "test",
     Kind:       "TXT",
     Ttl:        1,
     Zone:       zoneId,
     Proxied:    false,
     ExistingId: zoneId + "/" + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
   }

   for _, d := range dnsRecords {
    if err := addRecord(ctx, &d); err != nil {
     return err
    }
   }
   return nil
  })
}
```

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

## 終わりに

以上、思った以上に簡単に既存リソースをインポート出来た。
Pulumiを触ったのは初めてだったが、公式がサンプルコードを多数置いてくれており悩む部分は少なかった。
個人的にはTerraformより既存リソースのインポートならPulumiの方が楽だと感じたが、まだ大きな違いを感じるほどしっかり触れてはいないので、今後もっと触ってみたい。

## 参考資料

- https://www.pulumi.com/docs/clouds/aws/get-started/create-project/
- https://www.pulumi.com/docs/concepts/secrets/
- https://www.pulumi.com/docs/get-started/
- https://www.pulumi.com/docs/install/
- https://www.pulumi.com/docs/intro/concepts/resources/#autonaming.
- https://www.pulumi.com/registry/packages/cloudflare/installation-configuration/
