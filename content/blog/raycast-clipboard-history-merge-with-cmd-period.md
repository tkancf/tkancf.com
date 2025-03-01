---
id: raycast-clipboard-history-merge-with-cmd-period
aliases:
  - Raycast のクリップボードヒストリーは Command+.で結合できる
tags:
  - Raycast
created: 2023-04-24 17:01
description: RaycastのクリップボードヒストリーはCommand+.で結合できるのが便利なので解説します。
title: Raycast のクリップボードヒストリーは Command+.で結合できる
updated: 2025-02-06 17:01
---

# Raycast のクリップボードヒストリーは Command+.で結合できる

タイトル通りなんですが、どういうことか言葉だけだと分かりづらい部分もあるかと思うのでスクリーンショットを貼りつつ説明します。

## 説明

[Raycast](https://www.raycast.com/) にはクリップボードヒストリー機能があります。
(環境によりけりですが、`clip` ぐらいまで入力すれば出てくるはずです。)
![Raycast-clipboard-history.png](https://gyazo.com/10e76a4612cf7b332b6afb663f60f9f0.png)
クリップボードヒストリーでは以下のように、過去にコピーした文字列が記憶されています。
今回紹介する機能は過去の文字列と、現在コピーしている文字列を繋げられるという機能です。

### 例

以下は`tkan`がコピーされている状態のクリップボードヒストリーです。

- tkan をコピーした状態の画像
  ![tkanをコピーした状態の画像](https://gyazo.com/99cdf837bbb6f3cefc954644c71949f2.png)
  上の状態で一つ下の `٩( ᐛ )و ﾜｰ` を選択して、⌘ と`.` キーを同時押しすると、コピー中の文字列が更新(結合)されて `tkan ٩( ᐛ )و ﾜｰ` になります。

- 更新されて tkan ٩( ᐛ )و ﾜｰになった画像
  ![更新されてtkan ٩( ᐛ )و ﾜｰになった画像](https://gyazo.com/e91ff2c5cfca7f449ea90e0fbb18359d.png)

個人的には、README に書いてあるコマンドを複数行コピーしたいときに全部コピーしておいて繋げて実行という使い方をしたことがあります。

## まとめ

小ネタですが、最近 Alfred ではなく、Raycast を試していて個人的に便利だなと思った機能だったので紹介しました。  
Alfred も有料版ユーザーなので全然困っていないんですが、この機能があるのでしばらく Raycast 使おうかなという気になっています。
