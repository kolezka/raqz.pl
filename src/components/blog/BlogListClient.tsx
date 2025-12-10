'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useBlogPosts, useFeaturedPosts } from '@/hooks/useBlogPosts'
import BlogCard from '@/components/blog/BlogCard'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { FEATURES } from '@/config/features'

export default function BlogListClient() {
  const t = useTranslations()
  const locale = useLocale()
  const language = locale as 'en' | 'pl'
  const { ref: titleRef } = useScrollAnimation<HTMLDivElement>('fade-up')

  // Load posts
  const { posts: allPosts, loading: allLoading } = useBlogPosts(language)
  const { posts: featuredPosts } = useFeaturedPosts(language, 3)

  const posts = allPosts
  const loading = allLoading

  // Page title
  const pageTitle = t('blog.title')

  // SEO description
  const description = t('blog.description')

  return (
    <section className="bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className=" px-6 py-24 sm:py-32 lg:px-8">
        <div ref={titleRef} className="mx-auto max-w-2xl text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {pageTitle}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Posts (only on main blog page) */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.featured')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map(post => (
                  <BlogCard key={post.slug} post={post} featured />
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12" role="status" aria-live="polite">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
                aria-hidden="true"
              />
              <p className="mt-4 text-gray-600">{t('blog.loading')}</p>
            </div>
          )}

          {/* No Posts */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t('blog.noPosts')}</h3>
              <p className="mt-1 text-sm text-gray-500">{t('blog.noPostsDescription')}</p>
            </div>
          )}

          {/* All Posts Grid */}
          {FEATURES.SHOW_ALL_BLOG_POSTS && !loading && posts.length > 0 && (
            <div>
              {featuredPosts.length > 0 && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.allPosts')}</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts
                  .filter(post => !post.featured)
                  .map(post => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
