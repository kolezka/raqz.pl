'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CookieConsent, CookiePreferences } from '@/types/cookies'
import {
  getCookieConsent,
  setCookieConsent,
  removeCookieConsent,
  isConsentExpired,
  isConsentVersionCurrent,
  createConsent,
} from '@/lib/cookie-storage'

/**
 * Custom hook for managing cookie consent
 * Provides state and methods for cookie banner and preferences dialog
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load consent from cookie on mount
  useEffect(() => {
    const stored = getCookieConsent()

    if (!stored || isConsentExpired(stored) || !isConsentVersionCurrent(stored)) {
      // No consent, expired, or outdated version - show banner
      setShowBanner(true)
      setIsLoading(false)
    } else {
      // Valid consent found
      setConsent(stored)
      setShowBanner(false)
      setIsLoading(false)
    }
  }, [])

  /**
   * Accept all cookie categories
   */
  const acceptAll = useCallback(() => {
    const newConsent = createConsent(true, true)
    setCookieConsent(newConsent)
    setConsent(newConsent)
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  /**
   * Reject all non-essential cookies
   */
  const rejectAll = useCallback(() => {
    const newConsent = createConsent(false, false)
    setCookieConsent(newConsent)
    setConsent(newConsent)
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  /**
   * Save custom cookie preferences
   */
  const savePreferences = useCallback((preferences: CookiePreferences) => {
    const newConsent = createConsent(preferences.analytics, preferences.marketing)
    setCookieConsent(newConsent)
    setConsent(newConsent)
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  /**
   * Open preferences dialog
   */
  const openPreferences = useCallback(() => {
    setShowPreferences(true)
  }, [])

  /**
   * Close preferences dialog
   */
  const closePreferences = useCallback(() => {
    setShowPreferences(false)
  }, [])

  /**
   * Reset consent (for testing or user request)
   */
  const resetConsent = useCallback(() => {
    removeCookieConsent()
    setConsent(null)
    setShowBanner(true)
    setShowPreferences(false)
  }, [])

  const hasConsented = consent !== null
  const isExpired = consent ? isConsentExpired(consent) : true

  return {
    consent,
    hasConsented,
    isConsentExpired: isExpired,
    showBanner,
    showPreferences,
    isLoading,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closePreferences,
    resetConsent,
  }
}
