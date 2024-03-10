import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";
import devServer from "@hono/vite-dev-server";
import Sitemap from "vite-plugin-sitemap";
import { baseURL } from "./src/lib/constants";
import liveReload from "vite-plugin-live-reload";

const entry = "src/index.tsx";

export default defineConfig(() => {
  return {
    plugins: [
      devServer({ entry }),
      ssg({ entry }),
      Sitemap({ hostname: baseURL, generateRobotsTxt: true }),
      liveReload("./content/(*|*/*.md)"),
    ],
  };
});
