import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import DevelopersList from '@/components/developers/DevelopersList'
import { getAllSpecialists } from '@/lib/generateDeveloperParams'
import Script from 'next/script'
import { BASE_URL } from '@/lib/schema'
import type { Specialist } from '@/types/developers'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('developers')

  return {
    title: t('meta.title', { defaultValue: 'Our Specialists' }),
    description: t('meta.description', {
      defaultValue: 'Talented developers available for your projects.',
    }),
  }
}

export default async function DevelopersPage() {
  const t = await getTranslations('developers')
  const specialists = getAllSpecialists()

  // Generate schema.org structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('meta.title', { defaultValue: 'Our Specialists' }),
    description: t('meta.description', {
      defaultValue: 'Talented developers available for your projects.',
    }),
    url: `${BASE_URL}/developers`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: specialists.map((spec: Specialist, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: spec.name,
          description: spec.shortDescription,
        },
      })),
    },
  }

  return (
    <>
      <Script
        id="developers-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white dark:bg-dark-900 min-h-screen pt-20">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-dark-800/50 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('title', { defaultValue: 'Our Specialists' })}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('description', {
                defaultValue: 'Talented developers available for your projects.',
              })}
            </p>
          </div>
        </div>

        {/* Specialists List */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <DevelopersList specialists={specialists} />
        </div>
      </div>
    </>
  )
}
