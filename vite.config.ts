import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";
import devServer from "@hono/vite-dev-server";
import Sitemap from "vite-plugin-sitemap";
import FullReload from "vite-plugin-full-reload";
import { baseURL } from "./src/lib/constants";

const entry = "src/index.tsx";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  console.log("isDevelopment", isDevelopment);
  if (isDevelopment) {
    return {
      plugins: [devServer({ entry }), FullReload("./content/(*|*/*.md)")],
    };
  }
  return {
    plugins: [
      ssg({ entry }),
      Sitemap({ hostname: baseURL, generateRobotsTxt: true }),
    ],
  };
});
