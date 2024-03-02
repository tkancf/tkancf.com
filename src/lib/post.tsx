import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import fs from "fs";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkExpressiveCode from "remark-expressive-code";
import yaml from "yaml";

type Post = {
  slug: string;
  title: string;
  pubDate: string;
  description: string;
  body: string;
  heroImage?: string;
};

const postsDir = "content/blog";
const postFiles = fs.readdirSync(postsDir);

export const getPosts = async () => {
  const posts: Post[] = await Promise.all(
    postFiles.map(async (file) => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, { encoding: "utf-8" });
      const result = await remark()
        .use(remarkParse)
        .use(remarkFrontmatter, [
          { type: "yaml", marker: "-", anywhere: false },
        ])
        .use(remarkExtractFrontmatter, {
          yaml: yaml.parse,
          name: "frontMatter", // result.data 配下のキー名を決める
        })
        .use(remarkExpressiveCode, {
          theme: "github-light",
        })
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .use(remarkGfm)
        .process(content);

      const post: Post = {
        slug: path.parse(path.basename(filePath)).name,
        title: (result.data.frontMatter as Post).title,
        pubDate: (result.data.frontMatter as Post)?.pubDate,
        description: (result.data.frontMatter as Post)?.description,
        heroImage: (result.data.frontMatter as Post)?.heroImage,
        body: result.toString(),
      };
      return post;
    })
  );

  // posts sort by pubDate
  posts.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  return posts;
};
