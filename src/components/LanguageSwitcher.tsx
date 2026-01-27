'use client'

import { useMemo, memo, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { useRouter, usePathname } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import type { Locale } from '@/i18n'
import servicesData from '@/data/services.json'

// Move languages array outside component to prevent recreation on every render
const languages: readonly { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
] as const

function LanguageSwitcherContent({
  close,
  open,
  currentLanguage,
  pathname,
  params,
  locale,
  router,
}: {
  close: () => void
  open: boolean
  currentLanguage: (typeof languages)[number]
  pathname: string
  params: ReturnType<typeof useParams>
  locale: string
  router: ReturnType<typeof useRouter>
}) {
  useEffect(() => {
    if (open) {
      const handleScroll = () => {
        close()
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [open, close])

  const handleLanguageSwitch = (newLocale: Locale) => {
    close()

    // Special handling for service pages with locale-specific slugs
    // Check if we're on a service detail page by looking at pathname template and params
    if (pathname === '/services/[serviceSlug]' && params.serviceSlug) {
      const currentSlug = params.serviceSlug as string

      // Find the service by current slug (search in current locale)
      let foundService = null
      for (const category of servicesData.serviceCategories) {
        for (const service of category.services) {
          if (service.slug[locale as Locale] === currentSlug) {
            foundService = service
            break
          }
        }
        if (foundService) break
      }

      if (foundService) {
        // Navigate to the service page with the correct slug for the new locale
        const newSlug = foundService.slug[newLocale]
        router.push(
          {
            pathname: '/services/[serviceSlug]',
            params: { serviceSlug: newSlug },
          },
          { locale: newLocale }
        )
        return
      }
    }

    // For all other pages, use the default behavior
    // @ts-expect-error - pathname can be any string, but router.replace is strictly typed
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <>
      <PopoverButton className="inline-flex w-full justify-center items-center text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none cursor-pointer">
        <span className="text-base mr-1">{currentLanguage.flag}</span>
        <span className="uppercase mr-2">{currentLanguage.code}</span>
        <RiArrowDownSLine className="-mr-1 -ml-1 h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-0 z-50 mt-2 w-40 rounded-xl bg-white/90 dark:bg-dark-800/95 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 focus:outline-none overflow-hidden transition ease-out duration-200 data-closed:transform data-closed:opacity-0 data-closed:scale-95 data-closed:translate-y-[-16px]"
      >
        <div className="py-1">
          {languages.map(language => (
            <button
              key={language.code}
              type="button"
              onClick={() => handleLanguageSwitch(language.code)}
              className={`cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm transition-all duration-200 hover:bg-primary-50/60 dark:hover:bg-primary-900/30 focus:bg-primary-50/60 dark:focus:bg-primary-900/30 focus:text-gray-900 dark:focus:text-white text-left ${
                locale === language.code
                  ? 'bg-primary-50/60 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-l-2 border-primary-300 dark:border-primary-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-base">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      </PopoverPanel>
    </>
  )
}

export default memo(function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === locale) || languages[0],
    [locale]
  )

  return (
    <Popover className="relative inline-block text-left">
      {({ close, open }) => (
        <LanguageSwitcherContent
          close={close}
          open={open}
          currentLanguage={currentLanguage}
          pathname={pathname}
          params={params}
          locale={locale}
          router={router}
        />
      )}
    </Popover>
  )
})
