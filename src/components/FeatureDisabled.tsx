'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'

export default function FeatureDisabled() {
  const locale = useLocale()
  const langPrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Feature Unavailable</h1>
        <p className="text-lg text-gray-600 mb-8">This feature is currently not available.</p>
        <Link
          href={`${langPrefix}/`}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
