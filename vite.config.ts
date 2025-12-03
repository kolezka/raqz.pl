// Vite core configuration utility for type-safe config definition
import { defineConfig } from 'vite'

// Official Vite plugin for React with Fast Refresh support
import react from '@vitejs/plugin-react'

// Tailwind CSS v4 plugin for Vite (integrated CSS processing)
import tailwindcss from '@tailwindcss/vite'

// MDX compiler for transforming MDX files into React components
import mdx from '@mdx-js/rollup'

// Remark plugin: adds support for GitHub Flavored Markdown (tables, task lists, strikethrough)
import remarkGfm from 'remark-gfm'

// Remark plugin: parses YAML frontmatter blocks in Markdown files
import remarkFrontmatter from 'remark-frontmatter'

// Remark plugin: exports frontmatter data to MDX component scope
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

// Rehype plugin: adds id attributes to headings for anchor links
import rehypeSlug from 'rehype-slug'

// Rehype plugin: automatically adds anchor links to headings
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// Rehype plugin: syntax highlighting for code blocks using Prism.js
import rehypePrism from 'rehype-prism-plus'

// Vite plugin: generates sitemap.xml for SEO optimization
import sitemap from 'vite-plugin-sitemap'

// Rollup plugin: visualizes bundle size and composition for performance analysis
import { visualizer } from 'rollup-plugin-visualizer'

// Node.js path utility for resolving absolute file paths
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrism, { ignoreMissing: true }]],
      }),
    },
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://raqz.pl',
      dynamicRoutes: [], // Will be populated by blog posts
    }),
    // Bundle analyzer - only run when ANALYZE env var is set
    ...(process.env.ANALYZE
      ? [
          visualizer({
            open: true,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
            template: 'treemap', // 'sunburst', 'treemap', 'network'
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@content': resolve(__dirname, './content'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react/jsx-runtime'],
          'react-router': ['react-router-dom'],
          i18n: ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          headlessui: ['@headlessui/react'],
          utils: ['clsx', 'date-fns', 'fuse.js'],
        },
      },
    },
    // Increase chunk size warning limit for vendor chunks
    chunkSizeWarningLimit: 600,
  },
})
