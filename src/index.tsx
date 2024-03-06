import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { ssgParams } from "hono/ssg";
import { getPost, getPosts, getExternalPosts } from "./lib/post";
import { serveStatic } from "@hono/node-server/serve-static";
import { Layout } from "./components/Layout";
import { About } from "./components/About";
import { baseURL, siteName, iconURL } from "./lib/constants";
import RSS from "rss";
import { postListCSS } from "./lib/style";
import { Home } from "./components/Home";

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
      <Home posts={posts} />
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
    const post = await getPost(slug);
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
  await Promise.all(
    posts.map((post: any) => {
      const url = baseURL + "/blog/" + post.slug;
      rss.item({
        title: post.title,
        url: url,
        date: new Date(post.pubDate),
        description: post.description,
        enclosure: { url: iconURL },
        custom_elements: [{ "content:encoded": post.body }],
      });
    })
  );

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
