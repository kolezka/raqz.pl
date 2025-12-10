import BlogTagClient from '@/components/blog/BlogTagClient'

export { generateBlogTagMetadata as generateMetadata } from '@/lib/generateBlogMetadata'

export default function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  return <BlogTagClient params={params} />
}
