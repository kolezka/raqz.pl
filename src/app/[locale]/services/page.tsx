import { RiCodeLine, RiServerLine, RiCpuLine, RiToolsLine, RiRobotLine } from 'react-icons/ri'
import { getTranslations, getMessages, getLocale } from 'next-intl/server'
import I18nTransitionLink from '@/components/I18nTransitionLink'
import Script from 'next/script'
import servicesData from '@/data/services.json'
import { generateBreadcrumbSchema, BASE_URL } from '@/lib/schema'
import type { Locale } from '@/i18n'
import Contact from '@/components/Contact'
import { routing } from '@/i18n/routing'

// ISR: Revalidate every 1 day
export const revalidate = 86400

// Generate static params for ISR
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export { generateServicesMetadata as generateMetadata } from '@/lib/generateServicesMetadata'

const iconMap = {
  CodeBracketIcon: RiCodeLine,
  ServerIcon: RiServerLine,
  CpuChipIcon: RiCpuLine,
  WrenchScrewdriverIcon: RiToolsLine,
  RobotIcon: RiRobotLine,
}

interface ServiceDetailsMessages {
  serviceDetails?: {
    [key: string]: {
      features?: string[]
    }
  }
}

export default async function AllServicesPage() {
  const t = await getTranslations()
  const messages = (await getMessages()) as ServiceDetailsMessages
  const locale = (await getLocale()) as Locale

  const localePath = locale === 'en' ? '' : `/${locale}`

  // Generate ItemList schema for all services
  let position = 0
  const allServices = servicesData.serviceCategories.flatMap(category =>
    category.services.map(service => {
      position++
      return {
        '@type': 'ListItem',
        position,
        item: {
          '@type': 'Service',
          name: t(`navigation.servicesDropdown.services.${service.id}.name`),
          description: t(`navigation.servicesDropdown.services.${service.id}.shortDescription`),
          url: `${BASE_URL}${localePath}/services/${service.slug[locale]}`,
          provider: {
            '@id': `${BASE_URL}/#organization`,
          },
        },
      }
    })
  )

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('services.title'),
    description: t('services.description'),
    numberOfItems: allServices.length,
    itemListElement: allServices,
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === 'en' ? 'Home' : 'Strona główna',
      url: `${BASE_URL}${localePath || '/'}`,
    },
    {
      name: t('services.title'),
      url: `${BASE_URL}${localePath}/services`,
    },
  ])

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(itemListSchema),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ '@context': _, ...rest }) => rest)(breadcrumbSchema),
    ],
  }

  return (
    <>
      <Script
        id="services-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <div className="bg-white dark:bg-dark-900 pt-20">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-dark-800/50 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('services.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('services.description')}
            </p>
          </div>
        </div>

        {/* Services by Category */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="space-y-24">
            {servicesData.serviceCategories.map(category => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              return (
                <div key={category.id}>
                  <div className="mx-auto max-w-2xl text-center mb-16">
                    <div className="flex justify-center">
                      <IconComponent className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                      {t(`serviceCategories.${category.id}`)}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                      {t(`navigation.servicesDropdown.categories.${category.id}.description`)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {category.services.map(service => (
                      <div
                        key={service.id}
                        className="relative overflow-hidden rounded-lg bg-white dark:bg-dark-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-lg dark:hover:shadow-primary-500/10 transition-all duration-200"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {t(`navigation.servicesDropdown.services.${service.id}.name`)}
                          </h3>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {t(
                              `navigation.servicesDropdown.services.${service.id}.shortDescription`
                            )}
                          </p>

                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              {t('services.keyFeatures')}
                            </h4>
                            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                              {messages.serviceDetails?.[service.id]?.features
                                ?.slice(0, 3)
                                .map((feature: string, index: number) => (
                                  <li key={index} className="flex items-center">
                                    <span className="mr-2">•</span>
                                    {feature}
                                  </li>
                                ))}
                              {messages.serviceDetails?.[service.id]?.features &&
                                messages.serviceDetails?.[service.id]?.features &&
                                messages.serviceDetails[service.id]!.features!.length > 3 && (
                                  <li className="text-gray-400 dark:text-gray-500">
                                    + {messages.serviceDetails[service.id]!.features!.length - 3}{' '}
                                    {t('services.more')}
                                  </li>
                                )}
                            </ul>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-1">
                            {service.technologies.slice(0, 3).map((tech, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-md bg-gray-50 dark:bg-dark-700 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                            {service.technologies.length > 3 && (
                              <span className="inline-flex items-center rounded-md bg-gray-50 dark:bg-dark-700 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                                +{service.technologies.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <I18nTransitionLink
                              href={{
                                pathname: '/services/[serviceSlug]',
                                params: { serviceSlug: service.slug[locale] },
                              }}
                              className="text-sm font-semibold leading-6 text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
                            >
                              {t('services.learnMore')} <span aria-hidden="true">→</span>
                            </I18nTransitionLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Section */}
        <Contact />
      </div>
    </>
  )
}
