/* eslint-disable react-refresh/only-export-components */
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WebVitalsMonitor from '@/components/WebVitalsMonitor'
import { ViewTransitions } from 'next-view-transitions'
import CookieBanner from '@/components/CookieBanner'
import { ThemeProvider } from '@/components/ThemeProvider'
import SchemaScript from '@/components/SchemaScript'
import Script from 'next/script'
import type { Metadata } from 'next'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  const baseUrl = 'https://raqz.pl'
  // localePrefix: 'as-needed' means English (default) has no prefix, Polish has /pl
  const localePath = locale === 'en' ? '/' : '/pl'

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'raqz.pl' }],
    creator: 'raqz.pl',
    publisher: 'raqz.pl',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: localePath,
      languages: {
        en: '/',
        pl: '/pl',
        'x-default': '/',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}${localePath}`,
      siteName: 'raqz.pl',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      alternateLocale: locale === 'en' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/ico.svg',
    },
    verification: {
      google: 'TwZIiairwytqGYjXeOwwTqgszuUMimFXjD4vLD0V1o0',
      other: {
        me: ['mariusz@raqz.pl', 'raqz.pl'],
      },
    },
    other: {
      'view-transition': 'same-origin',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'meta' })

  return (
    <ViewTransitions>
      <html lang={locale} suppressHydrationWarning>
        <head>
          <SchemaScript locale={locale} name={t('title')} description={t('description')} />
        </head>
        <body className="bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 ">
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <WebVitalsMonitor />
              <CookieBanner />
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
          {/* Google Analytics - Loads immediately for all users.
              User consent is recorded for transparency and future tracking additions. */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-CXYH9FJED4"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CXYH9FJED4');
              gtag('event', 'conversion_event_page_view', {
                page_title: '${t('title')}',
                page_location: window.location.href,
                page_path: window.location.pathname,
                page_locale: '${locale}',
              });
            `}
          </Script>

          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
