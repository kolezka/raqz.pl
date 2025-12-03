/* eslint-disable react-hooks/refs */
import { RiCodeLine, RiServerLine, RiCpuLine, RiToolsLine, RiRobotLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import servicesData from '../data/services.json'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'

// Move iconMap outside component to prevent recreation on every render
const iconMap = {
  CodeBracketIcon: RiCodeLine,
  ServerIcon: RiServerLine,
  CpuChipIcon: RiCpuLine,
  WrenchScrewdriverIcon: RiToolsLine,
  RobotIcon: RiRobotLine,
} as const

export default memo(function Services() {
  const { t } = useTranslation()

  const headerAnimation = useScrollAnimation<HTMLDivElement>('fade-up')
  const staggerStyles = useStaggerAnimation(servicesData.serviceCategories.length, {
    baseDelay: 0,
    staggerDelay: 100,
    duration: 500,
  })
  const ctaAnimation = useScrollAnimation<HTMLDivElement>('zoom-in', { delay: 200 })

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerAnimation.ref}
          className={`mx-auto max-w-2xl lg:text-center ${headerAnimation.className}`}
        >
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            {t('services.title')}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('services.sectionTitle')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">{t('services.sectionDescription')}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
          <dl className="flex flex-wrap gap-8 lg:gap-x-12 lg:gap-y-8 justify-center">
            {servicesData.serviceCategories.map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]

              return (
                <div
                  key={category.id}
                  className="relative pl-16 flex-shrink-0 w-full sm:w-80 lg:w-96 opacity-0 animate-fade-up"
                  style={staggerStyles[index]}
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                      <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {t(`serviceCategories.${category.id}`)}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {t(`servicesDropdown.categories.${category.id}.description`)}
                  </dd>
                  <dd className="mt-4">
                    <Link
                      to="/services"
                      className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500 transition-colors duration-200 inline-flex items-center group"
                    >
                      {t('services.learnMore')}{' '}
                      <span
                        aria-hidden="true"
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      >
                        →
                      </span>
                    </Link>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        <div ref={ctaAnimation.ref} className={`mt-16 text-center ${ctaAnimation.className}`}>
          <Link
            to="/services"
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 inline-block"
          >
            {t('services.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
})
