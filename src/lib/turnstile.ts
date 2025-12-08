/**
 * Verifies a Cloudflare Turnstile token with the Turnstile API
 * @param token - The Turnstile token from the client
 * @param ip - The client's IP address
 * @returns Promise<boolean> - True if verification succeeds, false otherwise
 */
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured')
    return false
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    })

    if (!response.ok) {
      console.error('Turnstile API returned error status:', response.status)
      return false
    }

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification failed:', error)
    return false
  }
}
