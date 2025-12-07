/* eslint-disable react-refresh/only-export-components */
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WebVitalsMonitor from '@/components/WebVitalsMonitor'
import ViewTransitions from '@/components/ViewTransitions'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CXYH9FJED4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CXYH9FJED4');
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <WebVitalsMonitor />
          <ViewTransitions>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ViewTransitions>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
