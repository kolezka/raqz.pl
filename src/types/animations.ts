export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'scale-in'
  | 'slide-up'
  | 'flip-up';

export type AnimationEasing =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'cubic-bezier(0.4, 0, 0.2, 1)' // ease-out
  | 'cubic-bezier(0.4, 0, 1, 1)'; // ease-in

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  easing?: AnimationEasing;
  disabled?: boolean;
}

export interface StaggerAnimationOptions {
  baseDelay?: number;
  staggerDelay?: number;
  duration?: number;
}

export interface AnimationConfig {
  variant: AnimationVariant;
  duration: number;
  delay: number;
  easing: string;
}
