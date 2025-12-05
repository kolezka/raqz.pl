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
      <div className="mx-auto px-6 lg:px-8">
        <div
          ref={headerAnimation.ref}
          className={`mx-auto max-w-4xl lg:text-center ${headerAnimation.className}`}
        >
          <h2 className="font-semibold text-primary-500 text-md mb-2">{t('services.title')}</h2>
          <p className="font-bold tracking-tight text-gray-900 text-5xl mb-4">
            {t('services.sectionTitle')}
          </p>
          <p className="text-gray-600 text-lg">{t('services.sectionDescription')}</p>
        </div>
        <div className="max-w-5xl mx-auto my-8">
          <dl className="grid md:grid-cols-2 gap-8">
            {servicesData.serviceCategories.slice(0, 4).map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]

              return (
                <Link to="/services">
                  <div
                    key={category.id}
                    className="group relative p-4 pl-16 hover:scale-105 transition-transform"
                    style={staggerStyles[index]}
                  >
                    <dt className="text-base font-semibold leading-7 text-gray-900 ">
                      <div className="absolute left-2 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {t(`serviceCategories.${category.id}`)}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {t(`servicesDropdown.categories.${category.id}.description`)}
                    </dd>
                  </div>
                </Link>
              )
            })}
          </dl>
        </div>

        <div ref={ctaAnimation.ref} className={`text-center ${ctaAnimation.className}`}>
          <Link
            to="/services"
            className="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 inline-block"
          >
            {t('services.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
})
