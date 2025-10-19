---
id: blog/l4n9c7b
aliases:
  - luaのソースコードから、コメントを読み取ってドキュメントを生成するツールについて調べる
tags:
  - 調査ログ
created: 2025-01-20 16:46
title: luaのソースコードから、コメントを読み取ってドキュメントを生成するツールについて調べる
updated: 2025-01-20 16:46
---

# luaのソースコードから、コメントを読み取ってドキュメントを生成するツールについて調べる

## 感想メモ

- Emacsのorg-modeでtangleして、ドキュメントを生成するのと似た感じで、Luaのソースコードからドキュメントを生成できるかな〜と思ったけど、あれはorg-modeの中に書いたコメントを実行しつつ抽出できるから便利だったので、LDocはそこまで便利ではないかもしれない
    - README.mdに書いたコメントを抽出して、ドキュメントを生成するのは便利かもしれないけど、それをやると、luaの補完が効かないのが難点になりそう
- ちょっと思っていたのと違ったので、今回はここまで

## Feloで調べる
<!--{{{-->

> Luaのソースコードからコメントを読み取ってドキュメントを生成するツールには、主に**LuaDoc**と**LDoc**があります。
> 
> ### **LuaDoc**
> 
> - **概要**: LuaDocはLuaソースコード用のドキュメント生成ツールで、ソースファイル内の宣言やドキュメントコメントを解析し、XHTML形式のドキュメントを生成します。LuaDocは、Lua 5.1に対応しており、自由にカスタマイズ可能なドキュメントコメントの形式を提供します[1][2]。
> 
> - **機能**: LuaDocは、他のフォーマットも生成できるように新しいドックレットを実装することが可能です。また、LuaFileSystemやLuaLoggingといった外部パッケージに依存しています[2][4]。
> 
> - **現状**: ただし、LuaDocは現在では古くなっており、使用が推奨されていないため、代わりにLDocを使用することが勧められています[2]。
> 
> ### **LDoc**
> 
> - **概要**: LDocはLuaDocと互換性のあるドキュメント生成ツールで、Markdownを使用してコメントをレンダリングすることも可能です。これにより、より柔軟で現代的なドキュメント作成が可能になります[11]。
> 
> - **機能**: LDocは、Luaのソースコードだけでなく、C拡張ソースも処理できるため、より広範な用途に対応しています。Markdownを利用することで、ドキュメントのスタイルを簡単に変更できる点が特徴です[11]。
> 
> ### **まとめ**
> 
> Luaのソースコードからコメントを読み取ってドキュメントを生成するツールとしては、LuaDocとLDocが存在しますが、現在はLDocの使用が推奨されています。LDocは、より柔軟で使いやすいドキュメント生成を提供し、Markdownのサポートにより、現代的なドキュメント作成が可能です。
> 
> - [1] https://keplerproject.github.io/luadoc/
> - [2] https://github.com/keplerproject/luadoc
> - [3] https://packages-picconi.debian.org/ja/sid/lua-doc
> - [4] https://web.tecgraf.puc-rio.br/~tomas/luadoc/luadoc.html
> - [5] http://lua-users.org/wiki/DocumentingLuaCode
> - [6] https://keplerproject.github.io/luadoc/manual.html
> - [7] https://devforum.roblox.com/t/moonreader-yet-another-documentation-generator/2864701
> - [8] https://www.reddit.com/r/lua/comments/pjjv76/an_early_version_of_my_documentation_generator/
> - [9] https://xn--pckzexbx21r8q9b.net/lua_tips/?luatoc
> - [10] https://ja.wikibooks.org/wiki/Lua/%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB
> - [11] https://github.com/lunarmodules/ldoc
> - [12] https://zenn.dev/yutakatay/articles/neovim-plugins-2022
> - [13] https://www.reddit.com/r/lua/comments/18h96qn/document_generator_for_lualanguageserver/
> - [14] https://ifritjp.github.io/documents/lua/
> - [15] https://stackoverflow.com/questions/12388376/how-should-i-document-a-lua-api-object-model-written-in-c-code
> - [16] https://gist.github.com/voluntas/8301665
> - [17] https://qiita.com/dauuricus/items/07b576a66e2c89c7247e
> - [18] https://alctail.sakura.ne.jp/contents/pg/lang/lua/
> - [19] https://umasupport.jimdofree.com/%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%AE%E7%B7%A8%E9%9B%86/
> - [20] http://mpu.seesaa.net/article/504491087.html

<!--}}}-->

## LDocを試す

### インストール

```bash
luarocks install ldoc
```

### 設定

config.ldってファイルを用意してあげると、そこに書いた設定でドキュメントを生成してくれる。

```bash
❯❯ ~/.config/nvim
❯ cat config.ld
project = "Neovim Config Documentation"
title = "Documentation for Neovim Configuration"
file = "."
dir = "docs/nvim"
format = "markdown"
readme = "README.md"
prettify_files = true
```

### 生成

```bash
ldoc .
```

" vim: foldmethod=marker foldlevel=1
