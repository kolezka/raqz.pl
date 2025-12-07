import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed', // /en/blog -> /blog, /pl/blog -> /pl/blog
  localeDetection: true,
})

export const config = {
  // Match all pathnames except for static files and API routes
  matcher: ['/', '/(pl|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
