import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DeveloperProfile from '@/components/developers/DeveloperProfile'
import { getSpecialistBySlug, generateDeveloperParams } from '@/lib/generateDeveloperParams'
import Script from 'next/script'
import { BASE_URL } from '@/lib/schema'

interface DeveloperPageProps {
  params: Promise<{
    locale: string
    developerSlug: string
  }>
}

export async function generateStaticParams() {
  const locales = ['en', 'pl']
  const params: Array<{ locale: string; developerSlug: string }> = []

  for (const locale of locales) {
    const localeParams = generateDeveloperParams(locale)
    for (const param of localeParams) {
      params.push({
        locale,
        developerSlug: param.developerSlug,
      })
    }
  }

  return params
}

export async function generateMetadata({ params }: DeveloperPageProps): Promise<Metadata> {
  const { locale, developerSlug } = await params
  const specialist = getSpecialistBySlug(developerSlug, locale)

  if (!specialist) {
    return {
      title: 'Specialist Not Found',
    }
  }

  return {
    title: `${specialist.name}`,
    description: specialist.shortDescription,
  }
}

export default async function DeveloperPage({ params }: DeveloperPageProps) {
  const { locale, developerSlug } = await params
  const specialist = getSpecialistBySlug(developerSlug, locale)

  if (!specialist) {
    notFound()
  }

  // Generate schema.org structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: specialist.name,
    description: specialist.fullDescription,
    provider: {
      '@type': 'Organization',
      name: 'raqz.pl',
      url: BASE_URL,
    },
  }

  return (
    <>
      <Script
        id="specialist-profile-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white dark:bg-dark-900 min-h-screen pt-20 px-6 py-12 sm:py-24 lg:px-8">
        <DeveloperProfile specialist={specialist} />
      </div>
    </>
  )
}
