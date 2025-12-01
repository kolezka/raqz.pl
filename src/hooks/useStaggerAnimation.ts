import { useMemo } from 'react';
import type { StaggerAnimationOptions } from '../types/animations';
import { useReducedMotion } from './useReducedMotion';

/**
 * Hook to create staggered animation delays for multiple elements
 * Useful for animating lists of items with sequential timing
 * @param count - Number of items to animate
 * @param options - Stagger animation options
 * @returns Array of inline style objects with animation delays
 */
export function useStaggerAnimation(
  count: number,
  options: StaggerAnimationOptions = {}
): React.CSSProperties[] {
  const {
    baseDelay = 0,
    staggerDelay = 100,
    duration = 500,
  } = options;

  const prefersReducedMotion = useReducedMotion();

  const styles = useMemo(() => {
    if (prefersReducedMotion) {
      // No delay when user prefers reduced motion
      return Array(count).fill({});
    }

    return Array.from({ length: count }, (_, index) => ({
      animationDelay: `${baseDelay + index * staggerDelay}ms`,
      animationDuration: `${duration}ms`,
    }));
  }, [count, baseDelay, staggerDelay, duration, prefersReducedMotion]);

  return styles;
}
