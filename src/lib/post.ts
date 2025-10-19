import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { promises as fs } from "fs";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkExpressiveCode from "remark-expressive-code";
import yaml from "yaml";
import { Post } from "../types";
import { VFile } from "vfile";

const externalContentPath = "content/external.json";

async function processMarkdown(content: string): Promise<VFile> {
  const processor = remark()
    .use(remarkParse)
    .use(remarkFrontmatter, [{ type: "yaml", marker: "-", anywhere: false }])
    .use(remarkExtractFrontmatter, { yaml: yaml.parse, name: "frontMatter" })
    .use(remarkExpressiveCode, { theme: "github-light" })
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });

  return processor.process(content);
}

async function readMarkdownFile(filePath: string): Promise<Post> {
  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  const result = await processMarkdown(content);
  const body = result.toString();
  const frontMatter = result.data.frontMatter as Partial<Post>;

  return {
    slug: path.parse(filePath).name,
    title: frontMatter.title || "",
    pubDate: frontMatter.pubDate || "",
    description: frontMatter.description || "",
    body,
    heroImage: frontMatter.heroImage,
  };
}

export const getPost = async (
  slug: string,
  dir: string
): Promise<Post | undefined> => {
  try {
    const file = path.join(dir, `${slug}.md`);
    return await readMarkdownFile(file);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
};

export async function getPosts(postsDir: string): Promise<Post[]> {
  const postFiles = await fs.readdir(postsDir);
  const posts = await Promise.all(
    postFiles.map((file) => readMarkdownFile(path.join(postsDir, file)))
  );
  posts.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
  return posts;
}

export async function getExternalPosts(): Promise<Post[]> {
  const filePath = path.join(externalContentPath);
  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(content);
}
