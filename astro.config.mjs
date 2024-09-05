import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // Make sure this package is correctly installed
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import AutoImport from 'astro-auto-import';
import remarkCollapse from 'remark-collapse';
import remarkToc from 'remark-toc';
import config from './src/config/config.json';

export default defineConfig({
  site: config.site.base_url || 'http://examplesite.com',
  base: config.site.base_path || '/',
  trailingSlash: config.site.trailing_slash ? 'always' : 'never',
  output: 'hybrid',
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        safelist: [],
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Blockquote",
        "@/shortcodes/Badge",
        "@/shortcodes/ContentBlock",
        "@/shortcodes/Changelog",
        "@/shortcodes/Tab",
        "@/shortcodes/Tabs",
      ],
    }),
    mdx(),
    vercel(), // Ensure this is correctly integrated
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
