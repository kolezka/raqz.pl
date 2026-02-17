import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      pl: '/uslugi',
    },
    '/services/[serviceSlug]': {
      en: '/services/[serviceSlug]',
      pl: '/uslugi/[serviceSlug]',
    },
    '/developers': {
      en: '/developers',
      pl: '/specjalisci',
    },
    '/developers/[developerSlug]': {
      en: '/developers/[developerSlug]',
      pl: '/specjalisci/[developerSlug]',
    },
    '/privacy': '/privacy',
  },
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
