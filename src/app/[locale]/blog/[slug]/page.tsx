import BlogPostClient from '@/components/blog/BlogPostClient'
import { getBlogPost } from '@/lib/blog'
import Script from 'next/script'

// ISR: Revalidate every 15 minutes
export const revalidate = 900
export const dynamic = 'force-static'

export {
  generateBlogPostParams as generateStaticParams,
  generateBlogPostMetadata as generateMetadata,
} from '@/lib/generateBlogMetadata'

async function BlogPostJsonLd({ slug, locale }: { slug: string; locale: string }) {
  const post = await getBlogPost(slug, locale as 'en' | 'pl')

  if (!post) return null

  const baseUrl = 'https://raqz.pl'
  const localePath = locale === 'en' ? '' : `/${locale}`
  const blogLabel = locale === 'en' ? 'Blog' : 'Blog'
  const homeLabel = locale === 'en' ? 'Home' : 'Strona główna'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${baseUrl}${post.coverImage}`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.lastModified
      ? new Date(post.lastModified).toISOString()
      : new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'raqz.pl',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/ico.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${localePath}/blog/${post.slug}`,
    },
    keywords: post.seo?.keywords || post.tags.join(', '),
    articleSection: post.categories.join(', '),
    inLanguage: locale === 'en' ? 'en-US' : 'pl-PL',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${baseUrl}${localePath || '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: blogLabel,
        item: `${baseUrl}${localePath}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}${localePath}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <Script
        id="blog-post-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="blog-post-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  return (
    <>
      <BlogPostJsonLd slug={slug} locale={locale} />
      <BlogPostClient params={params} />
    </>
  )
}
