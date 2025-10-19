---
id: blog/20250409232616
aliases:
  - obsidian.nvimとquartzでメモをブログにした
tags:
  - Neovim
  - PKM
  - Obsidian
created: 2025-04-09 23:26
title: obsidian.nvimとquartzでメモをブログにした
updated: 2025-04-09 23:26
---

# obsidian.nvimとquartzでメモをブログにした

## メモの取り方

- 以前はObsidianで取っていた
- Obsidianの機能に近いものが使えるobsidian.nvimというNeovimプラグインがあり、最近はこれでメモを取ってる
    - Obsidianより機能は少ないが、Neovimで使えるのが一番の利点
        - 使い慣れたNeovimのプラグインが使えるのはでかい
    - Obsidianを使っているとObsidianの独自記法 (query, tasks, 埋め込み etc...) が便利
        - 便利な一方で可搬性のあるMarkdownという利点が失われてしまうのが気になってしまった

## ブログ記事の管理方法

- メモとブログ記事のMarkdownは完全に分けて管理していた
- メモとブログ記事を一緒にすればアウトプットの障壁が減らせそうなので、統合してみた
    - 現状はいい感じ
- アウトプットの閾値イメージとしてはTwitterぐらいの感覚
- 毎月YYYY-MM.mdを用意して、そこに日記みたいなメモを書いてる

## ブログ記事の生成

- 以前まではブログの生成は[HonoのSSGを利用して自作したプログラム](https://tkancf.com/blog/g2i3x4w)でやっていた
- よく動いてくれていたが、 [quartz](https://quartz.jzhao.xyz/)を見つけた
    - quartzはObsidianのメモをほぼそのまま公開することができるSSG
    - メモをほぼそのまま公開するのであれば、自作のものより良さそうだったので乗り換えた
        - 現状は気に入っている

