'use client'

import { Link } from 'next-view-transitions'
import type { ComponentProps } from 'react'

type TransitionLinkProps = ComponentProps<typeof Link>

/**
 * TransitionLink component for enabling view transitions on navigation.
 * Use this instead of next/link for animated page transitions.
 */
export default function TransitionLink(props: TransitionLinkProps) {
  return <Link {...props} />
}
