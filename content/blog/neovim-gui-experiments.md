---
id: blog/g2i6x9w
aliases:
  - Neovim GUIを色々試したメモ
tags:
  - Vim
  - Neovim
created: 2025-01-03 01:30
title: Neovim GUIを色々試したメモ
updated: 2025-01-03 01:30
---

# Neovim GUIを色々試したメモ

## 各GUI比較

- Neovide
    - カーソル移動がかっこいい
        - 煩わしい
            - 下記設定でOFFにすること可能
            ```lua
            -- GUI (Neovide)
            if vim.g.neovide then
              vim.g.neovide_position_animation_length = 0
              vim.g.neovide_cursor_animation_length = 0.00
              vim.g.neovide_cursor_trail_size = 0
              vim.g.neovide_cursor_animate_in_insert_mode = false
              vim.g.neovide_cursor_animate_command_line = false
              vim.g.neovide_scroll_animation_far_lines = 0
              vim.g.neovide_scroll_animation_length = 0.00
            end
            ```
    - 日本語入力時にそのまま入力されず、IMEが確定されるまで日本語が入力されない
    - 複数ウィンドウ開くと、Mac上で別のアプリケーションとして扱われるので、Dock上にNeovideがたくさん並ぶ
        - CMD+Tabでアプリ変更のときにも邪魔
- goneovim
    - 複数ウィンドウ開くと、Mac上で別のアプリケーションとして扱われるので、Dock上にNeovideがたくさん並ぶ
        - CMD+Tabでアプリ変更のときにも邪魔
    - 日本語入力問題なし
    - シンプル
    - kを連打すると、アプリウィンドウ左上にkって表示される。謎
- VimR
    - Mac専用
    - 複数ウィンドウ開いても別アプリとして扱われず大変良い
    - 日本語入力問題なし
    - 若干UIがダサいけど、我慢できる範囲
    - デフォルトで表示されてるファイルツリーも折り畳めるので悪くない
    - しばらくこれを試してみようかな

## 参考資料

- [github.com/akiyosi/goneovim](https://github.com/akiyosi/goneovim)
- [Neovide - Neovide](https://neovide.dev/index.html)
- [qvacua/vimr: VimR — Neovim GUI for macOS in Swift](https://github.com/qvacua/vimr)
- [Shorthand for disabling animations · Issue #2565 · neovide/neovide](https://github.com/neovide/neovide/issues/2565)

