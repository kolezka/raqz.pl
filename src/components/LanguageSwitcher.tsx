'use client'

import { useMemo, memo, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/i18n'

// Move languages array outside component to prevent recreation on every render
const languages: readonly { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
] as const

function LanguageSwitcherContent({
  close,
  open,
  currentLanguage,
  pathnameWithoutLocale,
  locale,
}: {
  close: () => void
  open: boolean
  currentLanguage: (typeof languages)[number]
  pathnameWithoutLocale: string
  locale: string
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

  return (
    <>
      <PopoverButton className="inline-flex w-full justify-center items-center text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 hover:text-gray-600 focus:outline-none cursor-pointer">
        <span className="text-base mr-1">{currentLanguage.flag}</span>
        <span className="uppercase mr-2">{currentLanguage.code}</span>
        <RiArrowDownSLine className="-mr-1 h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-0 z-50 mt-2 w-40 rounded-xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 focus:outline-none overflow-hidden transition ease-out duration-200 data-closed:transform data-closed:opacity-0 data-closed:scale-95 data-closed:translate-y-[-16px]"
      >
        <div className="py-1">
          {languages.map(language => (
            <Link
              key={language.code}
              href={pathnameWithoutLocale}
              locale={language.code}
              onClick={() => close()}
              className={`cursor flex items-center gap-3 w-full px-4 py-2 text-sm transition-all duration-200 hover:bg-primary-50/60 focus:bg-primary-50/60 focus:text-gray-900 text-left ${
                locale === language.code
                  ? 'bg-primary-50/60 text-primary-600 border-l-2 border-primary-300'
                  : 'text-gray-700'
              }`}
            >
              <span className="text-base">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </Link>
          ))}
        </div>
      </PopoverPanel>
    </>
  )
}

export default memo(function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === locale) || languages[0],
    [locale]
  )

  // Get pathname without locale prefix for use in Link component
  const pathnameWithoutLocale = useMemo(() => {
    // If current locale is Polish, remove the /pl prefix
    if (locale === 'pl' && pathname.startsWith('/pl')) {
      return pathname.substring(3) || '/'
    }
    // If current locale is English and path starts with /en, remove it
    if (locale === 'en' && pathname.startsWith('/en')) {
      return pathname.substring(3) || '/'
    }
    // Otherwise return as-is
    return pathname
  }, [locale, pathname])

  return (
    <Popover className="relative inline-block text-left">
      {({ close, open }) => (
        <LanguageSwitcherContent
          close={close}
          open={open}
          currentLanguage={currentLanguage}
          pathnameWithoutLocale={pathnameWithoutLocale}
          locale={locale}
        />
      )}
    </Popover>
  )
})
