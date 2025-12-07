import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

/**
 * Web Vitals thresholds (in milliseconds)
 * Based on Google's recommendations
 */
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  INP: { good: 200, needsImprovement: 500 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
} as const

/**
 * Get rating based on threshold
 */
function getRating(
  name: keyof typeof THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

/**
 * Format metric value for display
 */
function formatValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3)
  }
  return `${Math.round(value)}ms`
}

/**
 * Log metric to console in development
 */
function logMetric(metric: Metric) {
  const rating = getRating(metric.name as keyof typeof THRESHOLDS, metric.value)
  const formattedValue = formatValue(metric.name, metric.value)

  const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'
  const color =
    rating === 'good'
      ? 'color: green'
      : rating === 'needs-improvement'
        ? 'color: orange'
        : 'color: red'

  console.log(
    `%c${emoji} ${metric.name}: ${formattedValue} (${rating})`,
    `${color}; font-weight: bold; font-size: 12px;`
  )
}

/**
 * Send metric to analytics service
 */
function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics 4 if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }

  // Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: getRating(metric.name as keyof typeof THRESHOLDS, metric.value),
      id: metric.id,
      navigationType: metric.navigationType,
      url: window.location.href,
      timestamp: Date.now(),
    })

    // Use sendBeacon if available for better reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body)
    } else {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(console.error)
    }
  }
}

/**
 * Report Web Vitals metrics
 * Call this once in your app initialization
 */
export function reportWebVitals() {
  const handleMetric = (metric: Metric) => {
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      logMetric(metric)
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      sendToAnalytics(metric)
    }
  }

  // Measure Core Web Vitals
  onCLS(handleMetric)
  onINP(handleMetric)
  onLCP(handleMetric)

  // Additional metrics
  onFCP(handleMetric)
  onTTFB(handleMetric)
}

/**
 * Get current Web Vitals summary
 * Useful for displaying metrics in a dashboard
 */
export async function getWebVitalsSummary() {
  const metrics: Record<string, { value: number; rating: string }> = {}

  const handleMetric = (metric: Metric) => {
    metrics[metric.name] = {
      value: metric.value,
      rating: getRating(metric.name as keyof typeof THRESHOLDS, metric.value),
    }
  }

  onCLS(handleMetric)
  onINP(handleMetric)
  onLCP(handleMetric)
  onFCP(handleMetric)
  onTTFB(handleMetric)

  // Wait a bit for metrics to be collected
  await new Promise(resolve => setTimeout(resolve, 100))

  return metrics
}
