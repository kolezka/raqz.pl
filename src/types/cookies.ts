/**
 * Cookie consent version for tracking schema changes
 */
export const CONSENT_VERSION = '1.0'

/**
 * Cookie consent expiration in days
 */
export const CONSENT_EXPIRY_DAYS = 365

/**
 * Individual cookie category
 */
export type CookieCategory = 'essential' | 'analytics' | 'marketing'

/**
 * Cookie consent preferences
 */
export interface CookieConsent {
  version: string
  timestamp: string // ISO 8601 date string
  essential: boolean // Always true
  analytics: boolean
  marketing: boolean
  expiresAt: string // ISO 8601 date string
}

/**
 * Cookie preferences (subset for user input)
 */
export interface CookiePreferences {
  analytics: boolean
  marketing: boolean
}

/**
 * Cookie consent context value
 */
export interface CookieConsentContext {
  consent: CookieConsent | null
  hasConsented: boolean
  isConsentExpired: boolean
  showBanner: boolean
  showPreferences: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (preferences: CookiePreferences) => void
  openPreferences: () => void
  closePreferences: () => void
  resetConsent: () => void // For testing/user request
}

/**
 * Cookie category information for UI display
 */
export interface CookieCategoryInfo {
  id: CookieCategory
  required: boolean
  defaultEnabled: boolean
}

/**
 * Available cookie categories
 */
export const COOKIE_CATEGORIES: CookieCategoryInfo[] = [
  { id: 'essential', required: true, defaultEnabled: true },
  { id: 'analytics', required: false, defaultEnabled: true },
  { id: 'marketing', required: false, defaultEnabled: false },
]
