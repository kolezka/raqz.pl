'use client'

/* eslint-disable react-hooks/refs */
import { RiCodeLine, RiServerLine, RiCpuLine, RiToolsLine, RiRobotLine } from 'react-icons/ri'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import { Link } from '@/i18n/routing'
import servicesData from '../data/services.json'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Move iconMap outside component to prevent recreation on every render
const iconMap = {
  CodeBracketIcon: RiCodeLine,
  ServerIcon: RiServerLine,
  CpuChipIcon: RiCpuLine,
  WrenchScrewdriverIcon: RiToolsLine,
  RobotIcon: RiRobotLine,
} as const

export default memo(function Services() {
  const t = useTranslations()
  const tNav = useTranslations('navigation')

  const headerAnimation = useScrollAnimation<HTMLDivElement>('fade-up')
  const card1Animation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const card2Animation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 200 })
  const card3Animation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 300 })
  const card4Animation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 400 })
  const cardAnimations = [card1Animation, card2Animation, card3Animation, card4Animation]
  const ctaAnimation = useScrollAnimation<HTMLDivElement>('zoom-in', { delay: 500 })

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerAnimation.ref}
          className={`mx-auto max-w-4xl lg:text-center ${headerAnimation.className}`}
        >
          <h2 className="font-semibold text-primary-500 dark:text-primary-400 text-md mb-2">
            {t('services.title')}
          </h2>
          <p className="font-bold tracking-tight text-gray-900 dark:text-white text-5xl mb-4">
            {t('services.sectionTitle')}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('services.sectionDescription')}
          </p>
        </div>
        <div className="max-w-5xl mx-auto my-8">
          <dl className="grid md:grid-cols-2 gap-8">
            {servicesData.serviceCategories.slice(0, 4).map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              const animation = cardAnimations[index]

              return (
                <Link key={category.id} href="/services">
                  <div
                    ref={animation?.ref}
                    className={`group relative p-4 pl-16 hover:scale-105 transition-transform ${animation?.className ?? ''}`}
                  >
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      <div className="absolute left-2 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 dark:bg-primary-600 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {t(`serviceCategories.${category.id}`)}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                      {tNav(`servicesDropdown.categories.${category.id}.description`)}
                    </dd>
                  </div>
                </Link>
              )
            })}
          </dl>
        </div>

        <div ref={ctaAnimation.ref} className={`text-center ${ctaAnimation.className}`}>
          <Link
            href="/services"
            className="rounded-md bg-primary-500 dark:bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 dark:hover:bg-primary-500 hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 inline-block"
          >
            {t('services.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
})
