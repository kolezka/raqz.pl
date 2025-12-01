import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBlogPosts } from '../../hooks/useBlogPosts'
import BlogCard from './BlogCard'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function LatestBlogPosts() {
  const { t, i18n } = useTranslation()
  const language = i18n.language as 'en' | 'pl'
  const { posts, loading } = useBlogPosts(language)
  const { ref: titleRef, className: animationClass } = useScrollAnimation<HTMLDivElement>('fade-up')

  // Get latest 3 posts
  const latestPosts = posts.slice(0, 3)

  // Don't render if no posts
  if (loading || latestPosts.length === 0) {
    return null
  }

  const blogUrl = language === 'pl' ? '/pl/blog' : '/blog'

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className={`text-center mb-12 ${animationClass}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('blog.latestPosts', 'Latest from the Blog')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('blog.latestDescription', 'Insights, tutorials, and updates from our team')}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to={blogUrl}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            {t('blog.viewAllPosts', 'View All Posts')}
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
