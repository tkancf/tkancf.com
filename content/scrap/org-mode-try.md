---
title: "org-modeを試してみた"
description: "org-modeを試してみた"
pubDate: "2024/03/26"
---

3つほど別のやり方をそれぞれ試してみた

- Neovimでvim-orgmode
- Neovimでneorg
- Emacsのorg-mode

## [nvim-orgmode/orgmode](https://github.com/nvim-orgmode/orgmode)

clock機能が実装されてるのはGood ドキュメントはサイト見るより、helpドキュメント見るほうが良さそうだった 悪くないけど他も試したい

## [nvim-neorg/neorg](https://github.com/nvim-neorg/neorg/)

Neovimに向けて独自フォーマットで作ってるorg Likeなプラグイン clock機能, TODO機能が実装されてないのが残念 ファイルリンクや、Telescope.nvimの拡張などが揃っていて、結構いい感じ 足りてない機能さえ揃えば乗り換えても良いかも

## Emacsのorg-mode

Emacsの設定がそもそもないので、それを用意するところからスタートになったけど、ある程度設定出来たら良い感じになった。 Vimじゃないって部分は、evilパッケージである程度カバーできる

## Emacsのorg-modeで良いなと思ったもの

- clock機能、アジェンダ機能がちゃんとある
  - 本家なのでそれはそうなんだけど便利
- スピードコマンドが便利
  - サクサク次のheadingへ移動できる
  - アウトラインのレベル変更、clock-in等いろんなコマンドをその場で簡単に実行できるようになる
  - 神機能
- subtreeのnarrowing (そのツリー配下だけを表示する)
  - todo.orgを開いて、特定のTODOだけについてだけ表示/編集/検索したいって時にとても便利

## 結局どうする？

やっぱり本家が一番って感じだったので、Emacsのorg-modeをしばらく使ってみる。
