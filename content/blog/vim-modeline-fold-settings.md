---
id: blog/q8s2h1g
aliases:
  - Vimのmodelineを使ってファイルの折りたたみ設定を変更する
  - Vimのmodelineを使ってファイルの折りたたみ設定を変更する方法
tags:
  - Vim
  - moved
created: 2024-12-01 15:36
title: Vimのmodelineを使ってファイルの折りたたみ設定を変更する方法
updated: 2024-12-01 15:36
---

# Vimのmodelineを使ってファイルの折りたたみ設定を変更する方法

- modelineを利用すると、ページの上部もしくは下部に設定を記載して、そのファイルにだけ設定を反映させることができる
- 例えば、下記のように記載するとfoldの設定をmarkerに変更できる

```
" vim: foldmethod=marker foldlevel=1
```

## 参考になる資料

- [モードラインを使って、ファイルごとにvimエディタのオプションを指定する。 — 名無しのvim使い](https://nanasi.jp/articles/howto/file/modeline.html)
