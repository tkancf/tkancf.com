---
title: Roc言語を触ってみてる
tags:
  - Roc
created: 2025-10-27 00:03
updated: 2025-10-27 00:03
---

# Roc言語を触ってみてる

※2025/10/27時点の情報を元に書いています。情報がすぐに古くなるかもしれません。

最近、[Roc](https://www.roc-lang.org)というプログラミング言語を触っています。
きっかけはRocの作者のRichard Feldmanが書いた、[RocのコンパイラをRustからZigに書き換える記事](https://gist.github.com/rtfeldman/77fb430ee57b42f5f2ca973a3992532f) を読んで面白かったので、そのままRoc自体も気になって見ていました。  
まだアルファ版の絶賛開発中の言語ですが、シンプルさとビルドの高速性を意識して作られているのが個人的には好印象で機能も気に入ったので、触ってみています。

簡単に言語の特徴を説明すると、Rocは関数型で静的型付けのコンパイル言語です。  
(違う部分も多々ありますが、)Elmを知っている人にはElmのターゲットをブラウザではなく、ネイティブ向けにした言語と言うと伝わりやすいかもしれません。  
関数型言語によくある機能(パターンマッチ、Result型、パイプライン演算子など)があり、便利で書いてて楽しい言語です。  
私自身は関数型言語にはあまり詳しくなく、Haskellの入門書を読んで、Elmはチュートリアルをちょっと触ったことがあるぐらいの経験しか無いのですが、一通り読んで理解した気になれる[良いチュートリアル](https://www.roc-lang.org/tutorial)が用意されていました。

## Rocの個人的に好きなポイント

### ビルド速度

言語の目標として「高速にビルドされること」が明確に意識されています。([Fast | Roc](https://www.roc-lang.org/fast))  
私がGo言語を好きな理由の一つに「ビルドが早いこと」があるので、Rocでも好きなポイントです。

### 言語機能

個人的には下記が便利で好きなポイントです。

- パターンマッチ
- パイプライン演算子
- Result型

また、他の言語ではあまり見ないRoc独自のポイントとしてPlatformという特徴があります。  
PlatformはRocで開発するアプリケーションにI/OのAPIとランタイム的役割を果たす層です。
Platformはライブラリのように簡単に差し替えできるようになっており、作りたいアプリに合わせて選びます。
例えば、CLI開発用のPlatform、Webサーバ用のPlatformが現状公式から提供されています。

```elm
app [main!] { cli: platform "https://github.com/roc-lang/basic-cli/releases/download/0.20.0/X73hGh05nNTkDHU06FHC0YfFaQB1pimX7gncRcao5mU.tar.br" }

import cli.Stdout
import cli.Arg exposing [Arg]

main! : List Arg => Result {} _
main! = |_args|
    Stdout.line!("Hello, World!")
```

上記はCLI開発用のPlatform(basic-cli)を利用しています。(1行目の宣言がそれです。)  
Platformが別れていることで、アプリに合わせてメモリ管理をしたりI/O操作を最適化したりができるようになります。
詳しくは[Platforms and Apps | Roc](https://www.roc-lang.org/platforms)を読んでください。

## Rocの推せない部分

ほとんどアルファ版であることに起因してます。

### ライブラリ

まだアルファ版なので、それはそうなんですが少ないです。  
全く無い訳ではないので、[lukewilliamboswell/roc-awesome: Awesome Roc](https://github.com/lukewilliamboswell/roc-awesome) など見るといくつかありますし、標準ライブラリもそこそこ揃っています。  
現状は無いものは作ろうのストロングスタイルです。

### まだ構文が変わりそう

過渡期なので、変わると明言されているものが幾つかあります。  
[Planned Changes | Roc](https://www.roc-lang.org/plans)に書かれています。  
変化過程を楽しみたいという人には逆に推せるかもしれません。

## Rocの現状

[RocのコンパイラをRustからZigに書き換える記事](https://gist.github.com/rtfeldman/77fb430ee57b42f5f2ca973a3992532f)で説明されているコンパイラの書き換えが絶賛進行中のステータスです。  
Advent of Code 2025には、新しいコンパイラで取り組めるようにすることを目指しているので、年末を楽しみにしつつAdvent of Code 2025をRocでやってみるのはいかがでしょうか。

## おわりに

面白い言語だと思うので、新しいもの好きの人には試してもらいたいなぁという気持ちで書きました。是非是非！！
