---
aliases:
  - mini.nvimを試す
tags:
  - Neovim
created: 2025-08-13 00:00
title: mini.nvimを試す
updated: 2025-08-13 00:00
---

# mini.nvimを試す

[Neovimをはじめよう feat. mini.nvim](https://zenn.dev/kawarimidoll/books/6064bf6f193b51) を読んで使ってみたくなったので試してみました。  
mini.files, mini.hipatterns, mini.tabline, mini.surround, mini.sessions, mini.starter, mini.pairs, mini.clueが気に入ったので常用してみようと思っています。

## mini.nvim導入前の設定

該当commitへのリンク: [tkancf/dotfiles](https://github.com/tkancf/dotfiles/tree/8dfbdb61680f67aa824cb10fa44577de94bfb9ec/dot_config/nvim) を残しておきます。

## 試したもの

いくつか試して、特に気に入ったプラグインのメモ

### mini.files

現状似たプラグインとしてファイラーにはoil.nvimを利用しています。  
ファイルの作成・変更をVimの操作のようにできることに加えて、ディレクトリを掘り進めたときにtree状態で表示されるのが好みでした。
oil.nvimから乗り換えて使ってみます。

### mini.tabline

デフォルトのtab表示のように、バッファ一覧が表示されます。
かなり便利で、今までtabを結構多用していたんですが、これを入れてからほぼバッファだけで良くなりました。

### mini.hipatterns

パターンとハイライトカラーを設定すると指定したパターンにマッチした単語をハイライトできる  
私はMarkdownファイルでTODO管理をしているので、TODOのステータスを色分けしたくて以下のような設定を入れてみた

```lua
    -- mini.hipatterns
    local hipatterns = require('mini.hipatterns')
    -- mini.extra
    local hi_words = require('mini.extra').gen_highlighter.words
    vim.api.nvim_set_hl(0, 'MiniHipatternsTODO', { fg = '#000000', bg = '#ffc0cb', bold = true })
    vim.api.nvim_set_hl(0, 'MiniHipatternsWIP', { fg = '#000000', bg = '#4169e1', bold = true })
    vim.api.nvim_set_hl(0, 'MiniHipatternsDONE', { fg = '#FFFFFF', bg = '#696969', bold = true })
    vim.api.nvim_set_hl(0, 'MiniHipatternsSCHE', { fg = '#000000', bg = '#3cb371', bold = true })
    vim.api.nvim_set_hl(0, 'MiniHipatternsNEXT', { fg = '#000000', bg = '#afeeee', bold = true })
    vim.api.nvim_set_hl(0, 'MiniHipatternsWAIT', { fg = '#000000', bg = '#f0e68c', bold = true })
    vim.api.nvim_set_hl(0, 'MiniHipatternsWILL', { fg = '#000000', bg = '#00ced1', bold = true })

    hipatterns.setup({
      highlighters = {
        todo = hi_words({ 'TODO' }, 'MiniHipatternsTODO'),
        wip  = hi_words({ 'WIP' },  'MiniHipatternsWIP'),
        done = hi_words({ 'DONE' }, 'MiniHipatternsDONE'),
        sche = hi_words({ 'SCHE' }, 'MiniHipatternsNOTE'),
        next = hi_words({ 'NEXT' }, 'MiniHipatternsNEXT'),
        wait = hi_words({ 'WAIT' }, 'MiniHipatternsWAIT'),
        will = hi_words({ 'WILL' }, 'MiniHipatternsWILL'),
        -- Highlight hex color strings (`#rrggbb`) using that color
        hex_color = hipatterns.gen_highlighter.hex_color(),
      },
    })

```

### mini.sessions

Neovimのセッション機能をいままで使ったことがなかったが、これとmini.starterを入れてからは便利に使っています。  
[mini.sessions｜Neovimをはじめよう feat. mini.nvim](https://zenn.dev/kawarimidoll/books/6064bf6f193b51/viewer/86e45d)を参考にセッション管理のコマンドを入れて使っています。

