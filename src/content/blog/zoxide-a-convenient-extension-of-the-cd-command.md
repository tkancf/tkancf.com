---
title: "cdコマンドを拡張したzoxideコマンドが便利"
description: "cdコマンドを賢くしたようなコマンドであるzoxideコマンドを試しに使ってみたところ、よく使うディレクトリへの移動が楽になって便利を感じているので、紹介します。"
pubDate: "2023/06/01"
heroImage: "/placeholder-hero.webp"
---

## 概要

[zoxide](https://github.com/ajeetdsouza/zoxide)  
GitHubのTrendingか何かを見てて気になったので試しに使って見たところ、気に入って常用しているので紹介します。

READMEに書いてあるとおりcdコマンドを賢くしたようなコマンドで、よく使うディレクトリへの移動が楽になるコマンドです。

> zoxide is a **smarter cd command**, inspired by z and autojump.

[fzf](https://github.com/junegunn/fzf)と組み合わせることで、インタラクティブなディレクトリ移動が可能になります。

![zoxide-tutorial-GIF](https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/contrib/tutorial.webp)

## 導入

私の環境でのインストールは容易でした。

- Apple M1
- macOS 13.3.1(Ventura)
- zsh 5.9 (x86_64-apple-darwin22.0)

bash、zshに限らずPowerShellでも使えるようなので、Windowsユーザーにも優しいのが良いですね。
詳しい手順は公式のREADMEを読めばわかると思いますが、私のやったことだけ以下に参考として書いておきます。

### 私の環境での手順

zoxideのインストール

```bash
brew install zoxide
```

`fzf`も入れたほうが良い

```bash
brew install fzf
```

`.zshrc`へ設定を追記

```zsh
# zoxideがインストールされていたら、zoxideの初期化を行う
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init --cmd cd zsh)"
fi
```

以上、簡単ですね。

## 設定内容について

上記`.zshrc`へ追記した設定について、デフォルトだとzoxideを利用する際には `cd`のかわりに `z` を利用することになるんですが、私の中で移動 = `cd`が染み付いてしまっていたので、`cd`コマンドを上書きするような設定にしています。 (`--cmd cd`のところ)
現状これで困ってないので、大丈夫だとは思います。

## 一番良く使う機能

`cdi` を実行した際に、使用頻度が高いディレクトリ順で一覧がfzfが開き、選択して移動することができるんですが、これが一番便利で使用頻度高いです。

## まとめ

インタラクティブにディレクトリ移動ができるツールは他にも色々あると思いますが、Windowsでも利用できるものとなると数が少ないので、環境を変えても使える安心感が良いですね。
よかったら試しに使ってみてください。

## 参考資料

- https://github.com/ajeetdsouza/zoxide
- https://github.com/junegunn/fzf
