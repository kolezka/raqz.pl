import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import type { BlogPost } from '../../types/blog'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const { t, i18n } = useTranslation()
  const language = i18n.language as 'en' | 'pl'
  const { ref: scrollRef, className: animationClass } = useScrollAnimation('fade-up')

  const blogUrl = language === 'pl' ? `/pl/blog/${post.slug}` : `/blog/${post.slug}`
  const publishedDate = post.date ? format(new Date(post.date), 'MMM d, yyyy') : ''

  return (
    <article
      ref={scrollRef}
      className={`group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary-500 transition-all duration-300 hover:shadow-xl ${animationClass} ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <Link to={blogUrl} className="block">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                {t('blog.featured', 'Featured')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt || post.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{publishedDate}</span>
            </div>

            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('blog.readingTime', '{{time}} min read', { time: post.readingTime })}</span>
            </div>
          </div>

          {/* Read More Link */}
          <div className="mt-4 flex items-center text-primary-600 font-medium group-hover:text-primary-700">
            <span>{t('blog.readMore', 'Read More')}</span>
            <svg
              className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}
