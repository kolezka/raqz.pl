import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  useBlogPosts,
  usePostsByCategory,
  usePostsByTag,
  useFeaturedPosts,
} from '../hooks/useBlogPosts'
import BlogCard from '../components/blog/BlogCard'
import SEOHead from '../components/SEOHead'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FEATURES } from '../config/features'

export default function BlogListPage() {
  const { category, tag } = useParams<{ category?: string; tag?: string }>()
  const { t, i18n } = useTranslation()
  const language = i18n.language as 'en' | 'pl'
  const { ref: titleRef } = useScrollAnimation<HTMLDivElement>('fade-up')

  // Load posts based on filters
  const { posts: allPosts, loading: allLoading } = useBlogPosts(language)
  const { posts: categoryPosts, loading: categoryLoading } = usePostsByCategory(
    category || '',
    language
  )
  const { posts: tagPosts, loading: tagLoading } = usePostsByTag(tag || '', language)
  const { posts: featuredPosts } = useFeaturedPosts(language, 3)

  // Determine which posts to display
  const posts = category ? categoryPosts : tag ? tagPosts : allPosts
  const loading = category ? categoryLoading : tag ? tagLoading : allLoading

  // Page title
  const pageTitle = category
    ? `${category} ${t('blog.articles', 'Articles')}`
    : tag
      ? `#${tag} ${t('blog.articles', 'Articles')}`
      : t('blog.title', 'Blog')

  // SEO description
  const description = category
    ? `${t('blog.browseCategory', 'Browse all articles in')} ${category}`
    : tag
      ? `${t('blog.browseTag', 'Browse all articles tagged with')} ${tag}`
      : t('blog.description', 'Insights, tutorials, and updates from RaqZpl Solutions')

  return (
    <>
      <SEOHead title={pageTitle} description={description} path="/blog" />

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
            {/* Filter Info */}
            {(category || tag) && (
              <div className="mb-8">
                <p className="text-gray-600">
                  {t('blog.showing', 'Showing')}{' '}
                  <span className="font-semibold">{posts.length}</span>{' '}
                  {t('blog.articles', 'articles')}
                </p>
              </div>
            )}

            {/* Featured Posts (only on main blog page) */}
            {!category && !tag && featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('blog.featured', 'Featured')}
                </h2>
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
                <p className="mt-4 text-gray-600">{t('blog.loading', 'Loading articles...')}</p>
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
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {t('blog.noPosts', 'No articles found')}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t(
                    'blog.noPostsDescription',
                    'Try browsing other categories or check back later.'
                  )}
                </p>
              </div>
            )}

            {/* All Posts Grid */}
            {FEATURES.SHOW_ALL_BLOG_POSTS && !loading && posts.length > 0 && (
              <div>
                {!category && !tag && featuredPosts.length > 0 && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('blog.allPosts', 'All Posts')}
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts
                    .filter(post => (!category && !tag ? !post.featured : true))
                    .map(post => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
