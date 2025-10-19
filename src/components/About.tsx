export const About = () => {
  return (
    <>
      <p>
        tkancfというユーザ名で登録していることが多いです。
        <br />
        よく使ってるアイコン↓
      </p>
      <img
        lazy="true"
        src="/icon.webp"
        alt="tkancf"
        width="180"
        height="180"
        loading="lazy"
      />
      <h2>アカウント・リンク集</h2>
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
        <li>
          <div>2018/07 - 2022/07</div>
          MSPの会社でクラウドインフラのエンジニア(運用・保守)
        </li>
        <li>
          <div>2022/08 - 2024/11</div>
          上記エンジニアチームのプレイングマネージャー
        </li>
        <li>
          <div>2024/12 - 現在</div>
          同社エンジニアチームのインフラエンジニア(設計・構築)
        </li>
      </ul>
    </>
  );
};
