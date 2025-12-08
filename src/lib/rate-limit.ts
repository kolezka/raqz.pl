/**
 * Simple in-memory rate limiter
 * For production, consider using Redis (Upstash/Vercel KV) for distributed rate limiting
 */

interface RateLimitRecord {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

export interface RateLimitResult {
  success: boolean
  remaining: number
}

/**
 * Rate limits requests based on an identifier (typically IP address)
 * @param identifier - Unique identifier (e.g., IP address)
 * @param limit - Maximum number of requests allowed (default: 5)
 * @param windowMs - Time window in milliseconds (default: 1 hour)
 * @returns RateLimitResult - Success status and remaining requests
 */
export async function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): Promise<RateLimitResult> {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  // If no record exists or the window has expired, create a new one
  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { success: true, remaining: limit - 1 }
  }

  // If limit exceeded, reject the request
  if (record.count >= limit) {
    return { success: false, remaining: 0 }
  }

  // Increment the count
  record.count++
  return { success: true, remaining: limit - record.count }
}

/**
 * Clears expired rate limit records
 * Call this periodically to prevent memory leaks
 */
export function cleanupExpiredRecords(): void {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}
