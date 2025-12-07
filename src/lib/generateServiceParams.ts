import servicesData from '@/data/services.json'

export async function generateStaticParams() {
  return servicesData.serviceCategories.flatMap(category =>
    category.services.map(service => ({
      serviceId: service.id,
    }))
  )
}

export async function generateServiceMetadata({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string }>
}) {
  const { getTranslations } = await import('next-intl/server')
  const { locale, serviceId } = await params
  const t = await getTranslations({ locale })

  const result = servicesData.serviceCategories
    .flatMap(cat =>
      cat.services.map(service => (service.id === serviceId ? { service, category: cat } : null))
    )
    .find(Boolean)

  if (!result) {
    return {}
  }

  return {
    title: `${t(`navigation.servicesDropdown.services.${serviceId}.name`)} - ${t('services.title')} - ${t('meta.title')}`,
    description: t(`serviceDetails.${serviceId}.description`),
  }
}
