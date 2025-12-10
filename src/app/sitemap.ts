import { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import servicesData from '@/data/services.json'
import blogIndex from '@/data/blog-index.json'
import { FEATURES } from '@/config/features'

const baseUrl = 'https://raqz.pl'

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
  locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  })

  // Add services pages for each locale
  locales.forEach(locale => {
    // All services page
    const servicesPath = locale === 'pl' ? 'uslugi' : 'services'
    sitemap.push({
      url: `${baseUrl}/${locale}/${servicesPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    // Individual service pages with localized slugs
    services.forEach(service => {
      const serviceSlug = service.slug[locale as keyof typeof service.slug]
      sitemap.push({
        url: `${baseUrl}/${locale}/${servicesPath}/${serviceSlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  // Add blog pages for each locale (if blog is enabled)
  if (FEATURES.BLOG_ENABLED) {
    locales.forEach(locale => {
      // Blog index page
      sitemap.push({
        url: `${baseUrl}/${locale}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      })

      // Individual blog posts
      const posts = locale === 'en' ? blogPosts.en : blogPosts.pl
      posts.forEach(post => {
        sitemap.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: post.lastModified ? new Date(post.lastModified) : new Date(post.date),
          changeFrequency: 'monthly',
          priority: post.featured ? 0.8 : 0.7,
        })
      })

      // Category pages
      categories.forEach(category => {
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
        sitemap.push({
          url: `${baseUrl}/${locale}/blog/category/${categorySlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      })

      // Tag pages
      tags.forEach(tag => {
        const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
        sitemap.push({
          url: `${baseUrl}/${locale}/blog/tag/${tagSlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        })
      })
    })
  }

  return sitemap
}
