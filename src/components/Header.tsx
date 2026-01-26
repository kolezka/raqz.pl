'use client'

import { useMemo, useState, memo, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import Link from 'next/link'
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
  const [mounted, setMounted] = useState(false)
  const { scrollDirection, scrollY } = useScrollDirection(15)
  const t = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()

  // Mark as mounted after hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

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

  const navigation = useMemo(() => {
    const items = [
      { name: t('home'), href: `${langPrefix}/`, type: 'link' },
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

  // Check if user is still in the hero section
  // Use mounted to prevent hydration mismatch - assume in hero section until mounted
  const isInHeroSection = useMemo(
    () => !mounted || (typeof window !== 'undefined' && scrollY < window.innerHeight),
    [scrollY, mounted]
  )

  // Only allow hiding when we're well past the hero section (200px buffer)
  const canHideHeader = useMemo(
    () => mounted && typeof window !== 'undefined' && scrollY > window.innerHeight + 200,
    [scrollY, mounted]
  )

  // Header visibility logic when fixed
  // Show when: scrolling up, can't hide yet, or mobile menu open
  const shouldShowFixedHeader = useMemo(
    () => scrollDirection === 'up' || !canHideHeader || mobileMenuOpen,
    [scrollDirection, canHideHeader, mobileMenuOpen]
  )

  return (
    <header
      className={clsx(
        'top-0 left-0 right-0 z-10 border-b',
        // Position: absolute in hero, fixed outside
        isInHeroSection ? 'absolute' : 'fixed',
        // Background styling - consistent style in hero section
        isInHeroSection
          ? 'border-none'
          : 'bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm border-gray-200/20 dark:border-gray-700/20',
        // Visibility - only hide when we can and when scrolling down
        !isInHeroSection && !shouldShowFixedHeader ? '-translate-y-full' : 'translate-y-0',
        // Only animate translate, not position changes
        'transition-transform duration-150 ease-in-out'
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href={`${langPrefix}/`} className="-m-1.5 p-1.5 group" aria-label={t('home')}>
            <span
              className="text-2xl font-bold transition-all duration-300 inline-block group-hover:scale-105 group-hover:rotate-1"
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
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <RiMenuLine className="h-6 w-6" aria-hidden="true" />
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
                  className="text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 dark:after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-semibold leading-6 transition-colors duration-300 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 dark:after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full"
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
      <Dialog className="lg:hidden z-50" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-gray-900/25 dark:bg-black/50" />
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-dark-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-700/50 transition duration-150 translate-x-0 data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between">
            <Link href={`${langPrefix}/`} className="-m-1.5 p-1.5" aria-label={t('home')}>
              <span
                className="text-xl font-bold text-primary-600 dark:text-primary-400"
                aria-hidden="true"
              >
                raqz.pl
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <RiCloseLine className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700/50">
              <div className="space-y-2 py-6">
                {navigation.map(item =>
                  item.type === 'link' || item.type === 'anchor' ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-800 transition-all duration-200 hover:translate-x-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      href={`${langPrefix}/services`}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-800 transition-all duration-200 hover:translate-x-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
              <div className="py-6">
                <Link
                  href={`${langPrefix}/#contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-800 text-left w-full"
                >
                  {t('getStarted')}
                </Link>
              </div>
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
})
