'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { RiToolsLine } from 'react-icons/ri'
import { FEATURES } from '@/config/features'

interface MaintenanceOverlayProps {
  /**
   * Optional custom title - overrides i18n default
   */
  title?: string

  /**
   * Optional custom description - overrides i18n default
   */
  description?: string

  /**
   * Optional custom subtitle - overrides i18n default
   */
  subtitle?: string
}

/**
 * MaintenanceOverlay Component
 *
 * Displays a full-page blocking overlay when MAINTENANCE_MODE feature flag is enabled.
 * Shows a professional maintenance message with support for both English and Polish.
 *
 * @example
 * // Default usage (uses i18n messages)
 * <MaintenanceOverlay />
 *
 * @example
 * // Custom messages
 * <MaintenanceOverlay
 *   title="Scheduled Maintenance"
 *   description="We're upgrading our systems. Expected downtime: 2 hours."
 *   subtitle="We'll be back at 3:00 PM EST"
 * />
 */
export default function MaintenanceOverlay(props: MaintenanceOverlayProps) {
  const t = useTranslations('maintenance')

  // Only render if maintenance mode is enabled
  if (!FEATURES.MAINTENANCE_MODE) return null

  // Lock body scroll when overlay is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const displayTitle = props.title || t('title')
  const displayDescription = props.description || t('description')
  const displaySubtitle = props.subtitle || t('subtitle')

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black/95 p-4"
      role="alertdialog"
      aria-label="Site maintenance notice"
      aria-live="assertive"
    >
      <div className="text-center max-w-md animate-fade-up">
        <RiToolsLine className="h-20 w-20 text-primary-400 mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-white mb-4">{displayTitle}</h1>
        <p className="text-gray-300 text-lg mb-2">{displayDescription}</p>
        <p className="text-gray-400 text-sm">{displaySubtitle}</p>
      </div>
    </div>
  )
}
