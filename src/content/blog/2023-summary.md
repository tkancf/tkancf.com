---
title: "2023年の振り返り"
description: "2023年の振り返りブログです。"
pubDate: "2023/12/31"
heroImage: "/2023-summary/2023-summary.webp"
---

![Title Image](/2023-summary/2023-summary.webp)

年末なので、今年1年を振り返ってみます。٩( ᐛ )و

## 作ったもの・書いたもの等

### ブログ

今年は下記20件のブログを書きました。今年の4月にブログをはてなブログから、Astro + Cloudflare Pagesに移行してから、ブログを書く頻度が上がりました。去年は年間10件に満たなかったので、今年の20件は大幅な増加です。  
増えた理由としては、普段のメモの取り方を変えたこと、Twitterをほぼやめたことでブログについて考える頻度を増やせたのかなと思っています。

- [Self-hosted LiveSyncとFly.ioを使って、Obsidianのメモを無料で同期する](https://tkancf.com/blog/sync-obsidian-notes-free-self-hosted-livesync-flyio/)
- [CloudFlare PagesでホストしているAstro.jsブログでリダイレクトする方法](https://tkancf.com/blog/setting-up-redirects-astro-cloudflare-pages/)
- [VimのCTRL-K <Space>を理解する](https://tkancf.com/blog/understanding-vim-ctrl-k-space/)
- [ISUCON13に参加しました。最終スコアは8654でした](https://tkancf.com/blog/isucon13/)
- [tofu65キーボードを買いました](https://tkancf.com/blog/tofu65-keyboard-review/)
- [SvelteKitでカードゲームのプロキシメーカーを作りました](https://tkancf.com/blog/created-a-card-game-proxy-maker-with-sveltekit/)
- [GitHub Mobile + GitHub issueでメモが良い感じ](https://tkancf.com/blog/github-mobile-and-issue-as-memo/)
- [$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ) を理解する](https://tkancf.com/blog/understanding-bash-source/)
- [iTerm2でベルの音を止める](https://tkancf.com/blog/mute-iterm2-bell/)
- [Astroのバージョンをv2からv3に上げました](https://tkancf.com/blog/update-astro-v2-to-v3/)
- [GitHub ActionsでPulumiをCI/CDしてみた](https://tkancf.com/blog/trying-cicd-with-pulumi-using-github-actions/)
- [Pulumi+GoでCloudflareのDNS既存リソースをインポートして管理してみた](https://tkancf.com/blog/managing-and-importing-existing-cloudflare-dns-resources-pulumi-go/)
- [cdコマンドを拡張したzoxideコマンドが便利](https://tkancf.com/blog/zoxide-a-convenient-extension-of-the-cd-command/)
- [CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました](https://tkancf.com/blog/creating-line-bot-with-cloudflare-workers-d1-and-hono/)
- [『SOFT SKILLS ソフトウェア開発者の人生マニュアル』を読み返しました](https://tkancf.com/blog/reading-soft-skills-the-software-developers-life-manual/)
- [Raycast のクリップボードヒストリーは Command+.で結合できる](https://tkancf.com/blog/raycast-clipboard-history-merge-with-cmd-period/)
- [Commandキーをtmuxのプレフィックスキーとして使う方法 on Iterm2](https://tkancf.com/blog/command-as-tmux-prefix-key/)
- [AstroとCloudflare Pagesでブログを作成しました](https://tkancf.com/blog/astro-and-cloudflare-pages-blog-creation/)
- [ブログをAstroへ以降しました](https://tkancf.com/blog/first-post/)
- [過去に別のブログで書いた技術記事まとめ](https://tkancf.com/blog/past-technical-articles-collection/)

### GitHub

GitHubは例年特に何もしていないのでまっさらなんですが、今年は以前のブログで触れた通り、ブログの記事管理をAstroに変更したり、Cloudflare WorkersでLINE botの作成などを行いそれなりに草が生えました。

下記が2022年の草
![GitHub Contribution 2022](/2023-summary/2022-github-activity.webp)

そして、これが今年(2023年)の草です。
![GitHub Contribution 2023](/2023-summary/2023-github-activity.webp)

4月にブログを移行してからしばらくは、ブログの記事を書くためにコミットできていましたが、5〜10月にほぼ何もできませんでした。  
10月中頃に結婚式が終わって一段落して以降の10月末頃から、またコミットできるようになりました。来年は年間通してコミットし続けられると良いですね。

### 作ったもの

以下プライベートで作っていたものです。  

- カードゲームのプロキシメーカー
  - SvelteKit + Cloudflare Pages
  - 個人的に欲しい機能を満たすものが無かったので自作しました
  - ブログも書きました: [SvelteKitでカードゲームのプロキシメーカーを作りました](https://tkancf.com/blog/created-a-card-game-proxy-maker-with-sveltekit/)
- LINE bot
  - Cloudflare Workers + Cloudflare D1 + Hono
  - Cloudflare Workersのお試し兼、妻とのやり取りで普通に欲しかったので作りました。今も少しずつ改良しながら便利に使っています
  - ブログも書きました: [CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました](https://tkancf.com/blog/creating-line-bot-with-cloudflare-workers-d1-and-hono/)
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
