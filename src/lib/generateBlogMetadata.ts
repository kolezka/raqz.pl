import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getBlogPost, getBlogPosts } from './blog'

// Generate metadata for blog list page
export async function generateBlogListMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const baseUrl = 'https://raqz.pl'
  const localePath = locale === 'en' ? '' : `/${locale}`

  return {
    title: `${t('blog.title')} - ${t('meta.title')}`,
    description: t('blog.description'),
    alternates: {
      canonical: `${localePath}/blog`,
      languages: {
        en: '/blog',
        pl: '/pl/blog',
        'x-default': '/blog',
      },
    },
    openGraph: {
      title: `${t('blog.title')} - ${t('meta.title')}`,
      description: t('blog.description'),
      url: `${baseUrl}${localePath}/blog`,
      siteName: 'raqz.pl',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('blog.title')} - ${t('meta.title')}`,
      description: t('blog.description'),
    },
  }
}

// Generate metadata for blog post detail page
export async function generateBlogPostMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const post = await getBlogPost(slug, locale as 'en' | 'pl')

  if (!post) {
    return {}
  }

  const baseUrl = 'https://raqz.pl'
  const localePath = locale === 'en' ? '' : `/${locale}`
  const canonicalUrl = `${baseUrl}${localePath}/blog/${post.slug}`

  return {
    title: `${post.title} | ${t('meta.title')}`,
    description: post.description,
    keywords: post.seo?.keywords || post.tags.join(', '),
    alternates: {
      canonical: `${localePath}/blog/${post.slug}`,
      languages: {
        en: `/blog/${post.slug}`,
        pl: `/pl/blog/${post.slug}`,
        'x-default': `/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: 'raqz.pl',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: post.lastModified
        ? new Date(post.lastModified).toISOString()
        : new Date(post.date).toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${baseUrl}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${baseUrl}${post.coverImage}`],
    },
  }
}

// Generate metadata for blog category page
export async function generateBlogCategoryMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}): Promise<Metadata> {
  const { locale, category } = await params
  const t = await getTranslations({ locale })

  const baseUrl = 'https://raqz.pl'
  const localePath = locale === 'en' ? '' : `/${locale}`
  const pageTitle = `${category} ${t('blog.articles')}`
  const description = `${t('blog.browseCategory')} ${category}`

  return {
    title: `${pageTitle} - ${t('meta.title')}`,
    description,
    alternates: {
      canonical: `${localePath}/blog/category/${category}`,
      languages: {
        en: `/blog/category/${category}`,
        pl: `/pl/blog/category/${category}`,
        'x-default': `/blog/category/${category}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: `${baseUrl}${localePath}/blog/category/${category}`,
      siteName: 'raqz.pl',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
    },
  }
}

// Generate metadata for blog tag page
export async function generateBlogTagMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}): Promise<Metadata> {
  const { locale, tag } = await params
  const t = await getTranslations({ locale })

  const baseUrl = 'https://raqz.pl'
  const localePath = locale === 'en' ? '' : `/${locale}`
  const pageTitle = `#${tag} ${t('blog.articles')}`
  const description = `${t('blog.browseTag')} ${tag}`

  return {
    title: `${pageTitle} - ${t('meta.title')}`,
    description,
    alternates: {
      canonical: `${localePath}/blog/tag/${tag}`,
      languages: {
        en: `/blog/tag/${tag}`,
        pl: `/pl/blog/tag/${tag}`,
        'x-default': `/blog/tag/${tag}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: `${baseUrl}${localePath}/blog/tag/${tag}`,
      siteName: 'raqz.pl',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
    },
  }
}

// Generate static params for all blog posts
export async function generateBlogPostParams() {
  const enPosts = await getBlogPosts('en')
  const plPosts = await getBlogPosts('pl')

  console.log('enPosts', enPosts)
  console.log('plPosts', plPosts)

  return [
    ...enPosts.map(post => ({ locale: 'en', slug: post.slug })),
    ...plPosts.map(post => ({ locale: 'pl', slug: post.slug })),
  ]
}
