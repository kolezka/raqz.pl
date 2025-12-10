import BlogPostClient from '@/components/blog/BlogPostClient'

export {
  generateBlogPostParams as generateStaticParams,
  generateBlogPostMetadata as generateMetadata,
} from '@/lib/generateBlogMetadata'

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostClient params={params} />
}
