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
import { VFile } from "vfile";
import { Post } from "../types";

const FRONT_MATTER_REGEX =
  /^---(?:\r?\n)[\s\S]*?(?:\r?\n)---(?:\r?\n)?/;

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
  const rawMarkdown = content.replace(FRONT_MATTER_REGEX, "").trimStart();
  const result = await processMarkdown(content);
  const body = result.toString();
  type PostFrontMatter = Partial<Post> & {
    created?: string;
    updated?: string;
  };
  const frontMatter = result.data.frontMatter as PostFrontMatter;
  const pubDate =
    frontMatter.pubDate || frontMatter.created || frontMatter.updated || "";

  return {
    slug: path.parse(filePath).name,
    title: frontMatter.title || "",
    pubDate,
    description: frontMatter.description || "",
    body,
    heroImage: frontMatter.heroImage,
    rawMarkdown,
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
  try {
    const postFiles = await fs.readdir(postsDir);
    const posts = await Promise.all(
      postFiles.map((file) => readMarkdownFile(path.join(postsDir, file)))
    );
    posts.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
    return posts;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}
