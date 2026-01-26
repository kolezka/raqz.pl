'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { RiCloseLine, RiSendPlaneLine, RiLoader4Line, RiCheckboxCircleLine } from 'react-icons/ri'
import { useContactForm } from '@/hooks/useContactForm'
import { ContactFormFields } from './forms/ContactFormFields'
import { useEffect } from 'react'

interface ContactFormDialogProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

/**
 * Contact form dialog component
 * Reusable modal that can be triggered from anywhere in the application
 */
export default function ContactFormDialog({ open, onClose, onSuccess }: ContactFormDialogProps) {
  const t = useTranslations('contact')

  const {
    formData,
    turnstileToken,
    isSubmitting,
    submitStatus,
    errorMessage,
    handleChange,
    handleSubmit,
    handleTurnstileVerify,
    handleTurnstileError,
    handleTurnstileExpire,
  } = useContactForm({
    onSuccess: () => {
      onSuccess?.()
      // Auto-close dialog after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)
    },
  })

  // Prevent closing dialog during submission
  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  // Reset scroll position when dialog opens
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
    <Dialog className="relative z-50" open={open} onClose={handleClose}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/25 dark:bg-black/50 transition-opacity"
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <DialogPanel
          transition
          className="w-full max-w-md transform overflow-y-auto bg-white dark:bg-dark-900 rounded-t-2xl sm:rounded-2xl shadow-xl transition-all duration-200 ease-out data-closed:translate-y-full sm:data-closed:translate-y-0 sm:data-closed:scale-95 sm:data-closed:opacity-0 max-h-[90vh]"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('dialog.title')}
                </DialogTitle>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {t('dialog.subtitle')}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="rounded-md p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={t('dialog.close')}
              >
                <RiCloseLine className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 py-6">
            {submitStatus === 'success' ? (
              // Success State
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-3">
                    <RiCheckboxCircleLine
                      className="h-8 w-8 text-green-600 dark:text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  {t('dialog.success.title')}
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {t('dialog.success.description')}
                </p>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <ContactFormFields
                  formData={formData}
                  onChange={handleChange}
                  onTurnstileVerify={handleTurnstileVerify}
                  onTurnstileError={handleTurnstileError}
                  onTurnstileExpire={handleTurnstileExpire}
                  isSubmitting={isSubmitting}
                  errorMessage={errorMessage}
                />

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={!turnstileToken || isSubmitting}
                    className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <RiLoader4Line className="animate-spin mr-2 h-5 w-5" aria-hidden="true" />
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        <RiSendPlaneLine className="mr-2 h-5 w-5" aria-hidden="true" />
                        {t('send')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
