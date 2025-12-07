/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'raqz.pl',
  description: 'IT solutions for growing businesses',
  icons: {
    icon: '/ico.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children // Locale layout wraps this
}
