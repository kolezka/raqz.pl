/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://raqz.pl'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children // Locale layout wraps this
}
