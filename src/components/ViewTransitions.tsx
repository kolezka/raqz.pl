'use client'

import type { ReactNode } from 'react'

interface ViewTransitionsProps {
  children: ReactNode
}

/**
 * ViewTransitions component that wraps content to enable smooth page transitions.
 * Uses Next.js 15's experimental.viewTransition feature with View Transitions API.
 *
 * Note: React 19's native ViewTransition component is only available in canary/experimental.
 * This component relies on Next.js's built-in support configured in next.config.mjs.
 */
export default function ViewTransitions({ children }: ViewTransitionsProps) {
  return <>{children}</>
}
