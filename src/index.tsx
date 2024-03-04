import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { ssgParams } from "hono/ssg";
import { css } from "hono/css";
import { getPosts, getExternalPosts } from "./lib/post";
import { serveStatic } from "@hono/node-server/serve-static";
import { Layout } from "./components/Layout";
import { About } from "./components/About";
import { baseURL, siteName, iconURL } from "./lib/constants";
import RSS from "rss";

const app = new Hono();

const posts = await getPosts();
const externalPosts = await getExternalPosts();

type Metadata = {
  title: string;
  url: string;
  description: string;
  ogImage?: string;
};

let metadata: Metadata = {
  title: siteName,
  url: baseURL,
  description: "",
  ogImage: "/placeholder-social.jpeg",
};

app.use("*", serveStatic({ root: "public" }));

const postListCSS = css`
  ul {
    list-style-type: none;
    padding: unset;
  }
  ul li {
    display: flex;
    margin-bottom: 8px;
  }
  time {
    flex: 0 0 130px;
    font-style: italic;
    color: #595959;
  }
  ul li a:visited {
    color: #8e32dc;
  }
  span {
    margin-right: 5px;
  }
`;

app.all(
  "*",
  jsxRenderer(
    ({ children }) => {
      return <>{children}</>;
    },
    { docType: "<!DOCTYPE html>" }
  )
);

app.get("/", (c) => {
  metadata = {
    description: "tkancfのブログです。主にIT技術関連のメモなどを書いています。",
    ogImage: "/placeholder-social.jpeg",
    title: siteName,
    url: baseURL,
  };
  return c.render(
    <Layout metadata={metadata}>
      <div class={postListCSS}>
        <h2>{siteName}へようこそ ٩( ᐛ )و </h2>
        <p>tkancfのブログです。主にIT技術関連のメモなどを書いています。</p>
        <h2>最新の記事</h2>
        全記事一覧は <a href="/blog">こちら</a>
        <ul>
          {posts
            .map((post) => (
              <li>
                <time>{post.pubDate}</time>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
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
    </Layout>
  );
});

app.get("/blog", async (c) => {
  const allPosts = [...posts, ...externalPosts].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
  metadata = {
    description: "tkancfのブログの記事一覧ページです。",
    ogImage: "/placeholder-social.jpeg",
    title: siteName + " - ブログ記事一覧",
    url: baseURL + "/blog",
  };
  return c.render(
    <Layout metadata={metadata}>
      <div class={postListCSS}>
        <h2>記事一覧</h2>
        <p>🔗 がついているリンクは外部サイトの記事です。</p>
        <ul>
          {allPosts.map((post) => (
            <li>
              <time>{post.pubDate}</time>
              <a href={post.platform ? post.url : `/blog/${post.slug}`}>
                {post.platform && <>🔗[{post.platform}]: </>}
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
});

app.get(
  "/blog/:slug",
  ssgParams(async () => {
    return posts.map((post) => {
      return {
        slug: post.slug,
      };
    });
  }),
  async (c) => {
    const slug = c.req.param("slug");
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      return c.redirect("/404");
    }
    metadata = {
      description: post.description,
      ogImage: post.heroImage ? post.heroImage : "/placeholder-social.jpeg",
      title: post.title,
      url: baseURL + "/blog/" + post.slug,
    };
    return c.render(
      <Layout metadata={metadata}>
        <h1>{post.title}</h1>
        <div>投稿日: {post.pubDate}</div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
      </Layout>
    );
  }
);

app.get("/about", (c) => {
  metadata = {
    description: "tkancfのブログのAboutページです。About meを含みます。",
    ogImage: "/placeholder-social.jpeg",
    title: siteName + " - About",
    url: baseURL + "/about",
  };
  return c.render(
    <Layout metadata={metadata}>
      <About />
    </Layout>
  );
});

const generateFeed = async () => {
  const rss = new RSS({
    title: siteName,
    site_url: baseURL,
    description: siteName,
    feed_url: baseURL + "/feed",
    generator: siteName,
    image_url: iconURL,
  });
  posts.forEach(async (post: any) => {
    const url = baseURL + "/blog/" + post.slug;
    rss.item({
      title: post.title,
      url: url,
      date: new Date(post.pubDate),
      description: post.description,
      enclosure: { url: iconURL },
      custom_elements: [{ "content:encoded": post.body }],
    });
  });

  return rss.xml();
};

app.get("/feed", async (c) => {
  const feeds = await generateFeed();
  return c.text(feeds, 200, {
    "Content-Type": "text/xml",
  });
});

app.get("/404", (c) => c.notFound());

export default app;
