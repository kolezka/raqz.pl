import CVClient from '@/components/cv/CVClient'
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
  const t = await getTranslations({ locale, namespace: 'cv' })

  const localePath = locale === 'en' ? '' : `/${locale}`

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${localePath}/cv`,
      languages: {
        en: '/cv',
        pl: '/pl/cv',
        'x-default': '/cv',
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${BASE_URL}${localePath}/cv`,
      siteName: 'raqz.pl',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      type: 'profile',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('meta.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: ['/og-image.png'],
    },
  }
}

export default async function CVPage() {
  if (!FEATURES.CV_ENABLED) {
    return <FeatureDisabled />
  }

  const locale = await getLocale()
  const t = await getTranslations()

  const localePath = locale === 'en' ? '' : `/${locale}`

  const cvSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${BASE_URL}${localePath}/cv/#profilepage`,
    url: `${BASE_URL}${localePath}/cv`,
    name: t('cv.meta.title'),
    description: t('cv.meta.description'),
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
      name: t('cv.title'),
      url: `${BASE_URL}${localePath}/cv`,
    },
  ])

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(cvSchema),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(personSchema),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(breadcrumbSchema),
    ],
  }

  return (
    <>
      <Script
        id="cv-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <CVClient />
    </>
  )
}
