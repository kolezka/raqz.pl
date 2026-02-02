'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { RiShieldCheckLine } from 'react-icons/ri'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import CookiePreferencesDialog from './CookiePreferencesDialog'

/**
 * Cookie banner component
 * Displays a bottom bar with cookie consent options
 */
export default function CookieBanner() {
  const t = useTranslations('cookies')
  const {
    showBanner,
    showPreferences,
    acceptAll,
    openPreferences,
    closePreferences,
    savePreferences,
    consent,
  } = useCookieConsent()

  const [isVisible, setIsVisible] = useState(false)

  // Delay banner appearance for smooth animation
  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [showBanner])

  if (!showBanner) {
    return (
      <>
        {showPreferences && (
          <CookiePreferencesDialog
            open={showPreferences}
            onClose={closePreferences}
            onSave={savePreferences}
            currentConsent={consent}
          />
        )}
      </>
    )
  }

  return (
    <>
      {/* Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[9999] transform transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="region"
        aria-label="Cookie consent banner"
      >
        <div className="bg-gray-50/90 dark:bg-dark-800/95 backdrop-blur-xs border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Icon and text */}
              <div className="flex items-start gap-3 sm:items-center flex-1">
                <RiShieldCheckLine
                  className="h-6 w-6 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5 sm:mt-0 self-start"
                  aria-hidden="true"
                />
                <div className="flex-1">
                  {/* <h2 className="text-sm font-semibold text-gray-900">
                    {t('banner.title')}
                  </h2> */}
                  <p className="text-xs text-gray-600 dark:text-gray-300 max-w-2xl">
                    {t('banner.description')}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3 sm:shrink-0">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="px-4 cursor-pointer text-xs text-primary-900 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors underline-offset-4 order-3 sm:order-1"
                >
                  {t('banner.customize')}
                </button>
                {/* <button
                  type="button"
                  onClick={rejectAll}
                  className="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors order-2 sm:order-2"
                >
                  {t('banner.rejectAll')}
                </button> */}
                <button
                  type="button"
                  onClick={acceptAll}
                  className="cursor-pointer rounded-md px-4 py-2 text-xs  text-white bg-primary-600 dark:bg-primary-500 hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors shadow-sm order-1 sm:order-3"
                >
                  {t('banner.acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Dialog */}
      <CookiePreferencesDialog
        open={showPreferences}
        onClose={closePreferences}
        onSave={savePreferences}
        currentConsent={consent}
      />
    </>
  )
}
