import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyTurnstile } from '@/lib/turnstile'
import { rateLimit } from '@/lib/rate-limit'
import { sendContactEmail } from '@/lib/email'
import type { ContactFormResponse } from '@/types/contact'

// Zod schema for validating the request body
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address').max(255, 'Email is too long'),
  phone: z.string().max(100, 'Phone/Company is too long').optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(5000, 'Message is too long'),
  turnstileToken: z.string().min(1, 'CAPTCHA verification is required'),
})

/**
 * POST /api/contact
 * Handles contact form submissions
 */
export async function POST(request: NextRequest): Promise<NextResponse<ContactFormResponse>> {
  try {
    // 1. Extract IP address for rate limiting and Turnstile verification
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    // 2. Apply rate limiting (5 requests per hour per IP)
    const rateLimitResult = await rateLimit(ip)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '3600',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      )
    }

    // 3. Parse and validate request body
    const body = await request.json()
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: validationResult.error.issues,
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      )
    }

    const { name, email, phone, message, turnstileToken } = validationResult.data

    // 4. Verify Turnstile CAPTCHA token
    const isTurnstileValid = await verifyTurnstile(turnstileToken, ip)
    if (!isTurnstileValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'CAPTCHA verification failed. Please try again.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      )
    }

    // 5. Send email via Proton SMTP
    await sendContactEmail({ name, email, phone, message })

    // 6. Return success response
    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  } catch (error) {
    // Log the error for debugging
    console.error('Contact form submission error:', error)

    // Return a user-friendly error message
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again later.',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  }
}
