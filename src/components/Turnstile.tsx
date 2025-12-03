import { Turnstile as CloudflareTurnstile } from '@marsidev/react-turnstile'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

interface TurnstileProps {
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

export default memo(function Turnstile({ onVerify, onError, onExpire }: TurnstileProps) {
  const { i18n } = useTranslation()
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  if (!siteKey) {
    console.error('Turnstile site key is not configured')
    return null
  }

  return (
    <div className="flex justify-center my-4">
      <CloudflareTurnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme: 'light',
          size: 'normal',
          language: i18n.language === 'pl' ? 'pl' : 'en',
        }}
      />
    </div>
  )
})
