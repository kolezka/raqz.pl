'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import {
  RiArrowDownSLine,
  RiCodeLine,
  RiServerLine,
  RiCpuLine,
  RiToolsLine,
  RiRobotLine,
} from 'react-icons/ri'
import { useTranslations, useLocale } from 'next-intl'
import { memo, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import servicesData from '../data/services.json'
import type { Locale } from '@/i18n'

// Move iconMap outside component to prevent recreation on every render
const iconMap = {
  CodeBracketIcon: RiCodeLine,
  ServerIcon: RiServerLine,
  CpuChipIcon: RiCpuLine,
  WrenchScrewdriverIcon: RiToolsLine,
  RobotIcon: RiRobotLine,
} as const

function ServicesDropdownContent({
  close,
  open,
  t,
  locale,
}: {
  close: () => void
  open: boolean
  t: (key: string) => string
  locale: string
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'

      const handleScroll = () => {
        close()
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [open, close])

  return (
    <>
      <PopoverButton className="inline-flex w-full justify-center items-center text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 hover:text-gray-600 focus:outline-none cursor-pointer">
        {t('services')}
        <RiArrowDownSLine className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="fixed left-1/2 top-[5rem] -translate-x-1/2 z-50 max-w-5xl w-[min(100vw-2rem,64rem)] max-h-[80vh] rounded-xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50  focus:outline-none overflow-y-auto overflow-x-hidden transition ease-out duration-200 data-closed:transform data-closed:opacity-0 data-closed:scale-95 data-closed:translate-y-[-16px]"
      >
        <div className="columns-1 sm:columns-2 gap-0 p-4">
          {servicesData.serviceCategories.map(category => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            return (
              <div key={category.id} className="break-inside-avoid bg-white overflow-hidden">
                <div className="px-4 py-3 bg-linear-to-r from-primary-50/80 to-primary-100/40">
                  <div className="flex items-center text-xs font-semibold text-gray-900">
                    <div className="p-1.5 bg-white/80 rounded-md mr-2 shadow-sm">
                      <IconComponent className="h-3 w-3 text-primary-600" aria-hidden="true" />
                    </div>
                    {t(`servicesDropdown.categories.${category.id}.name`)}
                  </div>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    {t(`servicesDropdown.categories.${category.id}.description`)}
                  </p>
                </div>
                <div className="flex-1">
                  {category.services.map(service => {
                    return (
                      <Link
                        key={service.id}
                        href={{
                          pathname: '/services/[serviceSlug]',
                          params: { serviceSlug: service.slug[locale as Locale] },
                        }}
                        onClick={() => close()}
                        className="group flex items-center px-4 py-2 text-xs transition-all duration-200 hover:bg-primary-50/60 hover:border-l-2 hover:border-primary-300 focus:bg-primary-50/60 focus:text-gray-900 focus:border-l-2 focus:border-primary-400 text-gray-700"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {t(`servicesDropdown.services.${service.id}.name`)}
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                            {t(`servicesDropdown.services.${service.id}.shortDescription`)}
                          </div>
                        </div>
                        <div className="transition-opacity duration-200 text-primary-400 text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                          →
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div className="w-full border-t border-gray-200/50 bg-linear-to-r from-primary-500 to-primary-600 mt-2">
          <Link
            href="/services"
            onClick={() => close()}
            className="block px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 focus:bg-white/20"
          >
            <div className="flex items-center justify-between">
              <span>{t('viewAll')}</span>
              <span className="text-lg">→</span>
            </div>
          </Link>
        </div>
      </PopoverPanel>
    </>
  )
}

export default memo(function ServicesDropdown() {
  const t = useTranslations('navigation')
  const locale = useLocale()

  return (
    <Popover className="relative inline-block text-left">
      {({ close, open }) => (
        <ServicesDropdownContent close={close} open={open} t={t} locale={locale} />
      )}
    </Popover>
  )
})
