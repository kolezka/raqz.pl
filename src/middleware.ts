import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import servicesData from '@/data/services.json'

// Create the i18n middleware with routing configuration
const intlMiddleware = createMiddleware(routing)

// Build a map of old English slugs to new Polish slugs for quick lookup
const serviceSlugMap = new Map<string, string>()
servicesData.serviceCategories.forEach(category => {
  category.services.forEach(service => {
    serviceSlugMap.set(service.slug.en, service.slug.pl)
  })
})

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle redirects for old Polish service URLs BEFORE intl middleware
  // Match: /pl/services/<english-slug> -> /pl/uslugi/<polish-slug>
  const plServicesDetailMatch = pathname.match(/^\/pl\/services\/([^/]+)\/?$/)
  if (plServicesDetailMatch) {
    const slug = plServicesDetailMatch[1]
    const polishSlug = serviceSlugMap.get(slug)

    // If the slug is an English slug, redirect to Polish URL
    if (polishSlug && slug !== polishSlug) {
      const newUrl = request.nextUrl.clone()
      newUrl.pathname = `/pl/uslugi/${polishSlug}`
      return NextResponse.redirect(newUrl, { status: 301 })
    }
  }

  // Handle redirect for /pl/services list page -> /pl/uslugi
  if (pathname.match(/^\/pl\/services\/?$/)) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = '/pl/uslugi'
    return NextResponse.redirect(newUrl, { status: 301 })
  }

  // Continue with i18n middleware
  const response = intlMiddleware(request)
  return response
}

export const config = {
  // Match all pathnames except for static files, API routes, and Next.js internals
  matcher: ['/', '/(pl|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
