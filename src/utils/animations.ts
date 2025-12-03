import type { AnimationVariant, AnimationConfig } from '../types/animations'

/**
 * Animation duration constants (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 400,
  SLOW: 600,
  EXTRA_SLOW: 800,
} as const

/**
 * Animation delay constants (in milliseconds)
 */
export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 100,
  MEDIUM: 200,
  LONG: 300,
} as const

/**
 * Stagger delay constants (in milliseconds)
 */
export const STAGGER_DELAY = {
  TIGHT: 50,
  NORMAL: 100,
  RELAXED: 150,
  LOOSE: 200,
} as const

/**
 * Animation easing functions
 */
export const ANIMATION_EASING = {
  EASE_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.6, 1)',
  LINEAR: 'linear',
} as const

/**
 * Default animation configurations for each variant
 */
export const ANIMATION_CONFIGS: Record<AnimationVariant, AnimationConfig> = {
  'fade-up': {
    variant: 'fade-up',
    duration: ANIMATION_DURATION.NORMAL,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'fade-down': {
    variant: 'fade-down',
    duration: ANIMATION_DURATION.NORMAL,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'fade-left': {
    variant: 'fade-left',
    duration: ANIMATION_DURATION.NORMAL,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'fade-right': {
    variant: 'fade-right',
    duration: ANIMATION_DURATION.NORMAL,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'zoom-in': {
    variant: 'zoom-in',
    duration: ANIMATION_DURATION.FAST,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'zoom-out': {
    variant: 'zoom-out',
    duration: ANIMATION_DURATION.FAST,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'scale-in': {
    variant: 'scale-in',
    duration: ANIMATION_DURATION.FAST,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'slide-up': {
    variant: 'slide-up',
    duration: ANIMATION_DURATION.NORMAL,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
  'flip-up': {
    variant: 'flip-up',
    duration: ANIMATION_DURATION.SLOW,
    delay: ANIMATION_DELAY.NONE,
    easing: ANIMATION_EASING.EASE_OUT,
  },
}

/**
 * Get animation class name from variant
 */
export function getAnimationClassName(variant: AnimationVariant): string {
  return `animate-${variant}`
}

/**
 * Combine multiple class names, filtering out falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
