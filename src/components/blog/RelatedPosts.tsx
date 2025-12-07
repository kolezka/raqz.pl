'use client'
import { useLocale, useTranslations } from 'next-intl'

import type { BlogPost } from '../../types/blog'
import { getRelatedPosts } from '../../utils/related-posts'
import { useBlogPosts } from '../../hooks/useBlogPosts'
import BlogCard from './BlogCard'

interface RelatedPostsProps {
  currentPost: BlogPost
  count?: number
}

export default function RelatedPosts({ currentPost, count = 3 }: RelatedPostsProps) {
  const locale = useLocale()
  const t = useTranslations()
  const language = locale as 'en' | 'pl'
  const { posts: allPosts } = useBlogPosts(language)

  // Get related posts using the algorithm
  const relatedPosts = getRelatedPosts(currentPost, allPosts, count)

  // Don't render if no related posts found
  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('blog.relatedPosts')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
