import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import AutoImport from 'astro-auto-import';
import remarkCollapse from 'remark-collapse';
import remarkToc from 'remark-toc';
import config from './src/config/config.json';

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : 'http://examplesite.com',
  base: config.site.base_path ? config.site.base_path : '/',
  trailingSlash: config.site.trailing_slash ? 'always' : 'never',
  output: 'hybrid',
  image: {
    service: squooshImageService(), // Ensure this function is defined or imported
    api: {
      routes: [
        {
          path: '/src/pages/api/send-mail.js',
          method: 'POST',
          handler: '/src/pages/api/send-mail.js',
        },
      ],
    },
  },
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        safelist: [], // Update or remove the safelist
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
    vercel(), // Ensure this is included
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
