import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed', // /en/blog -> /blog, /pl/blog -> /pl/blog
  localeDetection: true,
})

export const config = {
  // Match all pathnames except for static files, API routes, and Next.js internals
  matcher: ['/', '/(pl|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'  ],
}
