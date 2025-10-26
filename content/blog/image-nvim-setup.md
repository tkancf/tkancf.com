---
aliases:
  - image.nvimのセットアップ
  - image.nvimのセットアップ方法
tags:
  - Neovim
created: 2025-01-31 07:32
title: image.nvimのセットアップ方法
updated: 2025-01-31 07:32
---

# image.nvimのセットアップ

Neovimで画像表示するために、image.nvimを使いたいのでその設定方法

参考: https://andrewcourter.substack.com/p/render-images-inside-neovim-and-tmux

## imagemagicのインストール

```bash
brew install imagemagick
```

## asdfのインストール

```bash
brew install asdf
```

## lua5.1のインストール

```bash
asdf plugin-add lua https://github.com/Stratus3D/asdf-lua.git
asdf install lua 5.1
echo "lua 5.1" >> ~/.tool-versions
```

```bash
❯ cat ~/.tool-versions
lua 5.1
```

```bash
❯ luarocks --local --lua-version 5.1 install magick
Installing https://luarocks.org/magick-1.6.0-1.src.rock
magick 1.6.0-1 is already installed in /Users/tkan/.luarocks
Use --force to reinstall.
```

## お試し

https://github.com/3rd/image.nvim/blob/master/minimal-setup.lua
から、最小設定ファイルをダウンロードしてきて、下記コマンドを実行

```bash
nvim --clean -c ":luafile minimal-setup.lua"
```

画像表示された！

## 設定追加

```lua
{
  "vhyrro/luarocks.nvim",
  priority = 1001, -- this plugin needs to run before anything else
  opts = {
    rocks = { "magick" },
  },
},
{
    "3rd/image.nvim",
    config = function()
      require("image").setup({
        backend = "kitty",
        integrations = {
          markdown = {
            enabled = true,
            clear_in_insert_mode = false,
            download_remote_images = true,
            only_render_image_at_cursor = false,
            filetypes = { "markdown", "vimwiki" }, -- markdown extensions (ie. quarto) can go here
            resolve_image_path = function (document_path, image_path, fallback)
              return fallback(document_path, image_path)
            end
          },
          html = {
            enabled = false,
          },
          css = {
            enabled = false,
          },
        },
        max_width = nil,
        max_height = nil,
        max_width_window_percentage = nil,
        max_height_window_percentage = 50,
        window_overlap_clear_enabled = false,                                         -- toggles images when windows are overlapped
        window_overlap_clear_ft_ignore = { "cmp_menu", "cmp_docs", "" },
        editor_only_render_when_focused = false,                                      -- auto show/hide images when the editor gains/looses focus
        tmux_show_only_in_active_window = false,                                      -- auto show/hide images in the correct Tmux window (needs visual-activity off)
        hijack_file_patterns = { "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", "*.avif" }, -- render image files as images when opened
      })
    end
  }
```

