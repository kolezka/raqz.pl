import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import type { BlogPost } from '../../types/blog'

interface BlogSEOHeadProps {
  post: BlogPost
}

export default function BlogSEOHead({ post }: BlogSEOHeadProps) {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Update document title
    document.title = `${post.title} | RaqZpl Solutions`

    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const setPropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const setLinkTag = (rel: string, href: string, hrefLang?: string) => {
      const selector = hrefLang
        ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
        : `link[rel="${rel}"]`

      let link = document.querySelector(selector) as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.rel = rel
        if (hrefLang) link.hreflang = hrefLang
        document.head.appendChild(link)
      }
      link.href = href
    }

    // Set meta tags
    setMetaTag('description', post.description)
    setMetaTag('keywords', post.seo?.keywords || post.tags.join(', '))

    // Construct URLs
    const baseUrl = window.location.origin
    const langPrefix = i18n.language === 'en' ? '' : `/${i18n.language}`
    const canonicalUrl = `${baseUrl}${langPrefix}/blog/${post.slug}`

    // Set canonical URL
    setLinkTag('canonical', canonicalUrl)

    // Set alternate language URLs
    setLinkTag('alternate', `${baseUrl}/blog/${post.slug}`, 'en')
    setLinkTag('alternate', `${baseUrl}/pl/blog/${post.slug}`, 'pl')
    setLinkTag('alternate', `${baseUrl}/blog/${post.slug}`, 'x-default')

    // Set Open Graph tags (Article)
    setPropertyTag('og:title', post.title)
    setPropertyTag('og:description', post.description)
    setPropertyTag('og:url', canonicalUrl)
    setPropertyTag('og:type', 'article')
    setPropertyTag('og:image', `${baseUrl}${post.coverImage}`)
    setPropertyTag('og:locale', i18n.language === 'pl' ? 'pl_PL' : 'en_US')
    setPropertyTag('article:published_time', new Date(post.date).toISOString())
    if (post.lastModified) {
      setPropertyTag('article:modified_time', new Date(post.lastModified).toISOString())
    }
    setPropertyTag('article:author', post.author)
    post.tags.forEach((tag, index) => {
      setPropertyTag(`article:tag:${index}`, tag)
    })

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', post.title)
    setMetaTag('twitter:description', post.description)
    setMetaTag('twitter:image', `${baseUrl}${post.coverImage}`)

    // Add JSON-LD structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
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
      },
      publisher: {
        '@type': 'Organization',
        name: 'RaqZpl Solutions',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      keywords: post.tags.join(', '),
      articleSection: post.categories.join(', '),
    }

    // Add or update JSON-LD script tag
    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)

    // Cleanup function
    return () => {
      // Remove JSON-LD script when component unmounts
      const script = document.querySelector('script[type="application/ld+json"]')
      if (script) {
        script.remove()
      }
    }
  }, [post, i18n.language])

  return null
}
