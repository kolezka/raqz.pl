import { notFound } from 'next/navigation'
import { RiCheckLine } from 'react-icons/ri'
import { getTranslations, getMessages, getLocale } from 'next-intl/server'
import I18nTransitionLink from '@/components/I18nTransitionLink'
import { getServiceBySlug } from '@/lib/generateServiceParams'
import { generateServiceSchema, generateBreadcrumbSchema, combineSchemas } from '@/lib/schema'
import Script from 'next/script'
import type { Locale } from '@/i18n'
import Contact from '@/components/Contact'

export {
  generateStaticParams,
  generateServiceMetadata as generateMetadata,
} from '@/lib/generateServiceParams'

interface ServiceDetailsMessages {
  serviceDetails?: {
    [key: string]: {
      features?: string[]
    }
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>
}) {
  const { serviceSlug } = await params
  const locale = (await getLocale()) as Locale
  const t = await getTranslations()
  const messages = (await getMessages()) as ServiceDetailsMessages

  const result = getServiceBySlug(serviceSlug, locale)

  if (!result) {
    notFound()
  }

  const { service, category } = result
  const serviceId = service.id

  // Generate Schema.org structured data
  const localePath = locale === 'en' ? '' : `/${locale}`
  const serviceUrl = `${localePath}/services/${serviceSlug}`
  const serviceName = t(`navigation.servicesDropdown.services.${serviceId}.name`)
  const serviceDescription = t(`serviceDetails.${serviceId}.description`)
  const categoryName = t(`serviceCategories.${category.id}`)

  const serviceSchema = generateServiceSchema({
    locale,
    serviceName,
    serviceDescription,
    categoryName,
    serviceUrl,
    pricing: messages.serviceDetails?.[serviceId]?.features
      ? t.raw(`serviceDetails.${serviceId}.pricing`)
      : undefined,
    features: messages.serviceDetails?.[serviceId]?.features,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: locale === 'en' ? 'Home' : 'Strona główna',
      url: `https://raqz.pl${localePath || '/'}`,
    },
    {
      name: locale === 'en' ? 'Services' : 'Usługi',
      url: `https://raqz.pl${localePath}/services`,
    },
    {
      name: serviceName,
      url: `https://raqz.pl${serviceUrl}`,
    },
  ])

  const combinedSchema = combineSchemas([serviceSchema, breadcrumbSchema])

  return (
    <>
      <Script
        id="service-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <div className="bg-white dark:bg-dark-900 pt-20">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-dark-800/50 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">
              {t(`serviceCategories.${category.id}`)}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t(`navigation.servicesDropdown.services.${serviceId}.name`)}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t(`serviceDetails.${serviceId}.description`)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {t('serviceDetail.featuresTitle')}
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {t('serviceDetail.featuresIntro')}
                </p>
                <ul role="list" className="mt-8 space-y-4">
                  {messages.serviceDetails?.[serviceId]?.features?.map(
                    (feature: string, index: number) => (
                      <li key={index} className="flex gap-x-3">
                        <RiCheckLine
                          className="mt-1 h-5 w-5 flex-none text-primary-600 dark:text-primary-400"
                          aria-hidden="true"
                        />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Technologies & Pricing */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {t('serviceDetail.technologiesTitle')}
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {t('serviceDetail.technologiesIntro')}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-md bg-primary-50 dark:bg-primary-900/30 px-2 py-1 text-xs font-medium text-primary-700 dark:text-primary-300 ring-1 ring-inset ring-primary-700/10 dark:ring-primary-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {t('serviceDetail.pricingTitle')}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {t('serviceDetail.pricingNote')}
                  </p>
                </div>

                <div className="mt-8">
                  <a
                    href="#contact"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    {t('serviceDetail.getStarted')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="bg-gray-50 dark:bg-dark-800/50 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center mb-12">
              {t('serviceDetail.otherServices')} - {t(`serviceCategories.${category.id}`)}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.services
                .filter(s => s.id !== serviceId)
                .map(relatedService => (
                  <I18nTransitionLink
                    key={relatedService.id}
                    href={{
                      pathname: '/services/[serviceSlug]',
                      params: { serviceSlug: relatedService.slug[locale] },
                    }}
                    className="relative overflow-hidden rounded-lg bg-white dark:bg-dark-800 px-6 py-8 shadow-sm hover:shadow-md dark:hover:shadow-primary-500/10 transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t(`navigation.servicesDropdown.services.${relatedService.id}.name`)}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {t(
                        `navigation.servicesDropdown.services.${relatedService.id}.shortDescription`
                      )}
                    </p>
                  </I18nTransitionLink>
                ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <Contact />
      </div>
    </>
  )
}
