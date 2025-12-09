'use client'

import { useTranslations } from 'next-intl'
import { RiSettings3Line } from 'react-icons/ri'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import CookiePreferencesDialog from './CookiePreferencesDialog'

/**
 * Cookie settings button for footer
 * Allows users to reopen cookie preferences after initial consent
 */
export default function CookieSettingsButton() {
  const t = useTranslations('cookies')
  const {
    hasConsented,
    showPreferences,
    openPreferences,
    closePreferences,
    savePreferences,
    consent,
  } = useCookieConsent()

  // Only show button if user has already consented
  if (!hasConsented) {
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={openPreferences}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
        aria-label={t('footer.buttonAriaLabel')}
      >
        <RiSettings3Line className="h-4 w-4" aria-hidden="true" />
        <span>{t('footer.buttonText')}</span>
      </button>

      <CookiePreferencesDialog
        open={showPreferences}
        onClose={closePreferences}
        onSave={savePreferences}
        currentConsent={consent}
      />
    </>
  )
}
