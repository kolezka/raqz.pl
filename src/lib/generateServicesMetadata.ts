export async function generateServicesMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { getTranslations } = await import('next-intl/server')
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: `${t('services.title')} - ${t('meta.title')}`,
    description: t('services.description'),
  }
}
