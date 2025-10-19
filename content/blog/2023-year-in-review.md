---
id: blog/2023sum
aliases:
  - 2023年の振り返り
tags:
  - 振り返り
created: 2023-12-31 16:59
title: 2023年の振り返り
updated: 2025-02-06 16:59
---

# 2023年の振り返り

![Title Image](https://i.gyazo.com/c1486102d84730f1d1a744ac70455841.png)

年末なので、今年1年を振り返ってみます。٩( ᐛ )و

## 作ったもの・書いたもの等

### ブログ

今年は下記20件のブログを書きました。今年の4月にブログをはてなブログから、Astro + Cloudflare Pagesに移行してから、ブログを書く頻度が上がりました。去年は年間10件に満たなかったので、今年の20件は大幅な増加です。  
増えた理由としては、普段のメモの取り方を変えたこと、Twitterをほぼやめたことでブログについて考える頻度を増やせたのかなと思っています。

- [Self-hosted LiveSyncとFly.ioを使って、Obsidianのメモを無料で同期する](https://tkancf.com/blog/x6z7o5n)
- [CloudFlare PagesでホストしているAstro.jsブログでリダイレクトする方法](https://tkancf.com/blog/v5x6m8l)
- [VimのCTRL-K <Space>を理解する](https://tkancf.com/blog/b8d2s4r)
- [ISUCON13に参加しました。最終スコアは8654でした](https://tkancf.com/blog/p4r1g9f)
- [tofu65キーボードを買いました](https://tkancf.com/blog/tofu65r)
- [SvelteKitでカードゲームのプロキシメーカーを作りました](https://tkancf.com/blog/i3k5z2y)
- [GitHub Mobile + GitHub issueでメモが良い感じ](https://tkancf.com/blog/o8q7f5e)
- [$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ) を理解する](https://tkancf.com/blog/a3c5r9q)
- [iTerm2でベルの音を止める](https://tkancf.com/blog/r3t4i6h)
- [Astroのバージョンをv2からv3に上げました](https://tkancf.com/blog/c5e7t1s)
- [GitHub ActionsでPulumiをCI・CDしてみた](https://tkancf.com/blog/z7b8q6p)
- [Pulumi+GoでCloudflareのDNS既存リソースをインポートして管理してみた](https://tkancf.com/blog/q7s8h2g)
- [cdコマンドを拡張したzoxideコマンドが便利](https://tkancf.com/blog/g7i8x3w)
- [CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました](https://tkancf.com/blog/j7l1a6z)
- [『SOFT SKILLS ソフトウェア開発者の人生マニュアル』を読み返しました](https://tkancf.com/blog/u1w2l4k)
- [Raycast のクリップボードヒストリーは Command+.で結合できる](https://tkancf.com/blog/t4v5k7j)
- [Commandキーをtmuxのプレフィックスキーとして使う方法 on Iterm2](https://tkancf.com/blog/h6j9y8x)
- [AstroとCloudflare Pagesでブログを作成しました](https://tkancf.com/blog/d4f5u6t)
- [ブログをAstroへ以降しました](https://tkancf.com/blog/l9n2c7b)
- [過去に別のブログで書いた技術記事まとめ](https://tkancf.com/blog/s8u9j3i)

### GitHub

GitHubは例年特に何もしていないのでまっさらなんですが、今年は以前のブログで触れた通り、ブログの記事管理をAstroに変更したり、Cloudflare WorkersでLINE botの作成などを行いそれなりに草が生えました。

下記が2022年の草
![GitHub Contribution 2022](https://i.gyazo.com/7da2fbabdbcf2d5857bb12f1d8d7cd47.png)

そして、これが今年(2023年)の草です。
![GitHub Contribution 2023](https://i.gyazo.com/17f0aeabdd6fc5068352a875e307647e.png)

4月にブログを移行してからしばらくは、ブログの記事を書くためにコミットできていましたが、5〜10月にほぼ何もできませんでした。  
10月中頃に結婚式が終わって一段落して以降の10月末頃から、またコミットできるようになりました。来年は年間通してコミットし続けられると良いですね。

### 作ったもの

以下プライベートで作っていたものです。  

- カードゲームのプロキシメーカー
  - SvelteKit + Cloudflare Pages
  - 個人的に欲しい機能を満たすものが無かったので自作しました
  - ブログも書きました: [SvelteKitでカードゲームのプロキシメーカーを作りました](https://tkancf.com/blog/i3k5z2y)
- LINE bot
  - Cloudflare Workers + Cloudflare D1 + Hono
  - Cloudflare Workersのお試し兼、妻とのやり取りで普通に欲しかったので作りました。今も少しずつ改良しながら便利に使っています
  - ブログも書きました: [CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました](https://tkancf.com/blog/j7l1a6z)
- MoneyForwardのデータをもとに、色々とグラフを作成して表示するためのツール
  - Go + Google Spreadsheet + Google Sites
  - MoneyForwardのデータをGoogle Spreadsheetにエクスポートして、Google Sitesで表示するためのツール
  - 毎月1回、家計簿の振り返りを行っていますが、MoneyForwardプレミアムのグラフだけだと、振り返りに必要な情報が足りないので作りました
  - Google Sitesは簡単にアクセス権限を設定できるし、Google Spreadsheetのグラフを並べたページを作成出来るので便利ですね
- ISUCON用便利スクリプト
  - ISUCONのために作ったスクリプト郡
    - [tkancf/isucon-tools](https://github.com/tkancf/isucon-tools)
  - ISUCON13では勉強不足を感じたので、次回に向けて引き続き育てていきたいです

全体的に自分の欲求を満たすために作ったものが多いですね。  
今は副業もしておらず、仕事でプログラミングする機会もほぼ無いのでプライベートで手を動かしていないと何も出来なくなりそうで恐怖しています。引き続き精進していきたいです。

## 仕事

2022年の8月から仕事でマネージャー業をやることになり、1年と少し経過しました。  
業務内容としてはチームメンバーのマネジメントが職務の中心で、ピープルマネジメントが軸になっています。  
1on1、評価、採用、目標設定、キャリアパス、チームビルディング、チームの課題の発見・整理・解決が良くある業務です。
エンジニアリングマネージャーという区分が一番近いのかなと思っています。  
プレイヤーをやっていた時と比べると、時間の区切り方が細かくなっておりバタバタしていると感じていましたが、流石に1年経つと慣れてきました。
プレイヤーとしての時間区切りが数時間単位だったのに対して、マネージャーとしての時間区切りは15分から1時間を単位にして会議・1on1・タスクを切り替えていくので、時間の区切り方が細かくなっていると感じています。  
採用面接など、まだ慣れない部分もあって、チームメンバーから偶に忙しそうと言われることがあるのが反省点なので、余裕があるように振る舞いたいですね。  
最近、[『エンジニアリングマネージャーのしごと ―チームが必要とするマネージャーになる方法』](https://amzn.to/47ncyHk)という本を読んでいて、自分のやっていることが本に書いてあることと似ているなと思いました。まだ読んでいる途中ですが、読み終わったらブログにまとめたいと思います。

## プライベート

### イベント

大きなイベントとしては、今年は結婚式を挙げました。妻と二人で相談しつつ準備を進め、無事に挙げることが出来ました。  
式の2, 3ヶ月前になると、やらなければいけないタスクが多くて大変でしたが、挙げて良かったなと思っています。
手書きが必要なタスクを苦手としているんですが、所々それらのタスクが必要で消耗しました。
結婚式の準備に力を取られすぎて、月に一度妻とやっている1on1を少しサボってしまったので、来年は忘れずにやりたいです。

### 生活

結婚式以外だと、今年は例年と比較して体調を崩すことが多かったです。リモートワークになってから、ベースの体力がなくなっている自覚はあるので筋トレで体力を増やしたいです。

今年は普段のメモ環境構築の検討・変更を繰り返していました。
11月頃にObsidianに落ち着いたんですが、直近2ヶ月ぐらいは良い感じのリズムを作れているので、引き続きやり方を改善しつつ、アウトプットに繋げていけると良いなと思っています。

## 2024年について

下記はやりたいなと思っています。

- ISUCON14に向けての準備
  - ISUCON13では勉強不足を感じたので、単純に練習量を増やしていきたいです
- ブログを継続して書く
  - 今年は20件書けたので、来年はそれ以上に書けるようにしたいです
- マネジメント関連の本を読む
  - 今は『エンジニアリングマネージャーのしごと ―チームが必要とするマネージャーになる方法』を読んでいますが、他にも気になる本はいくつかあるので読んでいきたいです

今年も1年お世話になりました。来年もよろしくお願いします。٩( ᐛ )و
