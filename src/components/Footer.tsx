'use client'

/* eslint-disable react-hooks/refs */
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useMemo } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import CookieSettingsButton from './CookieSettingsButton'
import { FEATURES } from '../config/features'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  const footerAnimation = useScrollAnimation<HTMLDivElement>('fade-up')

  // Get language prefix for URLs
  const langPrefix = useMemo(() => (locale === 'en' ? '' : `/${locale}`), [locale])

  // Get localized services path
  const servicesPath = useMemo(() => (locale === 'pl' ? 'uslugi' : 'services'), [locale])

  // Navigation links for footer
  const quickLinks = useMemo(
    () => [
      { name: t('navigation.home'), href: `${langPrefix}/` },
      { name: t('navigation.services'), href: `${langPrefix}/${servicesPath}` },
      ...(FEATURES.BLOG_ENABLED
        ? [{ name: t('navigation.blog'), href: `${langPrefix}/blog` }]
        : []),
      ...(FEATURES.CV_ENABLED ? [{ name: t('navigation.cv'), href: `${langPrefix}/cv` }] : []),
      {
        name: t('footer.privacy'),
        href: `${langPrefix}/privacy`,
      },
    ],
    [t, langPrefix, servicesPath]
  )

  // Key services to highlight in footer (localized slugs)
  const serviceLinks = useMemo(
    () => [
      {
        name: t('navigation.servicesDropdown.services.ai-integrations.name'),
        href: `${langPrefix}/${servicesPath}/${locale === 'pl' ? 'integracje-ai' : 'ai-integrations'}`,
      },
      {
        name: t('navigation.servicesDropdown.services.web-development.name'),
        href: `${langPrefix}/${servicesPath}/${locale === 'pl' ? 'tworzenie-stron-www' : 'web-development'}`,
      },
      {
        name: t('navigation.servicesDropdown.services.mobile-development.name'),
        href: `${langPrefix}/${servicesPath}/${locale === 'pl' ? 'aplikacje-mobilne' : 'mobile-development'}`,
      },
      {
        name: t('navigation.servicesDropdown.services.website-chatbots.name'),
        href: `${langPrefix}/${servicesPath}/${locale === 'pl' ? 'chatboty-na-strony' : 'website-chatbots'}`,
      },
    ],
    [t, langPrefix, servicesPath, locale]
  )

  return (
    <footer className="bg-gray-900 dark:bg-dark-950 border-t border-gray-800 dark:border-gray-800">
      <div
        ref={footerAnimation.ref}
        className={`mx-auto max-w-7xl px-6 py-12 lg:px-8 ${footerAnimation.className}`}
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and description */}
          <div className="lg:col-span-1">
            <Link
              href={`${langPrefix}/`}
              className="text-2xl font-bold text-white hover:text-primary-400 transition-colors"
            >
              raqz.pl
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">{t('footer.description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and Social */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:mariusz@raqz.pl"
                className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                mariusz@raqz.pl
              </a>
              <Link
                href={`${langPrefix}/#contact`}
                className="inline-block text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                {t('navigation.contact')} &rarr;
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/kolezka"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/mariusz-rakus/"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} raqz.pl. {t('footer.allRightsReserved')}
              </p>
              <span className="hidden sm:inline text-gray-600">|</span>
              <p className="text-sm text-gray-500">{t('footer.madeIn')}</p>
            </div>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
