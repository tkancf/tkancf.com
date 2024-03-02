---
title: "Vimの設定整理した - 2020年版"
description: "Vimの設定整理したのでメモ"
pubDate: "2020/10/15"
heroImage: "/placeholder-hero.webp"
---

## 概要

Vimの設定がごちゃごちゃしてきていたので、久々にvimrc大掃除して使っていないプラグインを消したりキーマップを考え直したりしました。  
プラグインの選定基準、キーマップの設定基準等を思い返すためにも一度まとめておきます。  

## 整理する上で意識したこと

- features=huge でコンパイルされた Vim8(>=8.0.1453) で動作すること
- Neovim のことは考えない
- Windows での動作は考えない
- 基本的に .vimrc 1ファイルを管理する

### features=huge でコンパイルされた Vim8(>=8.0.1453) で動作すること

私が開発したくなるような環境では Vim8(>=8.0.1453) が入っているか、容易にインストール可能なはずなので、 Vim7 以下については考慮しないようにしました。  
features=huge だけだと、 +python3, +lua が入りませんが、有効化されているか確認して必要があれば有効化する等の作業が個人的に煩わしいため、切り捨てました。

### Neovim のことは考えない

私はNeovimを使用していないので、そもそも検討していません。  
たまに情報を追ってはいるのですが、現状「どうしても Neovim でないと駄目！」って機能が個人的には無いので乗り換える予定もないです。

### Windows での動作は考えない

現在、家にも職場にも Windows 環境が無いので、検討しないことにしました。  
WSL2 もあるので。

### 基本的に .vimrc 1ファイルを管理する

1ファイルに全部の設定を書き、プラグインのロード、プラグインの設定等のカテゴリごとに fold しています。

## キーマップの割り当て

下手なマッピングをするとデフォルトの設定を上書きしてしまったり、覚えられないキーマップを設定してしまったりするため、ある程度規則性を持たせることにしました。  
\<Leader> キーはデフォルトの \ をそのまま使用し、プラグインのショートカット等に使用するキーとして以下の5キーを利用します。  

### \<Leader> キー (\ キー)

プラグイン用のキー。デフォルトでは何も割り当てられていないので自由に使える。  
他のキーに変えたりはせず、そのまま \ をプレフィックスキーとして使用します。

### \<Enter> キー

デフォルトだと "カーソルを N 行下の先頭の CHAR へ移動するキー。"(Nj\<C-^>と同等のハズ)  
デカイキーなのに使わない機能なので潰して、第2のプレフィックスキーになってもらうことにしました。

### s キー

デフォルトだと cl と同等の機能。  
比較的押しやすい位置にある使わない機能を持ったキーなので、第3のプレフィックスキーとして働いてもらいます。

### \<Space> キー

デフォルトだと l と同等の機能。  
でかくていい位置にあり、間違いなく使わない機能なので、第4のプレフィックスキーとしてよく使うプラグインを担当してもらいます。

### 方向キー

ノーマルモードでは方向キー h, j ,k, l と同等の機能。  
h, j ,k, l が壊れない限りは移動キーとして使わないので、gina.vimのキーバインドとして使うことにしました。  
矢印キーを押すとgitのdiffを確認したり、commit出来たりします。

それぞれの用途はざっくり以下のように決めました。

- \<Leader> キー
  - LSPの機能
- \<Enter> キー
  - coc.nvim
  - s キー
  - vim-operator-surround
- \<Space> キー
  - vim-quickrun
  - CtrlP
  - open-browser
  - その他自分で定義した関数
- 方向キー
  - gina.vim

## プラグイン

+python3 も +lua もないので、なるべくピュア Vim だけで動作するプラグインを選択するようにしています。  
現状だと、唯一[neoclide/coc.nvim](https://github.com/neoclide/coc.nvim) が node を事前にインストールしておく必要がありますが、node がインストールされていない時は vim-lsp を使うように分岐させています。  
下に挙げたもの以外にもいくつか各言語用のプラグインを入れたり消したりしてますが、入れ替わりが激しいので省きます。

※こっから下は入れてるプラグインとその雑な解説がつらつら書いてあるだけです。  

### [junegunn/vim-plug](https://github.com/junegunn/vim-plug)

プラグインマネージャー有名なやつです。  
シンプルに使いやすいのでずっと使っています。

### [vim-scripts/wombat256.vim](https://github.com/vim-scripts/wombat256.vim)

カラースキーム wombat256  
見やすいのでターミナルも含めて愛用してます。

### [itchyny/lightline.vim](https://github.com/itchyny/lightline.vim)

Vimのステータスラインをいい感じに表示してくれるプラグイン  
ステータスラインが見やすいとなんとなくモチベーションも上がるので。

### [vim-jp/vimdoc-ja](https://github.com/vim-jp/vimdoc-ja)

Vim のヘルプを日本語化するプラグイン

### [scrooloose/nerdtree](https://github.com/scrooloose/nerdtree)

ファイラプラグイン  
個人的にはディレクトリツリーを開ければ良いので、NERDTreeである必要は特に無いです。- キーをディレクトリツリーの表示・非表示としてマッピングしています。

### [glidenote/memolist.vim](https://github.com/glidenote/memolist.vim)

決まったフォーマットのメモを作成・呼び出し出来るシンプルなプラグイン  
作者の方のブログ記事読むのが一番良いです。[シンプルなメモ管理用プラグインmemolist.vimを作った](https://blog.glidenote.com/blog/2012/03/26/memolist.vim/)  
後述するCtrlPと組み合わせて使っています。

### [ctrlpvim/ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim)

いわゆるセレクタプラグイン(unite.vim, denite.nvimと似た機能のプラグイン)  
バッファ・直近で開いたファイル等の fuzzy finderとして利用できます。  
バッファの移動・直近で開いたファイルの編集・memolist.vim で作成したメモ一覧の検索によく利用しています。

### [mattn/ctrlp-launcher](https://github.com/mattn/ctrlp-launcher)

CtrlPの拡張プラグインでランチャー機能を追加できるプラグイン  
忘れがちなVimのコマンドを自由に登録して絞り込み→実行が可能になります。  
作者の方のブログ記事読むと完全に理解出来ます。[CtrlP にランチャ拡張書いたら捗りすぎて生きているのが辛い](https://mattn.kaoriya.net/software/vim/20120427205409.htm)  

- TweetVimでつぶやく
- exe "CtrlP" g:memolist\_path を実行してmemolistのファイル一覧を検索
- previm でMarkdownをプレビュー

機能としてはシンプルですが、これ無しには生きていけない体にされています。  

### [sgur/ctrlp-extensions.vim](https://github.com/sgur/ctrlp-extensions.vim)

CtrlP の絞り込みの対象を追加できるプラグイン  
以下の機能を追加します。

- コマンドライン履歴
- CtrlP の機能一覧
- yank した履歴

### [rhysd/vim-operator-surround](https://github.com/rhysd/vim-operator-surround)

テキストオブジェクトを指定の囲み文字で囲んだり、囲み文字を削除したり可能になるプラグイン  
vim-surround と似た機能を持つプラグインですが、こちらのほうがカスタマイズ性が高い印象があったので好んで使っています。  
このプラグインで s キーをプレフィックスとして利用しています。  

[kana/vim-operator-user](https://github.com/kana/vim-operator-user) が前提プラグインとして必要になるので、併せてインストールしています。  

### [jiangmiao/auto-pairs](https://github.com/jiangmiao/auto-pairs)

括弧の左側を入力すると自動で閉じてくれるプラグイン  
括弧に限らずクォートも入力してくれます。  
たまに入力補完プラグイン等と干渉して、余計な入力が発生するので削除するかもしれませんが、便利プラグインです。

### [kana/vim-submode](https://github.com/kana/vim-submode)

サブモードを追加できるプラグイン  
なんですが、分かりにくいので thincaさんの解説記事 [submode.vim とその設定例なんかを紹介](https://thinca.hatenablog.com/entry/20130131/1359567419) を読むと良いです。  
上記解説記事にある 「ウィンドウサイズ変更モード」 を作って利用しています。  

### [lambdalisue/gina.vim](https://github.com/lambdalisue/gina.vim)

Vim で利用できる Git クライアントプラグイン  
方向キーを入力すると status, diff, patch, commit がウィンドウを分割して開くように割り当てています。  
方向キーを押すだけで diff を確認したり、 commit 出来たりするのが体験良いです。

### [previm/previm](https://github.com/previm/previm)

Markdown のプレビューができるプラグイン

### [tyru/open-browser.vim](https://github.com/tyru/open-browser.vim)

ブラウザを開くプラグイン  
上記 previm のプレビュー時にブラウザを開くため、選択した範囲のURLをブラウザで開くために使用しています。  
複数選択したURLを一気に開ける機能が便利です。  

### [haya14busa/vim-asterisk](https://github.com/haya14busa/vim-asterisk)

\* での検索時にカーソルを移動しないようにするプラグイン

### [easymotion/vim-easymotion](https://github.com/easymotion/vim-easymotion)

数タイプすれば指定した単語、行へ一気に移動できるプラグイン  
移動が多い時に便利です。

### [miyakogi/seiya.vim](https://github.com/miyakogi/seiya.vim)

ターミナルでVimを開いたときに背景を透過するためのプラグイン  
ターミナルは基本的に背景透過して使っているので使っています。

### [thinca/vim-quickrun](https://github.com/thinca/vim-quickrun)

編集中のプログラムをVimから実行できるプラグイン  
プログラムを編集しつつ実行結果を確認できるのが便利です。

### [mattn/vim-goimports](https://github.com/mattn/vim-goimports)

Go言語で goimport を自動実行して、ソースコードをフォーマットしてくれるプラグイン  
以前はvim-goを使っていましたが、 使っている機能が goimport + LSPでもサポートしている機能のみだったので、  
[作者の方のブログ記事](https://mattn.kaoriya.net/software/vim/20200106103137.htm) を読んで乗り換えました。

### [mattn/sonictemplate-vim](https://github.com/mattn/sonictemplate-vim)

ソースコードのテンプレートを挿入してくれるプラグイン  
markdownのメモ, Makefileの雛形, main関数 等のよく入力するお決まりのパターンをテンプレートとして用意しています。

### [prabirshrestha/vim-lsp](https://github.com/prabirshrestha/vim-lsp)

LSPクライアントプラグイン  
[vim-lsp-settings](https://github.com/mattn/vim-lsp-settings)というプラグインがあり、設定をあまりせずコマンド一つで Language Server をインストールできるので利用しています。

### [prabirshrestha/asyncomplete.vim](https://github.com/prabirshrestha/asyncomplete.vim) [prabirshrestha/async.vim](https://github.com/prabirshrestha/async.vim) [prabirshrestha/asyncomplete-lsp.vim](https://github.com/prabirshrestha/asyncomplete-lsp.vim)

LSPの補完プラグインとその依存プラグイン  

### [neoclide/coc.nvim](https://github.com/neoclide/coc.nvim)

LSPクライアントプラグインその2  
nodeをインストールした環境では vim-lsp ではなく、こちらを使うようにしています。

### [Shougo/neosnippet.vim](https://github.com/Shougo/neosnippet.vim), [Shougo/neosnippet-snippets](https://github.com/Shougo/neosnippet-snippets)

スニペットプラグインとそのスニペット集  
coc.nvim からスニペット候補を出せるようにしています。  

### [basyura/TweetVim](https://github.com/basyura/TweetVim)

Vim から Twitter するためのプラグイン  
以下に依存しているので、一緒に入れています。

- [mattn/webapi-vim](https://github.com/mattn/webapi-vim)
- [basyura/twibill.vim](https://github.com/basyura/twibill.vim)
- [basyura/bitly.vim](https://github.com/basyura/bitly.vim)

## 現状のvimrc

<script src="https://gist.github.com/tkancf/c27e20d75807647d2d298c8b76e23a64.js"></script>
