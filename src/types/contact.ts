export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactFormRequest extends ContactFormData {
  turnstileToken: string
}

export interface ContactFormResponse {
  success: boolean
  error?: string
  details?: unknown
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'
