---
aliases:
  - このサイトでllms-full.txtを出力するようにした
tags:
  - LLM
  - ブログ
created: 2025-02-21 22:25
title: このサイトでllms-full.txtを出力するようにした
updated: 2025-02-21 22:25
---

# このサイトでllms-full.txtを出力するようにした

このサイト (https://tkancf.com/) でllms-full.txtを出すようにしました。https://tkancf.com/llms-full.txt からアクセス可能です。

## llms.txt、llms-full.txtについて

[The /llms.txt file – llms-txt](https://llmstxt.org/)に詳しいです。  
ざっくり説明だと、llms.txtにサイト・コンテンツの概要、リンク集を用意。llms-full.txtにサイトの全コンテンツを用意してLLMで便利に使おうよってルールです。

## 理由

ブログのデータを[Google NotebookLM](https://notebooklm.google.com/)、などに丸っと取り込んで活用できたら便利かな〜というのと、今後AIツールが増えていったときにペラ一のデータで存在していたほうが入力しやすいという状況が発生する機会が増えそうという予測で追加してみました。

## 実装

このPRで[Add llms-full.txt by tkancf · Pull Request #58 · tkancf/tkancf.com](https://github.com/tkancf/tkancf.com/pull/58/files)追加しています。  
現状、このサイトは[quartz](https://quartz.jzhao.xyz/)を使って作ってるんですが、そのquartzのビルドスクリプト内でllms-full.txtを生成してtxt形式で保存しているだけです。

## お気持ち

各サイトでのスタンダードになったら、LLMへの情報入力で便利そうなので流行って欲しいな〜という気持ちです。

## 参考

- [The /llms.txt file – llms-txt](https://llmstxt.org/)
- [このサイトで llms-full.txt を提供し始めた | Hirotaka Miyagi](https://www.mh4gf.dev/articles/llms-full-txt)
