import { CookieConsent, CONSENT_VERSION, CONSENT_EXPIRY_DAYS } from '@/types/cookies'

const COOKIE_NAME = 'cookie_consent'

/**
 * Serialize consent object to JSON string for cookie storage
 */
function serializeConsent(consent: CookieConsent): string {
  return JSON.stringify(consent)
}

/**
 * Deserialize cookie string to consent object
 */
function deserializeConsent(value: string): CookieConsent | null {
  try {
    const parsed = JSON.parse(value)
    // Validate structure
    if (
      typeof parsed.version === 'string' &&
      typeof parsed.timestamp === 'string' &&
      typeof parsed.essential === 'boolean' &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.marketing === 'boolean' &&
      typeof parsed.expiresAt === 'string'
    ) {
      return parsed as CookieConsent
    }
    return null
  } catch {
    return null
  }
}

/**
 * Get cookie consent from browser cookies
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split('; ')
  const consentCookie = cookies.find(c => c.startsWith(`${COOKIE_NAME}=`))

  if (!consentCookie) return null

  const value = consentCookie.substring(COOKIE_NAME.length + 1)
  return deserializeConsent(decodeURIComponent(value))
}

/**
 * Set cookie consent in browser cookies
 */
export function setCookieConsent(consent: CookieConsent): void {
  if (typeof document === 'undefined') return

  const maxAge = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 // Convert to seconds
  const serialized = serializeConsent(consent)
  const encoded = encodeURIComponent(serialized)

  // Determine secure flag based on protocol
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const secureFlag = isSecure ? '; Secure' : ''

  document.cookie = `${COOKIE_NAME}=${encoded}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secureFlag}`
}

/**
 * Remove cookie consent (for reset/testing)
 */
export function removeCookieConsent(): void {
  if (typeof document === 'undefined') return

  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`
}

/**
 * Check if consent has expired
 */
export function isConsentExpired(consent: CookieConsent | null): boolean {
  if (!consent) return true

  try {
    const expiresAt = new Date(consent.expiresAt)
    const now = new Date()
    return now >= expiresAt
  } catch {
    return true
  }
}

/**
 * Check if consent version is current
 */
export function isConsentVersionCurrent(consent: CookieConsent | null): boolean {
  return consent?.version === CONSENT_VERSION
}

/**
 * Create new consent object with current timestamp and expiration
 */
export function createConsent(analytics: boolean, marketing: boolean): CookieConsent {
  const now = new Date()
  const expiresAt = new Date(now)
  expiresAt.setDate(expiresAt.getDate() + CONSENT_EXPIRY_DAYS)

  return {
    version: CONSENT_VERSION,
    timestamp: now.toISOString(),
    essential: true, // Always true
    analytics,
    marketing,
    expiresAt: expiresAt.toISOString(),
  }
}
