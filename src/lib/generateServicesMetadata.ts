import type { Metadata } from 'next'

const BASE_URL = 'https://raqz.pl'

export async function generateServicesMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { getTranslations } = await import('next-intl/server')
  const { locale } = await params
  const t = await getTranslations({ locale })

  const localePath = locale === 'en' ? '/services/' : '/pl/uslugi/'
  const title = `${t('services.title')} - ${t('meta.title')}`
  const description = t('services.description')

  return {
    title,
    description,
    alternates: {
      canonical: localePath,
      languages: {
        en: '/services/',
        pl: '/pl/uslugi/',
        'x-default': '/services/',
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${localePath}`,
      siteName: 'raqz.pl',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      alternateLocale: locale === 'en' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}
