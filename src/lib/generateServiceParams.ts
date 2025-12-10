import servicesData from '@/data/services.json'
import type { Locale } from '@/i18n'

// Helper to get service by slug for a specific locale
export function getServiceBySlug(slug: string, locale: Locale) {
  for (const category of servicesData.serviceCategories) {
    for (const service of category.services) {
      if (service.slug[locale] === slug) {
        return { service, category }
      }
    }
  }
  return null
}

// Helper to get all services
export function getAllServices() {
  return servicesData.serviceCategories.flatMap(category =>
    category.services.map(service => ({ service, category }))
  )
}

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'pl']

  return servicesData.serviceCategories.flatMap(category =>
    category.services.flatMap(service =>
      locales.map(locale => ({
        locale,
        serviceSlug: service.slug[locale],
      }))
    )
  )
}

export async function generateServiceMetadata({
  params,
}: {
  params: Promise<{ locale: string; serviceSlug: string }>
}) {
  const { getTranslations } = await import('next-intl/server')
  const { locale, serviceSlug } = await params
  const t = await getTranslations({ locale })

  const result = getServiceBySlug(serviceSlug, locale as Locale)

  if (!result) {
    return {}
  }

  const { service } = result

  return {
    title: `${t(`navigation.servicesDropdown.services.${service.id}.name`)} - ${t('services.title')} - ${t('meta.title')}`,
    description: t(`serviceDetails.${service.id}.description`),
  }
}
