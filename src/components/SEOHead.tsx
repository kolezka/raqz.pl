'use client'

import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  path?: string
}

export default function SEOHead({ title, description, keywords, path = '' }: SEOHeadProps) {
  const locale = useLocale()
  const t = useTranslations()

  const defaultTitle = t('meta.title')
  const defaultDescription = t('meta.description')
  const defaultKeywords = t('meta.keywords')

  const pageTitle = title || defaultTitle
  const pageDescription = description || defaultDescription
  const pageKeywords = keywords || defaultKeywords

  useEffect(() => {
    // Update document title
    document.title = pageTitle

    // Update meta tags
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
    setMetaTag('description', pageDescription)
    setMetaTag('keywords', pageKeywords)

    // Construct URLs
    const baseUrl = window.location.origin
    const langPrefix = locale === 'en' ? '' : `/${locale}`
    const canonicalUrl = `${baseUrl}${langPrefix}${path}`

    // Set canonical URL
    setLinkTag('canonical', canonicalUrl)

    // Set alternate language URLs
    setLinkTag('alternate', `${baseUrl}${path}`, 'en')
    setLinkTag('alternate', `${baseUrl}/pl${path}`, 'pl')
    setLinkTag('alternate', `${baseUrl}${path}`, 'x-default')

    // Set Open Graph tags
    setPropertyTag('og:title', pageTitle)
    setPropertyTag('og:description', pageDescription)
    setPropertyTag('og:url', canonicalUrl)
    setPropertyTag('og:type', 'website')
    setPropertyTag('og:locale', locale === 'pl' ? 'pl_PL' : 'en_US')

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', pageTitle)
    setMetaTag('twitter:description', pageDescription)
  }, [pageTitle, pageDescription, pageKeywords, locale, path])

  return null
}
