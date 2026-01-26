import { useTranslations } from 'next-intl'
import Link from 'next/link'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function NotFound() {
  const t = useTranslations('errors.notFound')

  return (
    <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground />
      </div>

      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Large Text */}
        <div className="mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-9xl sm:text-[12rem] font-bold text-primary-500/20 leading-none select-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-6">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('heading')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t('goHome')}
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t('viewServices')}
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="inline-block p-4 rounded-full bg-primary-100/50 dark:bg-primary-900/30 backdrop-blur-sm">
            <svg
              className="w-16 h-16 text-primary-500 animate-bounce-gentle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
