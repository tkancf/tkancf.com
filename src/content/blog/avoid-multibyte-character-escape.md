---
title: "Gitでマルチバイト文字列がエスケープされる対策"
description: "Gitでマルチバイト文字列がエスケープされる対策についてメモ"
pubDate: "2022/08/21"
heroImage: "/placeholder-hero.webp"
---

デフォルトだとGitでマルチバイト文字列がエスケープされるのでその対策方法のメモです。

## どうすればいいのか？

core.quotepath オプションを false にする

下記コマンドを実行する

```bash
git config --global core.quotepath false
```

またはgitconfigに下記記載する

```gitconfig
[core]
 quotepath = false
```

## core.quotepath is なんのオプション

このオプションがtrue(デフォルト設定)になっていると、マルチバイト文字列がCのエスケープ方法と同じようにエスケープされる。

UTF-8の"μ"を例にすると、  
"μ"はhex codeで"0xC2 0xB5"なので、これを10進数にして"\302\265"にエスケープされる。

日本語文字列も同じ要領でエスケープされるので、日本語をファイル名に含むファイルをGit管理するときは false にしたほうが良い。

## 参考資料

- Git - git-config Documentation
  - https://git-scm.com/docs/git-config#Documentation/git-config.txt-corequotePath
