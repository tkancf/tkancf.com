# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Quartz-based static site generator** that creates a Japanese digital garden/blog website (tkancf.com). Built on Quartz v4.4.0 with TypeScript, Preact, and SCSS.

## Development Commands

```bash
# Main CLI interface (build, serve, sync, etc.)
npm run quartz

# Build and serve documentation
npm run docs

# TypeScript validation and code formatting check
npm run check

# Auto-format all code
npm run format

# Run unit tests
npm run test
```

## Architecture

### Core Directories
- **`/content/`** - Markdown content (blog posts, pages) with YAML frontmatter
- **`/quartz/`** - Core framework code
  - `components/` - Preact UI components
  - `plugins/` - Content transformation pipeline (transformers, filters, emitters)
  - `styles/` - SCSS stylesheets with theme support
  - `util/` - Utility functions
- **`/public/`** - Generated static output

### Configuration
- **`quartz.config.ts`** - Main site configuration (theme, plugins, locale: ja-JP)
- **`quartz.layout.ts`** - Page layout definitions
- **`package.json`** - Node.js dependencies and scripts

### Content Pipeline
1. **Transformers** - Parse markdown, handle frontmatter, syntax highlighting
2. **Filters** - Remove drafts, validate content
3. **Emitters** - Generate HTML pages, RSS feeds, sitemaps

### Key Features
- **Obsidian-style** backlinks
- **Japanese primary content** with technical English terms
- **Graph visualization** of content relationships
- **Hot reload** development server
- **Math rendering** with KaTeX
- **Code highlighting** with Shiki

## Content Format

All markdown files use:
- **Frontmatter**: id, title, tags, created/updated dates, description
- **Markdown-style links**: `[page-name](filename)` for internal references
- **Tags**: Categorical organization
- **Aliases**: Alternative titles for linking

## Testing

Unit tests focus on core utilities (path handling, dependency graphs) using Node.js built-in test runner.

## Build Process

Uses custom TypeScript build system with esbuild. The main entry point is `quartz/build.ts` which orchestrates the entire build pipeline.
