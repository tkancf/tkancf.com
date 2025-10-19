import { siteName } from "../lib/constants";
import { formatDate } from "../lib/date";
import { postListCSS } from "../lib/style";
import { Post } from "../types";

export const Home = (props: any) => {
  return (
    <>
      <div class={postListCSS}>
        <h2>{siteName}へようこそ ٩( ᐛ )و </h2>
        <p>tkancfのブログです。主にIT技術関連のメモなどを書いています。</p>
        <h2>最新の記事</h2>
        全記事一覧は <a href="/blog">こちら</a>
        <ul>
          {props.posts
            .map((post: Post) => (
              <li>
                <time>{formatDate(post.pubDate)}</time>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </li>
            ))
            .slice(0, 7)}
        </ul>
        <h2>最新のスクラップ</h2>
        全スクラップ一覧は <a href="/scrap">こちら</a>
        <ul>
          {props.scraps
            .map((scrap: Post) => (
              <li>
                <time>{formatDate(scrap.pubDate)}</time>
                <a href={`/scrap/${scrap.slug}`}>{scrap.title}</a>
              </li>
            ))
            .slice(0, 7)}
        </ul>
      </div>
      <h2>最近作ったもの</h2>
      <ul>
        <li>
          <a href="https://github.com/tkancf/tkancf.com">tkancf/tkancf.com</a>
          <div>このブログ (HonoのSSG機能で作成)</div>
        </li>
        <li>
          <a href="https://github.com/tkancf/hatebu-to-omnivore">
            tkancf/hatebu-to-omnivore
          </a>
          <div>はてブのデータをOmnivoreにインポートするツール</div>
        </li>
        <li>
          <a href="https://github.com/tkancf/cf-d1-line-sample">
            tkancf/cf-d1-line-sample{" "}
          </a>
          <div>Cloudflare D1とCloudflare Workersを使ったLINEボット</div>
        </li>
        <li>
          <a href="https://github.com/tkancf/proxy-maker">tkancf/proxy-maker</a>
          <div>プロキシカード作成ツール</div>
        </li>
        <li>
          <a href="https://github.com/tkancf/rofi-snippet">
            tkancf/rofi-snippet
          </a>
          <div>rofi用のスニペット展開ツール</div>
        </li>
      </ul>
    </>
  );
};
