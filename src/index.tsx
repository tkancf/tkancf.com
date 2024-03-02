import { Hono } from "hono";
import { ssgParams } from "hono/ssg";
import { css } from "hono/css";
import { getPosts } from "./lib/post";
import { serveStatic } from "@hono/node-server/serve-static";
import { Layout } from "./components/Layout";
import { About } from "./components/About";
import { baseURL, siteName } from "./lib/constants";
import RSS from "rss";

const app = new Hono();

const posts = await getPosts();

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
  ogImage: "/icon.jpg",
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
`;

app.get("/", (c) => {
  metadata = {
    description: "tkancfのブログです。主にIT技術関連のメモなどを書いています。",
    ogImage: "/icon.jpg",
    title: siteName,
    url: baseURL,
  };
  return c.render(
    <Layout metadata={metadata}>
      <div class={postListCSS}>
        <h2>{siteName}へようこそ</h2>
        <p>
          tkancfのブログです。主にIT技術関連のメモなどを書いています。
          <br />
          全記事一覧は <a href="/blog">こちら</a> です。
        </p>
        <h2>最新の記事</h2>
        <ul>
          {posts
            .map((post) => (
              <li>
                <time>{post.pubDate}</time>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </li>
            ))
            .slice(0, 5)}
        </ul>
      </div>
    </Layout>
  );
});

app.get("/blog", async (c) => {
  metadata = {
    description: "tkancfのブログの記事一覧ページです。",
    ogImage: "/icon.jpg",
    title: siteName + " - ブログ記事一覧",
    url: baseURL + "/blog",
  };
  return c.render(
    <Layout metadata={metadata}>
      <div class={postListCSS}>
        <h2>記事一覧</h2>
        <ul>
          {posts.map((post) => (
            <li>
              <time>{post.pubDate}</time>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
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
      ogImage: post.heroImage,
      title: siteName + " - ブログ記事一覧",
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
    ogImage: "/icon.jpg",
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
  });
  posts.forEach(async (post: any) => {
    const url = baseURL + "/blog/" + post.slug;
    rss.item({
      title: post.title,
      url: url,
      date: new Date(post.pubDate),
      description: post.description,
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
