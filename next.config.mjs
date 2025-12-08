import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: 'output: export' is removed to support middleware for i18n
  // The app will be deployed as a standard Next.js app on Vercel
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  // Disable streaming metadata for all user agents to ensure meta tags render in <head>
  // This prevents metadata from being streamed to <body> during SSR
  htmlLimitedBots: /.*/,
  experimental: {
    mdxRs: false, // Use JS-based MDX for compatibility
    viewTransition: true,
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrism, { ignoreMissing: true }],
    ],
  },
})

export default withNextIntl(withMDX(nextConfig))
