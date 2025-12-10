import BlogCategoryClient from '@/components/blog/BlogCategoryClient'

export { generateBlogCategoryMetadata as generateMetadata } from '@/lib/generateBlogMetadata'

export default function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return <BlogCategoryClient params={params} />
}
