import Hero from '@/components/Hero'
import AnimatedBackground from '@/components/AnimatedBackground'
import WorkInProgress from '@/components/WorkInProgress'
import { routing } from '@/i18n/routing'

// ISR: Revalidate every 1 hour
export const revalidate = 3600

// Generate static params for ISR
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Hero />
      <WorkInProgress />
    </div>
  )
}
