---
id: blog/f2h4w7v
aliases:
  - Zedエディタでdenoのスクリプトを書くときの設定
tags:
  - Zed
created: 2024-09-08 09:42
title: Zedエディタでdenoのスクリプトを書くときの設定
updated: 2024-09-08 09:42
---

# Zedエディタでdenoのスクリプトを書くときの設定

何も設定しないと、Denoの `import` 、`Deno.args` 等でZed上にエラー警告が出るので、解消するための設定

## Deno Extensionsのインストール

ZedのExtensions一覧を`Deno`で検索してInstallするだけ

## 設定ファイルの配置

ZedのLocal Settingsを開いて、下記設定を追加する  
Zedの `Settings` → `Open Local Settings` で設定ファイルは開ける

```json
{
  "languages": {
    "TypeScript": {
      "language_servers": ["deno", "!typescript-language-server", "!vtsls"]
    },
    "TSX": {
      "language_servers": ["deno", "!typescript-language-server", "!vtsls"]
    },
    "JavaScript": {
      "language_servers": ["deno", "!typescript-language-server", "!vtsls"]
    }
  },
  "formatter": "language_server"
}
```

## 再起動？

設定を書くだけだとエラーが消えないかもしれないので、Zedを再起動すると良い

## あとがき

最近、ちょっとしたスクリプトを書くときは [Zed](https://zed.dev/) を使ってて下記イメージで使い分けてる

- Markdownのメモ: Neovim
- 複数ファイルあるぐらいのプログラミング: VSCode
- 1ファイルぐらいのちょっとしたスクリプト: Zed

bashでやるには複雑で、真面目にCLI作るってほどでもない自分用のスクリプトをDenoとdaxで書くみたいな要件とかまさにそれ

Vimモードがかなり良く出来てて、VSCodeより軽いので好んで使ってる。
もうちょっと馴染んだらVSCodeから完全に乗り換えられるかも  

