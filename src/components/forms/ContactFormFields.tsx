'use client'

import { useTranslations } from 'next-intl'
import Turnstile from '../Turnstile'
import type { ContactFormData } from '@/types/contact'

interface ContactFormFieldsProps {
  formData: ContactFormData
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onTurnstileVerify: (token: string) => void
  onTurnstileError?: () => void
  onTurnstileExpire?: () => void
  isSubmitting?: boolean
  errorMessage?: string | null
}

/**
 * Reusable contact form fields component
 * Shared between ContactFormDialog and page-based ContactForm
 */
export function ContactFormFields({
  formData,
  onChange,
  onTurnstileVerify,
  onTurnstileError,
  onTurnstileExpire,
  isSubmitting = false,
  errorMessage = null,
}: ContactFormFieldsProps) {
  const t = useTranslations('contact')

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
            {t('name')}
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={onChange}
              autoComplete="name"
              required
              disabled={isSubmitting}
              aria-required="true"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
            {t('email')}
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={onChange}
              autoComplete="email"
              required
              disabled={isSubmitting}
              aria-required="true"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
            {t('phone')}
          </label>
          <div className="mt-2.5">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone || ''}
              onChange={onChange}
              autoComplete="tel"
              disabled={isSubmitting}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
            {t('message')}
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={onChange}
              required
              disabled={isSubmitting}
              aria-required="true"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 rounded-md bg-red-50 p-4" role="alert">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Turnstile CAPTCHA */}
      <div className="mt-6">
        <Turnstile
          onVerify={onTurnstileVerify}
          onError={onTurnstileError}
          onExpire={onTurnstileExpire}
        />
      </div>
    </>
  )
}
