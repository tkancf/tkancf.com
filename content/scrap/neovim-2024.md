---
title: "Neovimの設定を試してみる試行錯誤 2024"
description: "Neovimの設定を試してみる試行錯誤 2024"
pubDate: "2024-03-12"
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

2024/03/13追記

### which-key

ヘルプを出してくれる感じのプラグインで、Vimのコマンドなんて手が覚えるんだから不要と思っていたが、人気だったので試しに入れてみた。  
ごめんなさい。めちゃくちゃ便利です。  
特にキーバインドの定義と名前の表示設定が同時にできるのが実質ドキュメントみたいになっていて最高。  
そういえば、Spacemacsもデフォルトこんな感じで表示してくれるよね。

```lua
    {
        "folke/which-key.nvim",
        event = "VeryLazy",
        init = function()
            vim.o.timeout = true
            vim.o.timeoutlen = 300
        end,
        opts = {
            -- your configuration comes here
            -- or leave it empty to use the default settings
            -- refer to the configuration section below
        },
        config = function()
            local wk = require("which-key")
            wk.register({
                ["<leader>"] = {
                    ["<leader>"] = {
                        name = "telescope",
                        f = { "<cmd>lua require('telescope.builtin').find_files()<cr>", "Find Files" },
                        g = { "<cmd>lua require('telescope.builtin').live_grep()<cr>", "Live Grep" },
                        b = { "<cmd>lua require('telescope.builtin').buffers()<cr>", "Buffers" },
                        h = { "<cmd>lua require('telescope.builtin').help_tags()<cr>", "Help Tags" },
                        u = { "<cmd>lua require('telescope.builtin').oldfiles()<cr>", "Recent Files" },
                    },
                }
            })
        end
    },
```
