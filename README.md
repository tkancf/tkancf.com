# tkan☕️ - A Digital Garden

This is a digital garden and blog powered by [Quartz](https://quartz.jzhao.xyz/). It serves as a personal space for notes, thoughts, and articles.

## What is Quartz?

Quartz is a fast, server-side rendering static site generator that transforms Markdown content into a full-text searchable website. It's designed for creating digital gardens, wikis, and personal knowledge bases.

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone YOUR_REPOSITORY_URL # Replace YOUR_REPOSITORY_URL with the actual URL of this repository
    cd YOUR_REPOSITORY_DIRECTORY_NAME # Replace YOUR_REPOSITORY_DIRECTORY_NAME with the name of the cloned directory
    ```

2.  **Install dependencies:**
    This project uses npm as its package manager.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command builds the site and starts a local server with live reloading.
    ```bash
    npx quartz build --serve
    ```
    You should then be able to view the site at `http://localhost:8080`.

## 📖 Content Overview

All content for this site is written in Markdown and primarily located in the `content/` directory. You can create new notes or edit existing ones there.

The site configuration, including plugins and theme settings, can be found in `quartz.config.ts`.

## 🌐 Deployment

This site is deployed and accessible at [tkancf.com](https://tkancf.com).

While the specific deployment method isn't detailed in the repository, Quartz sites are commonly deployed using static hosting providers like Cloudflare Pages, Vercel, GitHub Pages, or Netlify.

## 🤝 Contributing (Optional)

If you plan to allow contributions, you can add guidelines here. For example:
- Reporting bugs
- Suggesting enhancements
- Submitting pull requests

## 📝 License (Optional)

Consider adding a license if you haven't already. Common choices for open-source projects include MIT, Apache 2.0, or GPL.
