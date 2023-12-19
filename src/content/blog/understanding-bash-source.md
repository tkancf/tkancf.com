---
title: '$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ) を理解する'
description: 'bashスクリプトを読んでいると頻出する $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ) について完全に理解したのでメモ'
pubDate: "2023/09/20"
heroImage: "/placeholder-hero.webp"
---

## はじめに

bashスクリプトを読んでいると頻出するスニペットに以下のようなものがあります。  
実行しているスクリプトの絶対パスを `SCRIPT_PATH` として定義し、同じディレクトリにある設定ファイルをソースとして読み込んでいます。  

```bash
SCRIPT_PATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source $SCRIPT_PATH/config
```

よく目にするので、なんとなく意味を理解していましたが、ちゃんと読み解けているわけではなかったので、
各要素に分解して改めて理解してみました。  

## BASH_SOURCE[0]

まずは `BASH_SOURCE[0]` の部分に絞って見ていきます。  
`BASH_SOURCE[0]` は、現在実行中のスクリプトのパスを格納している変数です。  
実際の実行結果でどうなるのか見るのが一番分かりやすいので以下に例示します。

```bash
$ cat test.sh
echo ${BASH_SOURCE[0]}
$ bash test.sh
test.sh
```

## dirname

manの説明を引用します。

> SYNOPSIS
> dirname [OPTION] NAME...
>
> DESCRIPTION
> Output each NAME with its last non-slash component and trailing slashes removed; if NAME contains no /'s, output '.' (meaning the current directory).

ファイルパスの最後の要素を除いて、そこまでのパスを返すコマンドです。
これも例示したほうが分かりやすいので以下に例示します。  

```bash
$ ls -l /usr/local/bin/kataribe
-rwxrwxr-x 1 isucon isucon 2741500 Sep 17 23:14 /usr/local/bin/kataribe
$ dirname /usr/local/bin/kataribe
/usr/local/bin
$ dirname /usr/local/bin/
/usr/local
```

`$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )`の場合は、`$( dirname "${BASH_SOURCE[0]}" )`までの記述で`${BASH_SOURCE[0]}`で取得した実行ファイルまでのパスを取得します。  
ここで取得できたパスは実行方法次第で相対パスになる可能性があるので、以降で必ず絶対パスになるようにします。

## cd と pwd

- `cd`: 現在の作業ディレクトリを変更するコマンド
- `pwd`: 現在の作業ディレクトリを表示するコマンド

`cd "$( dirname "${BASH_SOURCE[0]}"` の部分で、現在の作業ディレクトリを実行ファイルのディレクトリに変更しています。その直後に`pwd`で現在の作業ディレクトリを取得することで、実行ファイルの絶対パスを取得しています。

## ラスト

最後に、`SCRIPT_PATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )`で、実行ファイルの絶対パスを変数として定義し、`source $SCRIPT_PATH/config`で実行ファイルと同じディレクトリにある設定ファイルを読み込んでいます。

## まとめ

よくよく見てみないと、グチャッとしていて理解し難い見た目をしたコードだったので改めて読み込んでスッキリしました。理解の参考になれば幸いです。
