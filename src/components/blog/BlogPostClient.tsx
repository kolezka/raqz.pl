'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { MDXProvider } from '@mdx-js/react'
import { format } from 'date-fns'
import { use } from 'react'
import { useBlogPost } from '@/hooks/useBlogPost'
import { useBlogPostMeta } from '@/hooks/useBlogPosts'
import { mdxComponents } from '@/components/blog/MDXComponents'
import RelatedPosts from '@/components/blog/RelatedPosts'

export default function BlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const t = useTranslations()
  const locale = useLocale()
  const language = locale as 'en' | 'pl'

  const { post, loading: mdxLoading, error } = useBlogPost(slug || '', language)
  const { post: metadata, loading: metaLoading } = useBlogPostMeta(slug || '', language)

  // Development-only logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📄 BlogPostPage state:', {
      slug,
      language,
      mdxLoading,
      metaLoading,
      hasPost: !!post,
      hasMetadata: !!metadata,
      error,
    })
  }

  // Loading state
  if (mdxLoading || metaLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('blog.loading')}</p>
        </div>
      </div>
    )
  }

  // Error or not found
  if (error || !post || !metadata) {
    notFound()
  }

  const { Component } = post

  // Format date
  const publishedDate = metadata.date ? format(new Date(metadata.date), 'MMMM d, yyyy') : ''
  const updatedDate = metadata.lastModified
    ? format(new Date(metadata.lastModified), 'MMMM d, yyyy')
    : null

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      {/* Hero Section with Cover Image */}
      <div className="relative bg-gray-900 h-[500px]">
        <img
          src={metadata.coverImage}
          alt={metadata.coverImageAlt}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          loading="eager"
          width={1920}
          height={384}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          {/* Breadcrumbs */}
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-300 hover:text-white">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/blog" className="text-gray-300 hover:text-white">
                    {t('navigation.blog')}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {metadata.categories.map(category => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{metadata.title}</h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
            <div className="flex items-center">
              <span>
                {t('blog.by')} {metadata.author}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <span>
                {t('blog.publishedOn')} {publishedDate}
              </span>
            </div>
            {updatedDate && (
              <>
                <span>•</span>
                <div className="flex items-center">
                  <span>
                    {t('blog.updatedOn')} {updatedDate}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Excerpt */}
        {metadata.excerpt && (
          <div className="text-xl text-gray-600 dark:text-gray-300 italic mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            {metadata.excerpt}
          </div>
        )}

        {/* MDX Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXProvider components={mdxComponents}>{Component && <Component />}</MDXProvider>
        </div>

        {/* Tags */}
        {metadata.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {t('blog.tags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        <RelatedPosts currentPost={metadata} />
      </article>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t('blog.backToBlog')}
        </Link>
      </div>
    </div>
  )
}
