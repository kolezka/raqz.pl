import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import sitemap from 'vite-plugin-sitemap'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrism, { ignoreMissing: true }]
      ]
    }) },
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://raqz.pl',
      dynamicRoutes: [] // Will be populated by blog posts
    })
  ],
  resolve: {
    alias: {
      '@content': resolve(__dirname, './content')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react/jsx-runtime'],
          'react-router': ['react-router-dom'],
          'i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          'headlessui': ['@headlessui/react'],
          'utils': ['clsx', 'date-fns', 'fuse.js']
        }
      }
    },
    // Increase chunk size warning limit for vendor chunks
    chunkSizeWarningLimit: 600
  }
})
