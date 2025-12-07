'use client'

import { useEffect, useState } from 'react'
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'

interface VitalsData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  id: string
}

const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  INP: { good: 200, needsImprovement: 500 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
} as const

function getRating(
  name: keyof typeof THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

function formatValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3)
  }
  return `${Math.round(value)}ms`
}

/**
 * WebVitalsMonitor - Development-only component for visualizing Web Vitals
 * Only renders in development mode and can be toggled with keyboard shortcut
 */
export default function WebVitalsMonitor() {
  const [vitals, setVitals] = useState<VitalsData[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'production') return

    const handleMetric = (metric: Metric) => {
      setVitals(prev => {
        const existing = prev.findIndex(v => v.name === metric.name)
        const newVital: VitalsData = {
          name: metric.name,
          value: metric.value,
          rating: getRating(metric.name as keyof typeof THRESHOLDS, metric.value),
          id: metric.id,
        }

        if (existing >= 0) {
          const updated = [...prev]
          updated[existing] = newVital
          return updated
        }
        return [...prev, newVital]
      })
    }

    onCLS(handleMetric)
    onINP(handleMetric)
    onLCP(handleMetric)
    onFCP(handleMetric)
    onTTFB(handleMetric)

    // Keyboard shortcut to toggle visibility (Ctrl+Shift+V)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV === 'production') return null

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-mono hover:bg-gray-800 transition-colors"
        title="Show Web Vitals (Ctrl+Shift+V)"
        type="button"
      >
        📊 Vitals
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border-2 border-gray-200 rounded-lg shadow-2xl p-4 w-80 font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        <h3 className="font-bold text-sm text-gray-900">Web Vitals Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
          title="Hide (Ctrl+Shift+V)"
        >
          ✕
        </button>
      </div>

      {vitals.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Collecting metrics...</p>
      ) : (
        <div className="space-y-2">
          {vitals.map(vital => {
            const bgColor =
              vital.rating === 'good'
                ? 'bg-green-100'
                : vital.rating === 'needs-improvement'
                  ? 'bg-yellow-100'
                  : 'bg-red-100'
            const textColor =
              vital.rating === 'good'
                ? 'text-green-800'
                : vital.rating === 'needs-improvement'
                  ? 'text-yellow-800'
                  : 'text-red-800'
            const emoji =
              vital.rating === 'good' ? '✅' : vital.rating === 'needs-improvement' ? '⚠️' : '❌'

            return (
              <div
                key={vital.name}
                className={`p-2 rounded ${bgColor} ${textColor} flex items-center justify-between`}
              >
                <div className="flex items-center gap-2">
                  <span>{emoji}</span>
                  <span className="font-bold">{vital.name}</span>
                </div>
                <span className="font-mono">{formatValue(vital.name, vital.value)}</span>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-gray-200 text-gray-500 text-xs">
        <div className="grid grid-cols-3 gap-1 text-center">
          <div>
            <span className="text-green-600">✅</span> Good
          </div>
          <div>
            <span className="text-yellow-600">⚠️</span> Needs Work
          </div>
          <div>
            <span className="text-red-600">❌</span> Poor
          </div>
        </div>
        <p className="text-center mt-2">Press Ctrl+Shift+V to toggle</p>
      </div>
    </div>
  )
}
