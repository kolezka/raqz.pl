/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'raqz.pl',
  description: 'IT solutions for growing businesses',
  keywords: [
    'IT solutions',
    'software development',
    'web development',
    'mobile development',
    'business software',
    'technology consulting',
    'digital transformation',
    'custom software',
  ],
  authors: [{ name: 'raqz.pl' }],
  creator: 'raqz.pl',
  publisher: 'raqz.pl',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://raqz.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'raqz.pl',
    description: 'IT solutions for growing businesses',
    url: 'https://raqz.pl',
    siteName: 'raqz.pl',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'raqz.pl - IT solutions for growing businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'raqz.pl',
    description: 'IT solutions for growing businesses',
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
    // apple: '/apple-touch-icon.png',
  },
  // manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children // Locale layout wraps this
}
