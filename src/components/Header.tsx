'use client'

import { useMemo, useState, memo, useEffect, useRef } from 'react'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import clsx from 'clsx'
import ServicesDropdown from './ServicesDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { FEATURES } from '../config/features'

const scrollToSection = (sectionId: string) => {
  if (typeof window === 'undefined') return

  const element = document.getElementById(sectionId.replace('#', ''))
  if (element) {
    const headerOffset = 80 // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export default memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScrollDirection(15)
  const t = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Get language prefix for URLs
  const langPrefix = useMemo(() => (locale === 'en' ? '' : `/${locale}`), [locale])

  // Handle hash navigation after route change
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure page has loaded
      setTimeout(() => {
        scrollToSection(hash.substring(1))
      }, 100)
    }
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
  }, [mobileMenuOpen])

  const navigation = useMemo(() => {
    const items = [
      // { name: t('home'), href: `${langPrefix}/`, type: 'link' },
      {
        name: t('about'),
        href: `${langPrefix}/#about`,
        type: 'anchor',
      },
      {
        name: t('services'),
        href: `${langPrefix}/services`,
        type: 'dropdown',
      },
      ...(FEATURES.PORTFOLIO_ENABLED
        ? [
            {
              name: t('portfolio'),
              href: `${langPrefix}/portfolio`,
              type: 'link' as const,
            },
          ]
        : []),
      ...(FEATURES.BLOG_ENABLED
        ? [
            {
              name: t('blog'),
              href: `${langPrefix}/blog`,
              type: 'link' as const,
            },
          ]
        : []),
      ...(FEATURES.CV_ENABLED
        ? [
            {
              name: t('cv'),
              href: `${langPrefix}/cv`,
              type: 'link' as const,
            },
          ]
        : []),
      ...(FEATURES.DEVELOPERS_ENABLED
        ? [
            {
              name: t('developers'),
              href: `${langPrefix}/developers`,
              type: 'link' as const,
            },
          ]
        : []),
      ...(FEATURES.CONTACT
        ? [
            {
              name: t('contact'),
              href: `${langPrefix}/#contact`,
              type: 'anchor',
            },
          ]
        : []),
    ]
    return items
  }, [t, langPrefix])

  return (
    <header
      className={clsx(
        'print:hidden fixed top-0 left-0 right-0 z-10',
        'transition-transform duration-300 ease',
        scrollY > 100 && !mobileMenuOpen ? 'translate-y-4' : 'translate-y-10'
      )}
      // style={{ viewTransitionName: 'site-header' }}
    >
      <div ref={menuRef} className="max-w-7xl mx-auto px-6">
        <nav
          className={clsx(
            'flex items-center justify-between',
            'py-3 px-4 lg:py-4 lg:px-6',
            'border border-gray-100 dark:border-gray-800',
            'bg-white dark:bg-dark-800/30',
            mobileMenuOpen ? 'rounded-t-2xl' : 'rounded-lg',
            'shadow-sm',
            'transition-all duration-300 linear',
            'backdrop-blur-2xl'
          )}
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href={`${langPrefix}/`} className="-m-1.5 p-1.5 group" aria-label={t('home')}>
              <span
                className="tracking-wide text-2xl lg:text-3xl leading-none font-bold transition-all duration-150 inline-block group-hover:scale-105"
                aria-hidden="true"
              >
                raqz.pl
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-700 dark:text-gray-300 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <RiCloseLine className="h-6 w-6" aria-hidden="true" />
              ) : (
                <RiMenuLine className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map(item => (
              <div key={item.name}>
                {item.type === 'dropdown' ? (
                  <ServicesDropdown />
                ) : item.type === 'link' ? (
                  <Link
                    href={item.href}
                    className="text-sm font-semibold transition-colors duration-150 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 relative"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-semibold transition-colors duration-150 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 relative"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        <div
          className={clsx(
            'lg:hidden origin-top transition-all duration-200 ease-out',
            mobileMenuOpen
              ? 'scale-y-100 opacity-100 max-h-[1000px]'
              : 'scale-y-0 opacity-0 pointer-events-none max-h-0'
          )}
        >
          <div className="bg-white dark:bg-dark-800 border border-t-0 border-gray-100 dark:border-gray-700 rounded-b-2xl shadow-lg px-4 pb-4">
            <div className="space-y-1 py-3">
              {navigation.map(item =>
                item.type === 'link' || item.type === 'anchor' ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-150"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    href={`${langPrefix}/services`}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-150"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
              <Link
                href={`${langPrefix}/#contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-semibold text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-150"
              >
                {t('getStarted')}
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-3 px-3 border-t border-gray-100 dark:border-gray-700 mt-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
})
