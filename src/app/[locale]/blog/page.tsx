import BlogListClient from '@/components/blog/BlogListClient'

export { generateBlogListMetadata as generateMetadata } from '@/lib/generateBlogMetadata'

export default function BlogListPage() {
  return <BlogListClient />
}
