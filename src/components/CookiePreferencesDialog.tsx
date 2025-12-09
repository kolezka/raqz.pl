'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { RiCloseLine } from 'react-icons/ri'
import { Link } from '@/i18n/routing'
import type { CookieConsent, CookiePreferences } from '@/types/cookies'
import { COOKIE_CATEGORIES } from '@/types/cookies'

interface CookiePreferencesDialogProps {
  open: boolean
  onClose: () => void
  onSave: (preferences: CookiePreferences) => void
  currentConsent: CookieConsent | null
}

/**
 * Cookie preferences dialog component
 * Allows users to customize their cookie preferences
 */
export default function CookiePreferencesDialog({
  open,
  onClose,
  onSave,
  currentConsent,
}: CookiePreferencesDialogProps) {
  const t = useTranslations('cookies')

  // Initialize preferences from current consent or defaults
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: currentConsent?.analytics ?? true,
    marketing: currentConsent?.marketing ?? false,
  })

  // Update preferences when current consent changes
  useEffect(() => {
    if (currentConsent) {
      setPreferences({
        analytics: currentConsent.analytics,
        marketing: currentConsent.marketing,
      })
    }
  }, [currentConsent])

  const handleSave = () => {
    onSave(preferences)
  }

  const handleAcceptAll = () => {
    onSave({ analytics: true, marketing: true })
  }

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <Dialog className="relative z-50" open={open} onClose={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/25 transition-opacity" aria-hidden="true" />

      {/* Dialog Panel */}
      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <DialogPanel
          transition
          className="w-full max-w-2xl transform overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-xl transition-all duration-200 ease-out data-closed:translate-y-full sm:data-closed:translate-y-0 sm:data-closed:scale-95 sm:data-closed:opacity-0 max-h-[90vh]"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  {t('preferences.title')}
                </DialogTitle>
                <p className="mt-1 text-sm text-gray-500">{t('preferences.subtitle')}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label={t('preferences.close')}
              >
                <RiCloseLine className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            <p className="text-sm text-gray-600">{t('preferences.description')}</p>

            {/* Cookie Categories */}
            <div className="space-y-4">
              {COOKIE_CATEGORIES.map(category => {
                const isChecked =
                  category.id === 'essential'
                    ? true
                    : preferences[category.id as keyof CookiePreferences]

                return (
                  <div
                    key={category.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900">
                          {t(`categories.${category.id}.title`)}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {t(`categories.${category.id}.description`)}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">
                            {t(`categories.${category.id}.items`)}
                          </span>
                        </p>
                      </div>

                      {/* Toggle Switch */}
                      <div className="flex-shrink-0">
                        {category.required ? (
                          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                            {t('categories.essential.alwaysActive')}
                          </span>
                        ) : (
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isChecked}
                            aria-label={`Toggle ${category.id} cookies`}
                            onClick={() => {
                              setPreferences(prev => ({
                                ...prev,
                                [category.id]: !prev[category.id as keyof CookiePreferences],
                              }))
                            }}
                            className={`${
                              isChecked ? 'bg-primary-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`}
                          >
                            <span
                              aria-hidden="true"
                              className={`${
                                isChecked ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Privacy Policy Link */}
            <div className="text-center">
              <Link
                href="/privacy"
                className="text-sm text-primary-600 hover:text-primary-500 underline underline-offset-4"
              >
                {t('preferences.viewPrivacy')}
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex justify-center items-center rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t('preferences.savePreferences')}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex justify-center items-center rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
              >
                {t('preferences.acceptAll')}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
