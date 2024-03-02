export const About = () => {
  return (
    <>
      <p>
        tkancfというユーザ名で登録していることが多いです。
        <br />
        よく使ってるアイコン↓
      </p>
      <img
        src="/icon.jpg"
        alt="tkancf"
        width="150"
        height="150"
        loading="lazy"
      />
      <h2>アカウント・リンク集</h2>
      ブログ等の記事は外部サイト含めて、<a href="/blog">記事一覧ページ</a>
      にあるので、まとめて見たい場合はそちらを参照してください。
      <ul>
        <li>
          GitHub: <a href="https://github.com/tkancf">@tkancf</a>
        </li>
        <li>
          Twitter: <a href="https://twitter.com/tkancf">@tkancf</a>
        </li>
        <li>
          Bluesky:{" "}
          <a href="https://bsky.app/profile/tkancf.bsky.social">
            @tkancf.bsky.social
          </a>
        </li>
        <li>
          Zenn: <a href="https://zenn.dev/tkancf">@tkancf</a>
        </li>
        <li>
          はてなブログ: <a href="https://tkancf.hateblo.jp/">@tkancf</a>
        </li>
        <li>
          Qiita: <a href="https://qiita.com/tkancf">@tkancf</a>
        </li>
      </ul>
      <h2>趣味</h2>
      <ul>
        <li>プログラミング</li>
        <li>コーヒー</li>
        <li>美味しいものを食べに行く</li>
        <li>漫画</li>
      </ul>
      <h2>仕事</h2>
      <ul>
        <li>2018/07 - 2022/07</li>
        <ul>
          <li>MSPの会社でクラウドインフラのエンジニア(運用・保守)</li>
        </ul>
        <li>2022/08 - 現在</li>
        <ul>
          <li>上記エンジニアチームのプレイングマネージャー</li>
        </ul>
      </ul>
    </>
  );
};
