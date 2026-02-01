import { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import servicesData from '@/data/services.json'
import blogIndex from '@/data/blog-index.json'
import { FEATURES } from '@/config/features'
import { slugify } from '@/utils/slugify'

const baseUrl = 'https://raqz.pl'

// Static dates for sitemap - update these when content changes significantly
const LAST_MODIFIED = {
  homepage: new Date('2026-01-25'), // Last major homepage update
  services: new Date('2026-01-20'), // Last services content update
  privacy: new Date('2025-12-01'), // Privacy policy rarely changes
  portfolio: new Date('2026-01-15'), // Last portfolio update
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  // Get all services with their localized slugs
  const services = servicesData.serviceCategories.flatMap(category =>
    category.services.map(service => ({ id: service.id, slug: service.slug }))
  )

  // Get blog posts for each locale if blog is enabled
  const blogPosts = FEATURES.BLOG_ENABLED
    ? {
        en: blogIndex.en.filter(post => post.published),
        pl: blogIndex.pl.filter(post => post.published),
      }
    : { en: [], pl: [] }

  // Get unique categories and tags from blog posts if blog is enabled
  const categories = FEATURES.BLOG_ENABLED
    ? Array.from(
        new Set(
          [...blogIndex.en, ...blogIndex.pl]
            .filter(post => post.published)
            .flatMap(post => post.categories)
        )
      )
    : []

  const tags = FEATURES.BLOG_ENABLED
    ? Array.from(
        new Set(
          [...blogIndex.en, ...blogIndex.pl]
            .filter(post => post.published)
            .flatMap(post => post.tags)
        )
      )
    : []

  // Add homepage for each locale
  // Note: 'as-needed' locale prefix means English (default) has no prefix
  locales.forEach(locale => {
    const localePath = locale === 'en' ? '' : `/${locale}`
    sitemap.push({
      url: `${baseUrl}${localePath || '/'}`,
      lastModified: LAST_MODIFIED.homepage,
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  })

  // Add privacy page for each locale
  locales.forEach(locale => {
    const localePath = locale === 'en' ? '' : `/${locale}`
    sitemap.push({
      url: `${baseUrl}${localePath}/privacy`,
      lastModified: LAST_MODIFIED.privacy,
      changeFrequency: 'yearly',
      priority: 0.3,
    })
  })

  // Add portfolio page for each locale (if portfolio is enabled)
  if (FEATURES.PORTFOLIO_ENABLED) {
    locales.forEach(locale => {
      const localePath = locale === 'en' ? '' : `/${locale}`
      sitemap.push({
        url: `${baseUrl}${localePath}/portfolio`,
        lastModified: LAST_MODIFIED.portfolio,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  }

  // Add services pages for each locale
  locales.forEach(locale => {
    const localePath = locale === 'en' ? '' : `/${locale}`
    // All services page
    const servicesPath = locale === 'pl' ? 'uslugi' : 'services'
    sitemap.push({
      url: `${baseUrl}${localePath}/${servicesPath}`,
      lastModified: LAST_MODIFIED.services,
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    // Individual service pages with localized slugs
    services.forEach(service => {
      const serviceSlug = service.slug[locale as keyof typeof service.slug]
      sitemap.push({
        url: `${baseUrl}${localePath}/${servicesPath}/${serviceSlug}`,
        lastModified: LAST_MODIFIED.services,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  // Add blog pages for each locale (if blog is enabled)
  if (FEATURES.BLOG_ENABLED) {
    // Get the most recent post date for blog index and taxonomy pages
    const allPosts = [...blogPosts.en, ...blogPosts.pl]
    const mostRecentPostDate =
      allPosts.length > 0
        ? new Date(Math.max(...allPosts.map(p => new Date(p.date).getTime())))
        : LAST_MODIFIED.homepage

    locales.forEach(locale => {
      const localePath = locale === 'en' ? '' : `/${locale}`

      // Blog index page - use most recent post date
      sitemap.push({
        url: `${baseUrl}${localePath}/blog`,
        lastModified: mostRecentPostDate,
        changeFrequency: 'daily',
        priority: 0.9,
      })

      // Individual blog posts
      const posts = locale === 'en' ? blogPosts.en : blogPosts.pl
      posts.forEach(post => {
        sitemap.push({
          url: `${baseUrl}${localePath}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'monthly',
          priority: post.featured ? 0.8 : 0.7,
        })
      })

      // Category pages - use most recent post date
      categories.forEach(category => {
        const categorySlug = slugify(category)
        sitemap.push({
          url: `${baseUrl}${localePath}/blog/category/${categorySlug}`,
          lastModified: mostRecentPostDate,
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      })

      // Tag pages - use most recent post date
      tags.forEach(tag => {
        const tagSlug = slugify(tag)
        sitemap.push({
          url: `${baseUrl}${localePath}/blog/tag/${tagSlug}`,
          lastModified: mostRecentPostDate,
          changeFrequency: 'weekly',
          priority: 0.5,
        })
      })
    })
  }

  return sitemap
}
