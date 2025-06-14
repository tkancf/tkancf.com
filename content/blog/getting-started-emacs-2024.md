---
id: getting-started-emacs-2024
aliases:
  - Emacsに入門した 2024年
tags:
  - Emacs
created: 2024-04-25 12:43
description: 最近、org-modeのためにEmacsに入門して色々と設定を頑張っていました。その過程でVimのorg-modeについても検証したりEmacsの設定について試行錯誤したりしたのでブログとしてまとめてみます。
title: Emacsに入門した 2024年
updated: 2025-02-06 12:43
---

# Emacsに入門した 2024年

## イントロ

最近Emacsの設定を頑張っていました。

- 設定したEmacsの設定: https://github.com/tkancf/.emacs.d/blob/main/init.org

10年ぐらいVimmerをやっているんですが、Emacsを羨ましいと思う要素がありました。 下記3つの機能です。

- インラインの画像表示
- dmacro
- org-mode

このうち、画像表示については[3rd/image.nvim](https://github.com/3rd/image.nvim/github.com/3rd/image.nvim)などを利用してNeovimで画像表示が可能になっています。  
dmacroについては、(私が知っている限りでは)Vimに似たプラグインは見つけられませんでした。  
org-modeについては、[nvim-orgmode/orgmode](https://github.com/nvim-orgmode/orgmode)というプラグインがかなりよく出来ており、org-modeの大体の機能はこれで利用できます。

ただ、nvim-orgmode/orgmodeでEmacsのorg-modeと完全に同等かというと、Emacsのorg-modeと使い比べてみると細々足りてない機能が気になります。  
org-modeを利用したいというのが主目的で、org-modeを利用するからにはその機能を全て使いたくなったので、Emacsに入門してみました。

## Vim, Neovimでのorg-modeについて

org-modeを使う前にVim, Neovimでのorg-modeの状況についても少々調べました。  
2024年現在だと以下のような状況かなと思っています。

### Emacsのorg-modeにしか無さそうな機能

しばらくEmacsのorg-modeを利用して、おそらくEmacsのorg-modeにしか無いなと思っているのは下記機能です。

- スピードコマンド
- org-babel
    - org-babel-tangle
    - おそらく似たことを出来る環境はあるが、実行対象の豊富さが強い
- org-roam
- org-exportの出力選択肢
    - Emacsのorg-modeは歴史が長いだけあって、出力設定が豊富
        - GitHub Flavored Markdown
        - Hugo Markdown
        - Zenn Flavored Markdown
- [alphapapa/org-web-tools](https://github.com/alphapapa/org-web-tools)
    - Emacsのブラウザ機能(eww)を利用して、クリップボードのURLのorg-modeリンクを自動で生成したり出来る

おそらくどの機能も作れなくは無い or 探せばどこかには似た機能やプラグインが存在するかもしれないんですが、私的にはEmacsを使ったほうが近道に感じました。

### nvim-orgmode/orgmodeでも実現できること

おそらく、これがVimもしくはNeovimのプラグインで一番多機能だと思います。  
基本的な機能はあります。

- Markdown的に軽量マークアップ言語としての利用
- org-agenda
- org-capture
- clock機能
- org-babelライクな使い方
    - [michaelb/sniprun](https://github.com/michaelb/sniprun) で似たことは出来そうです
        - ただ、org-modeでEmacsのinit.elの設定を書いて部分的に評価してVimの設定に反映的なことは難しいかもしれません

これで十分という場合も多いと思います。

### Neovimのnvim-neorg/neorgプラグイン

まだ発展途上という感じですが、[nvim-neorg/neorg](https://github.com/nvim-neorg/neorg)というNeovim用にorg-mode likeな機能を提供しようとしているプラグインがあります。  
現在はneorgでは未実装のTODO管理機能、clock機能は個人的に外せなかったので選択肢にはならなかったんですが、
neorgファイル用のLSPが存在しており、ファイルへのリンクなどがやりやすく良いプラグインだと思います。

## Emacsの設定について

まだEmacs歴が浅いので、雰囲気でやっている部分もあるんですが下記方針で設定を作っています。

- パッケージ管理にはuse-packageを使う
- 設定はorgファイルから生成する
- Spacemacs, Doom Emacsのようなディストリビューションは利用しない
    - 設定の参考にはする
- なるべく左手小指、薬指の負担を減らす
- Vim likeキーバインドは捨てられないので、evil-modeに頼る

### パッケージ管理にはuse-packageを使う

Vimのプラグインマネージャーが多くあるように、Emacsにもパッケージマネージャーがいくつかあるみたいです。
どれが良いのか評価出来るほど理解していませんが、use-packageで設定しているパッケージのREADMEを多く見かけたので、 use-packageを使っています。

多数派に従っていると、ChatGPT, Claude等に設定方法を聞いた時に楽なので多そうなやつにしました。

### 設定はorgファイルから生成する

Emacsには、 `org-babel-tangle` というorgファイルに書いたコードブロックをつなげて一つのファイルにしてくれる機能があります。  
これを利用して、 `init.org` というドキュメントにコードブロックとしてEmacs Lispを書いておき、設定をビルドする際にファイルとして書き出します。  
更新時に簡単に実行出来るようにMakefileで管理することが多いようです。

他の人の設定を参考にMakefileに以下のようなスクリプトを用意しました。  
`make build`を実行することで、`init.org`から`init.el`が生成されて、`init.el` のコンパイルが実行されます。

```makefile
.PHONY: build
build: ## Build emacs config
@$(EMACS) -Q --batch --eval "(progn (require 'ob-tangle) (org-babel-tangle-file \"./init.org\" \"./init.el\" \"emacs-lisp\"))"
@$(EMACS) --batch -Q -f batch-byte-compile init.el
```

このorgファイルから設定ファイルを生成するという体験がかなり便利で、org-mode最高ポイントの一つです。

### Spacemacs, Doom Emacsのようなディストリビューションは利用しない

一応、2016年ぐらいにSpacemacsを一瞬利用していたことがあります。  
よく出来ているんですが、ブラックボックスが多すぎると管理しきれず、何もわからんとなってしまったので今回は一から自分で設定を作っていきました。  
どのようなプラグインを利用しているか等の設定の参考には便利だったので、よくソースを見に行きました。

### 左手小指、薬指の負担を減らす

左手小指、薬指が貧弱なため、Emacsのデフォルトキーバインドをそのまま利用していると、私の指は耐えられません。  
evil-mode(Vim likeなキーバインドを提供するパッケージ)の利用である程度緩和できますが、他にも以下のような工夫をしています。

#### スペースキー長押しでCtrlキーにする

Karabiner-ElementsでEmacsに限らず設定しています。  
ターミナルでもCtrlキーは多様するので、小指の負担がかなり減ります。

#### C-xをC-jにリマップ

C-xはデフォルトで様々なコマンドのprefixになっており、頻繁に入力するキーです。  
xキーは左手薬指で押す必要があり、何度も入力していると貧弱な私の薬指では耐えられませんでした。  
下記のように設定してC-jで元のC-xの挙動をするようにしています。

```emacs-lisp
(define-key key-translation-map (kbd "C-j") (kbd "C-x"))
```

#### Super-jにM-xをリマップ

同様の理由でSuper-jにM-xをリマップしています。  
Macなので、SuperキーはCommandキーになり、押しやすいです。

#### Super-kに\*の割当

org-modeで\*を連打してるとShiftキーのせいで左手の小指が痛くなるので設定しています。  
Markdownはヘッダが#記号なので、左のShiftキーを押さずに済むんですよね...。

### Vim likeキーバインドは捨てられないので、evil-modeに頼る

テキスト編集はVimが最強だと思っているので、それに近い環境はほしいです。  
evil-modeはVimの基本的な機能はちゃんと使えるし、拡張も出来るので満足いく設定をしていけそうです。  
ただ、Vimと全く同様で不満が全く無いかというとそんなことは無いです。

## 困りごと・不満点

### evil-modeの不満点

設定でなんとかなるかもですが、今のところ困っている部分です。

- `/`検索→`:%s//変換文字列/`のような`/`検索した文字列をそのまま変換する際に検索文字列を省略できない
    - 少なくともデフォルトだと出来ないです
    - 設定もしくはEmacs Lisp書いて解決できないか模索中です
- Vimのノーマルモード操作をdmacroで繰り返すと、文字入力しようとする
    - これは単にdmacroがevil-modeなんて知らないというだけだと思いますが、出来たら嬉しいポイントです
- 矩形選択→選択範囲の行の末尾に文字を入力がVimと挙動が違う
    - 「C-v→$→A→入力→Esc」ではなく、「S-v→A→入力→Esc」になります
    - 代替手段があるので慣れでカバーできそうです

### ex-gfmでMarkdownを出力するとリストの表記が変

ex-gfmに限らずなんですが、リスト表記をMarkdownエクスポートすると、
`-␣文字列` となるはずが、 `-␣␣␣␣文字列`となってしまいます。  
設定次第な気がするんですが、見た目が微妙なのでなんとか直したいところです。

## まとめ

ちょっと不満もありますが、Emacs楽しいですね。  
常用するかはまだ決めてないんですが、なんとなくEmacs入門の扉は開けたかなと思います。  
気に入った機能をVimで再現してみるとかも楽しいかもしれません。もうしばらく遊んでみたいと思います。

