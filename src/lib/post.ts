import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { promises } from "fs";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkExpressiveCode from "remark-expressive-code";
import yaml from "yaml";

export type Post = {
  slug: string;
  title: string;
  pubDate: string;
  description: string;
  body: string;
  heroImage?: string;
  url?: string;
  platform?: string;
};

const postsDir = "content/blog";

const readPostFile = async (file: string): Promise<Post> => {
  const filePath = path.join(postsDir, file);
  const content = await promises.readFile(filePath, { encoding: "utf-8" });
  const result = await remark()
    .use(remarkParse)
    .use(remarkFrontmatter, [{ type: "yaml", marker: "-", anywhere: false }])
    .use(remarkExtractFrontmatter, { yaml: yaml.parse, name: "frontMatter" })
    .use(remarkExpressiveCode, { theme: "github-light" })
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const frontMatter = result.data.frontMatter as Partial<Post>;

  return {
    slug: path.parse(file).name,
    title: frontMatter.title || "",
    pubDate: frontMatter.pubDate || "",
    description: frontMatter.description || "",
    body: result.toString(),
    heroImage: frontMatter.heroImage,
  };
};

export const getPosts = async (): Promise<Post[]> => {
  const postFiles = await promises.readdir(postsDir);
  const posts: Post[] = await Promise.all(postFiles.map(readPostFile));

  // posts sort by pubDate
  posts.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return posts;
};

const externalContentPath = "content/external.json";

// Function to read the external.json and convert it into Post objects
export const getExternalPosts = async (): Promise<Post[]> => {
  const filePath = path.join(externalContentPath);
  const content = await promises.readFile(filePath, { encoding: "utf-8" });
  const posts: Post[] = JSON.parse(content);

  return posts;
};
