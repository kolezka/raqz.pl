import PortfolioClient from '@/components/portfolio/PortfolioClient'
import { FEATURES } from '@/config/features'
import FeatureDisabled from '@/components/FeatureDisabled'
import Script from 'next/script'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { generateBreadcrumbSchema, generatePersonSchema, BASE_URL } from '@/lib/schema'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function PortfolioPage() {
  if (!FEATURES.PORTFOLIO_ENABLED) {
    return <FeatureDisabled />
  }

  const locale = await getLocale()
  const t = await getTranslations()

  const localePath = locale === 'en' ? '' : `/${locale}`

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${BASE_URL}${localePath}/portfolio/#profilepage`,
    url: `${BASE_URL}${localePath}/portfolio`,
    name: t('portfolio.title'),
    description: t('portfolio.description'),
    mainEntity: {
      '@id': `${BASE_URL}/#person`,
    },
    isPartOf: {
      '@id': `${BASE_URL}${localePath}/#website`,
    },
    inLanguage: locale === 'en' ? 'en-US' : 'pl-PL',
  }

  const personSchema = generatePersonSchema(locale)

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === 'en' ? 'Home' : 'Strona główna',
      url: `${BASE_URL}${localePath || '/'}`,
    },
    {
      name: t('portfolio.title'),
      url: `${BASE_URL}${localePath}/portfolio`,
    },
  ])

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(portfolioSchema),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(personSchema),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(breadcrumbSchema),
    ],
  }

  return (
    <>
      <Script
        id="portfolio-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <PortfolioClient />
    </>
  )
}
