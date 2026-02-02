'use client'

import { useTransitionRouter } from 'next-view-transitions'
import { Link } from '@/i18n/routing'
import type { ComponentProps, MouseEvent } from 'react'

type I18nLinkProps = ComponentProps<typeof Link>

/**
 * I18nTransitionLink component for next-intl routing with view transitions.
 * Use this for links that require i18n path translation (e.g., /services → /uslugi).
 */
export default function I18nTransitionLink({ onClick, ...props }: I18nLinkProps) {
  const router = useTransitionRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call the original onClick if provided
    onClick?.(e)

    // If the event was prevented, don't navigate
    if (e.defaultPrevented) return

    // Prevent default navigation
    e.preventDefault()

    // Get the href from the anchor element
    const href = e.currentTarget.href

    // Navigate with view transition
    router.push(href)
  }

  return <Link {...props} onClick={handleClick} />
}
