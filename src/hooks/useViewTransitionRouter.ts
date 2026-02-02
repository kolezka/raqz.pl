'use client'

import { useTransitionRouter } from 'next-view-transitions'

/**
 * Hook for programmatic navigation with view transitions.
 * Use this instead of next/navigation's useRouter for animated transitions.
 *
 * @example
 * const router = useViewTransitionRouter()
 * router.push('/blog')
 */
export function useViewTransitionRouter() {
  return useTransitionRouter()
}
