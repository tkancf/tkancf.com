---
title: "Neovimの設定を試してみる試行錯誤 2024"
description: "Neovimの設定を試してみる試行錯誤 2024"
pubDate: "2024/03/12"
---

Neovimを使ってみるのは、v0.1.x 以来なのでかなり浦島太郎  
色々増えてて面白そうなので、一から設定してみる

## 設定

- luaで全部書けるようになってるっぽい
- ファイル分割している例を多数見たが、試行錯誤の段階では一ファイルのほうが楽な印象あるので、とりあえず1ファイルで

## プラグイン

### プラグインマネージャー

- [folke/lazy.nvim: 💤 A modern plugin manager for Neovim](https://github.com/folke/lazy.nvim) が有名らしい
- 試しに触ってみたけど、インストールのUIとかかっこ良い

### ランチャー

[nvim-telescope/telescope.nvim: Find, Filter, Preview, Pick. All lua, all the time.](https://github.com/nvim-telescope/telescope.nvim) が人気ありそう
とりあえずバッファとファイル検索できればOKなので、これでいいかな
他にもあるけど、まずはこれで

Neovimのプラグインはポップアップウィンドウに出すのが多い気がする

---

2024/03/12の試行錯誤一旦ここまで
