---
title: "Raycast のクリップボードヒストリーは Command+.で結合できる"
description: "RaycastのクリップボードヒストリーはCommand+.で結合できるのが便利なので解説します。"
pubDate: "2023/04/24"
heroImage: "/raycast-clipboard-history-merge-with-cmd-period/Raycast-clipboard-history.webp"
---

タイトル通りなんですが、どういうことか言葉だけだと分かりづらい部分もあるかと思うのでスクリーンショットを貼りつつ説明します。

## 説明

[Raycast](https://www.raycast.com/) にはクリップボードヒストリー機能があります。
(環境によりけりですが、`clip` ぐらいまで入力すれば出てくるはずです。)
![Raycast-clipboard-history.png](/raycast-clipboard-history-merge-with-cmd-period/Raycast-clipboard-history.webp)
クリップボードヒストリーでは以下のように、過去にコピーした文字列が記憶されています。
今回紹介する機能は過去の文字列と、現在コピーしている文字列を繋げられるという機能です。

### 例

以下は`tkan`がコピーされている状態のクリップボードヒストリーです。

- tkan をコピーした状態の画像
  ![tkanをコピーした状態の画像](/raycast-clipboard-history-merge-with-cmd-period/Raycast-clipboard-tkan.webp)
  上の状態で一つ下の `٩( ᐛ )و ﾜｰ` を選択して、⌘ と`.` キーを同時押しすると、コピー中の文字列が更新(結合)されて `tkan ٩( ᐛ )و ﾜｰ` になります。

- 更新されて tkan ٩( ᐛ )و ﾜｰになった画像
  ![更新されてtkan ٩( ᐛ )و ﾜｰになった画像](/raycast-clipboard-history-merge-with-cmd-period/Raycast-clipboard-tkan-wa-.webp)

個人的には、README に書いてあるコマンドを複数行コピーしたいときに全部コピーしておいて繋げて実行という使い方をしたことがあります。

## まとめ

小ネタですが、最近 Alfred ではなく、Raycast を試していて個人的に便利だなと思った機能だったので紹介しました。  
Alfred も有料版ユーザーなので全然困っていないんですが、この機能があるのでしばらく Raycast 使おうかなという気になっています。
