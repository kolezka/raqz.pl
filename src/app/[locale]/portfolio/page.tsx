import PortfolioClient from '@/components/portfolio/PortfolioClient'
import { FEATURES } from '@/config/features'
import FeatureDisabled from '@/components/FeatureDisabled'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function PortfolioPage() {
  if (!FEATURES.PORTFOLIO_ENABLED) {
    return <FeatureDisabled />
  }

  return <PortfolioClient />
}
