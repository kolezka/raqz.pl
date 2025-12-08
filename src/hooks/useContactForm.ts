import { useState, useCallback } from 'react'
import type { ContactFormData, SubmitStatus, ContactFormResponse } from '@/types/contact'

interface UseContactFormOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface UseContactFormReturn {
  formData: ContactFormData
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>
  turnstileToken: string | null
  isSubmitting: boolean
  submitStatus: SubmitStatus
  errorMessage: string | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  handleTurnstileVerify: (token: string) => void
  handleTurnstileError: () => void
  handleTurnstileExpire: () => void
  resetForm: () => void
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

/**
 * Custom hook for managing contact form state and submission logic
 * Reusable in both ContactFormDialog and page-based ContactForm
 */
export function useContactForm(options?: UseContactFormOptions): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  /**
   * Handles input field changes
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    },
    []
  )

  /**
   * Handles Turnstile CAPTCHA verification success
   */
  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  /**
   * Handles Turnstile CAPTCHA errors
   */
  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null)
    setErrorMessage('CAPTCHA verification failed. Please try again.')
  }, [])

  /**
   * Handles Turnstile CAPTCHA token expiration
   */
  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null)
  }, [])

  /**
   * Resets the form to its initial state
   */
  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setTurnstileToken(null)
    setIsSubmitting(false)
    setSubmitStatus('idle')
    setErrorMessage(null)
  }, [])

  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Validate Turnstile token
      if (!turnstileToken) {
        setErrorMessage('Please complete the security verification before submitting.')
        return
      }

      setIsSubmitting(true)
      setSubmitStatus('submitting')
      setErrorMessage(null)

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            turnstileToken,
          }),
        })

        const data: ContactFormResponse = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to send message')
        }

        // Success
        setSubmitStatus('success')
        setErrorMessage(null)
        options?.onSuccess?.()

        // Reset form after a short delay
        setTimeout(() => {
          resetForm()
        }, 3000)
      } catch (error) {
        // Error
        setSubmitStatus('error')
        const message = error instanceof Error ? error.message : 'Failed to send message'
        setErrorMessage(message)
        options?.onError?.(message)

        // Reset Turnstile token to force re-verification
        setTurnstileToken(null)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, turnstileToken, options, resetForm]
  )

  return {
    formData,
    setFormData,
    turnstileToken,
    isSubmitting,
    submitStatus,
    errorMessage,
    handleChange,
    handleSubmit,
    handleTurnstileVerify,
    handleTurnstileError,
    handleTurnstileExpire,
    resetForm,
  }
}
