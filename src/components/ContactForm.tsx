'use client'

import Turnstile from './Turnstile'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { RiLoader4Line, RiSendPlaneLine, RiCheckboxCircleLine } from 'react-icons/ri'
import type { ContactFormResponse } from '@/types/contact'

export const ContactForm = () => {
  const t = useTranslations()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const formAnimation = useScrollAnimation<HTMLFormElement>('fade-up', {
    delay: 100,
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!turnstileToken) {
        setErrorMessage(t('contact.captchaRequired'))
        return
      }

      setIsSubmitting(true)
      setSubmitStatus('idle')
      setErrorMessage(null)

      try {
        const response = await fetch('/api/contact/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.company, // Map company to phone field for API
            message: formData.message,
            turnstileToken,
          }),
        })

        // Check if response is JSON
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(
            `Server error: Expected JSON response but got ${contentType}. Status: ${response.status}`
          )
        }

        const data: ContactFormResponse = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to send message')
        }

        // Success
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
        setTurnstileToken(null)
        setErrorMessage(null)
      } catch (error) {
        // Error
        setSubmitStatus('error')
        const message = error instanceof Error ? error.message : 'Failed to send message'
        setErrorMessage(message)
        setTurnstileToken(null)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, turnstileToken, t]
  )

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null)
    setErrorMessage('CAPTCHA verification failed. Please try again.')
  }, [])

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null)
  }, [])

  return (
    <form
      ref={formAnimation.ref}
      onSubmit={handleSubmit}
      className={`mx-auto mt-16 max-w-xl sm:mt-20 ${formAnimation.className}`}
    >
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 rounded-md bg-green-50 dark:bg-green-900/30 p-4">
          <div className="flex">
            <div className="shrink-0">
              <RiCheckboxCircleLine className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                {t('contact.dialog.success.title')}
              </h3>
              <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                {t('contact.dialog.success.description')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/30 p-4">
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
              <p className="text-sm font-medium text-red-800 dark:text-red-300">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            {t('contact.name')}
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
              disabled={isSubmitting}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white bg-white dark:bg-dark-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            {t('contact.email')}
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              disabled={isSubmitting}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white bg-white dark:bg-dark-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            Company
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              autoComplete="organization"
              disabled={isSubmitting}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white bg-white dark:bg-dark-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            {t('contact.message')}
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white bg-white dark:bg-dark-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button
          type="submit"
          disabled={!turnstileToken || isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary-600 dark:bg-primary-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 dark:hover:bg-primary-400 hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <RiLoader4Line className="animate-spin mr-2 h-5 w-5" aria-hidden="true" />
              {t('contact.sending')}
            </>
          ) : (
            <>
              <RiSendPlaneLine className="mr-2 h-5 w-5" aria-hidden="true" />
              {t('contact.send')}
            </>
          )}
        </button>
      </div>

      <div>
        <Turnstile
          onVerify={handleTurnstileVerify}
          onError={handleTurnstileError}
          onExpire={handleTurnstileExpire}
        />
      </div>
    </form>
  )
}
