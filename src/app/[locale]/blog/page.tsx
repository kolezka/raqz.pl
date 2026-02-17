import BlogListClient from '@/components/blog/BlogListClient'
import Script from 'next/script'
import { getLocale, getTranslations } from 'next-intl/server'
import { generateBreadcrumbSchema, BASE_URL } from '@/lib/schema'
import { getBlogPosts } from '@/lib/blog'

// ISR: Revalidate every 15 minutes
export const revalidate = 900
export const dynamic = 'force-static'

export { generateBlogListMetadata as generateMetadata } from '@/lib/generateBlogMetadata'

export default async function BlogListPage() {
  const locale = await getLocale()
  const t = await getTranslations()
  const language = locale as 'en' | 'pl'

  // Fetch server-side for initial render to prevent FOUC
  const [posts, featuredPosts] = await Promise.all([
    getBlogPosts(language),
    (async () => {
      const allPosts = await getBlogPosts(language)
      return allPosts.filter(p => p.featured).slice(0, 3)
    })(),
  ])

  const localePath = locale === 'en' ? '' : `/${locale}`

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}${localePath}/blog/#collectionpage`,
    url: `${BASE_URL}${localePath}/blog`,
    name: t('blog.title'),
    description: t('blog.description'),
    isPartOf: {
      '@id': `${BASE_URL}${localePath}/#website`,
    },
    about: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: locale === 'en' ? 'en-US' : 'pl-PL',
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === 'en' ? 'Home' : 'Strona główna',
      url: `${BASE_URL}${localePath || '/'}`,
    },
    {
      name: t('blog.title'),
      url: `${BASE_URL}${localePath}/blog`,
    },
  ])

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(collectionPageSchema),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(breadcrumbSchema),
    ],
  }

  return (
    <>
      <Script
        id="blog-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <BlogListClient initialPosts={posts} initialFeaturedPosts={featuredPosts} />
    </>
  )
}
