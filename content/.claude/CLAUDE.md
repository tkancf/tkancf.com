# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a personal knowledge management repository (Obsidian vault) containing:

- `index.md` - Main homepage linking to all content categories
- `blog/` - Technical blog posts and personal articles 
- `about.md` - Personal information
- `blogs.md` - Blog index page

## Content Format

All content uses Markdown with YAML frontmatter:

```yaml
---
id: unique-identifier
aliases:
  - Alternative Title
tags: []
created: YYYY-MM-DD HH:MM
description: Brief description
title: Display Title
updated: YYYY-MM-DD HH:MM
---

# Content Here
```

## Content Categories

The repository covers these main topics:
- Vim/Neovim configuration and tips
- CLI tools and shell scripting
- Web development (Svelte, Astro, Hono)
- Cloud infrastructure (CloudFlare, Pulumi)
- Text editors and development tools
- Personal projects and technical experiments
- Reading notes and technical documentation
- Magic: The Gathering tournament reports
- Daily journals and reflection posts

## File Naming

- Blog posts use timestamp format: `YYYYMMDDHHMMSS.md`
- Some files use descriptive names: `command-as-tmux-prefix-key.md`
- Monthly journals: `YYYY-MM.md`
- Summary posts: `YYYY-summary.md`

## Working with Content

When editing files:
- Preserve existing YAML frontmatter structure
- Update the `updated` field when making changes
- Maintain consistent markdown formatting
- Keep internal links using relative paths: `[text](blog/filename.md)`
- Use Japanese for personal content, English for technical content as appropriate

This repository serves as both a personal knowledge base and source for a technical blog, with content ranging from detailed technical tutorials to personal reflections and project logs.