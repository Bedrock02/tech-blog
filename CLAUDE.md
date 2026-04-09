# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

This is a **static markdown blog** built with Next.js 13 (Pages Router). There are only two routes:

- `pages/index.tsx` — Home page; reads all posts from `posts/` at build time and renders them as `<Card>` components
- `pages/blog/[slug].tsx` — Individual post page; reads the matching `.md` file and renders it via the `<Post>` component

### Content pipeline

Blog posts live in `posts/` as `.md` files with YAML frontmatter:

```yaml
---
title: 'Post Title'
metaDesc: 'Description shown in cards'
date: 'Jan 13, 2023'
tags:
  - tag1
  - tag2
---
```

`gray-matter` parses frontmatter, `react-markdown` + `rehype-raw` render body content, and `react-syntax-highlighter` (vscDarkPlus theme) handles code blocks via the custom `<CodeBlock>` component.

### Types (`types/index.ts`)

- `PostMeta` — title, metaDesc, date, tags
- `Post` — slug + PostMeta (used in lists)
- `PostInfo` — PostMeta + raw content string (used on post page)
- `PageData` — slug + frontmatter (used in `getStaticPaths`)

### Styling

Tailwind CSS with the `@tailwindcss/typography` plugin. The `prose` class on `<Post>` applies typography styles to rendered markdown. Component-scoped styles use CSS Modules (`.module.css` files alongside components).

### Utils (`lib/utils.ts`)

- `generateTailWindStrings()` — merges Tailwind class collections
- `readTime()` — estimates read time (275 WPS, accounts for images)

### Analytics

Vercel Analytics is included in `components/Layout` and Google Analytics ID is set via `NEXT_PUBLIC_GA_ID` in `env.local`.
