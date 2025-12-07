import { useRef, useEffect, useState } from 'react'
import type { RefObject } from 'react'
import type { AnimationVariant, ScrollAnimationOptions } from '../types/animations'
import { useReducedMotion } from './useReducedMotion'

interface UseScrollAnimationReturn<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>
  isVisible: boolean
  className: string
}

/**
 * Hook to animate elements when they scroll into view using Intersection Observer
 * @param animation - The animation variant to apply
 * @param options - Configuration options for the animation
 * @returns Object containing ref to attach to element, visibility state, and className
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  animation: AnimationVariant,
  options: ScrollAnimationOptions = {}
): UseScrollAnimationReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    delay = 0,
    disabled = false,
  } = options

  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // Initialize as visible if disabled or reduced motion is preferred
    return (
      disabled ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    )
  })
  const [hasAnimated, setHasAnimated] = useState<boolean>(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = elementRef.current

    // Skip if disabled, no element, or user prefers reduced motion
    if (disabled || !element || prefersReducedMotion) {
      setIsVisible(prev => (prev ? prev : true))
      return
    }

    // Skip if already animated and triggerOnce is true
    if (hasAnimated && triggerOnce) {
      return
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(prev => (prev ? prev : true))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const showElement = () => {
              setIsVisible(true)
              setHasAnimated(true)
            }

            // Add delay before showing
            if (delay > 0) {
              setTimeout(showElement, delay)
            } else {
              showElement()
            }

            // Unobserve after animation if triggerOnce is true
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, disabled, prefersReducedMotion, delay, hasAnimated])

  // Build className based on visibility and animation variant
  const className = prefersReducedMotion
    ? 'opacity-100'
    : `${isVisible ? `animate-${animation} opacity-100` : 'opacity-0'}`

  return {
    ref: elementRef,
    isVisible,
    className,
  }
}
