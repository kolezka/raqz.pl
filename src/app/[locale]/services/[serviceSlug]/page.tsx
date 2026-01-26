import { notFound } from 'next/navigation'
import { RiCheckLine } from 'react-icons/ri'
import { getTranslations, getMessages, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { getServiceBySlug } from '@/lib/generateServiceParams'
import type { Locale } from '@/i18n'

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

  return (
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
                  href="/#contact"
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
                <Link
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
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
