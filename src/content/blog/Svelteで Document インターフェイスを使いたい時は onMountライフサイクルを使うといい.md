---
title: "Svelteで Document インターフェイスを使いたい時は onMountライフサイクルを使うといい"
description: "Svelteで Document インターフェイスを使いたい時は onMountライフサイクルを使うといい"
pubDate: "2022/08/21"
heroImage: "/placeholder-hero.webp"
---

**※注意!! 動作検証はしてますが、勉強不足により、この方法がベストなのか分かってないです。参考程度にお願いいたします。**

## 何がしたいか

こういうHTMLから

```html
<div id="text">Text</div>
```

文字列 "Text" を取得したい。

JavaScriptで普通にやるなら以下のように書けば良いが、Svelteではそうはいかなかった

```js
let t = document.getElementById('text');
console.log(t.textContent);
```

## どうすればいいか

onMountライフサイクルを使って、以下のように書けばOK ([REPLでの動作確認](https://svelte.dev/repl/6ae127160841452285c1e9386ff649cf?version=3.31.2))

```html
<script>
    import { onMount } from 'svelte';
    onMount(() => {
        let t = document.getElementById('text');
        console.log(t.textContent);
    });
</script>

<div id="text">Text</div>
```

## あとがき

Web Frontend 周辺何も分からないので、最近Svelteに手を出してみています。  
世界ではReactが流行っているようですが、なにかのタイミングでSvelteを見たときにEasyな気配がして選びました。

まだTutorialを読んでいる途中ぐらいの段階ですが、公式ドキュメントも充実しているので印象は良いです。  
以前はサポートしていなかったようですが、現在はTypeScriptもサポートされています。  
今年中にSvelte + Sapperでアプリを作れたら嬉しいなーというお気持ちです。
