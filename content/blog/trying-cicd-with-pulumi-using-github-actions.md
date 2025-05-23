---
id: trying-cicd-with-pulumi-using-github-actions
aliases:
  - GitHub ActionsでPulumiをCI/CDしてみた
tags:
  - Pulumi
created: 2023-09-15 17:01
description: Pulumiの公式からGitHub Actionsが公開されていたので、こちらを利用してGitHubのmainブランチへpushしたら自動でデプロイされるように設定してみました。設定方法のメモです。
title: GitHub ActionsでPulumiをCI/CDしてみた
updated: 2025-02-06 17:01
---

# GitHub ActionsでPulumiをCI/CDしてみた

## はじめに

個人趣味のインフラをPulumiで管理しています。  
Pulumiの公式からGitHub Actionsが公開されていたので、こちらを利用してGitHubのmainブランチへpushしたら自動でデプロイされるように設定してみました。  

## 手順

### GitHub Actionsのワークフロー作成

[GitHub: pulumi/actions](https://github.com/pulumi/actions/)のリポジトリ内にワークフローのサンプルがあるので、これを参考にしてYAMLを書きます。  
ファイルは `.github/workflows/pulumi.yml` に配置します。

```yaml
name: Pulumi deploy
on:
  push:
    branches:
      - main
jobs:
  up:
    name: Update
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Setup Go ✨
        uses: actions/setup-go@v3
        with:
          go-version: "1.21"

      - name: Downloading dependencies 📦
        run: go mod download

      - name: Applying infrastructure 🚀
        uses: pulumi/actions@v4
        with:
          command: up
          stack-name: prod
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

### Pulumiのアクセストークン取得

[Pulumi Cloud](https://app.pulumi.com/)へアクセスして、アクセストークンを取得します。

![Pulumi Cloudのアクセストークン取得画面](https://gyazo.com/55f273ca3bea77c73be1e71d3966cbdd.png)

### アクセストークンをGitHub ActionsのSecretsに登録

取得したアクセストークンをGitHub ActionsのSecretsに登録します。

![GitHub Actionsの設定画面](https://gyazo.com/3ba7f7e31b5050ce057b6331e32fbf11.png)

## おわりに

もう少し凝ったことをやろうとすると、GitHub Actions力が必要そうですが、公式のサンプルがあったので簡単にできました。  
Pulumiは公式のドキュメントであったり、サンプルが充実しているので、初心者でも簡単に始められて良いですね。

## 参考資料

- https://github.com/pulumi/actions/
