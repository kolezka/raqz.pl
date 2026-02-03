'use client'

import { memo } from 'react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import './AnimatedBackground.css'

export default memo(function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch - render light mode by default until mounted
  const isDark = mounted && resolvedTheme === 'dark'

  // Light mode gradients (vibrant, pastel)
  const lightGradients = {
    flare1: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
    flare2: 'linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6)',
    flare3: 'linear-gradient(135deg, #8b5cf6, #f472b6, #ef4444)',
    flare4: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
    flare5: 'linear-gradient(135deg, #6366f1, #8b5cf6, #f472b6)',
    small1: 'linear-gradient(135deg, #fbbf24, #f97316)',
    small2: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
    small3: 'linear-gradient(135deg, #f43f5e, #f472b6)',
  }

  // Dark mode gradients (deeper, more saturated)
  const darkGradients = {
    flare1: 'linear-gradient(135deg, #1e40af, #5b21b6, #9d174d)',
    flare2: 'linear-gradient(135deg, #0e7490, #1d4ed8, #6d28d9)',
    flare3: 'linear-gradient(135deg, #6d28d9, #9d174d, #b91c1c)',
    flare4: 'linear-gradient(135deg, #047857, #1d4ed8, #6d28d9)',
    flare5: 'linear-gradient(135deg, #4338ca, #6d28d9, #9d174d)',
    small1: 'linear-gradient(135deg, #b45309, #c2410c)',
    small2: 'linear-gradient(135deg, #0d9488, #0891b2)',
    small3: 'linear-gradient(135deg, #be123c, #9d174d)',
  }

  const gradients = isDark ? darkGradients : lightGradients

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ viewTransitionName: 'none' }}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 transition-colors duration-300" />

      {/* Large floating elements with CSS classes */}
      <div
        className="absolute w-80 h-80 rounded-full float1 transition-opacity duration-300"
        style={{
          top: '-10rem',
          left: '-8rem',
          background: gradients.flare1,
          filter: 'blur(60px)',
          opacity: isDark ? 0.3 : 0.6,
        }}
      />

      <div
        className="absolute w-72 h-72 rounded-full float2 transition-opacity duration-300"
        style={{
          top: '-5rem',
          right: '25%',
          background: gradients.flare2,
          filter: 'blur(50px)',
          opacity: isDark ? 0.2 : 0.4,
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full float3 transition-opacity duration-300"
        style={{
          top: '8rem',
          right: '-6rem',
          background: gradients.flare3,
          filter: 'blur(40px)',
          opacity: isDark ? 0.25 : 0.5,
        }}
      />

      <div
        className="absolute w-48 h-48 rounded-full float4 transition-opacity duration-300"
        style={{
          top: '50%',
          left: '25%',
          background: gradients.flare4,
          filter: 'blur(30px)',
          opacity: isDark ? 0.15 : 0.3,
        }}
      />

      <div
        className="absolute w-96 h-96 rounded-full float5 transition-opacity duration-300"
        style={{
          bottom: '-8rem',
          left: '33%',
          background: gradients.flare5,
          filter: 'blur(70px)',
          opacity: isDark ? 0.2 : 0.4,
        }}
      />

      {/* Medium floating particles */}
      <div
        className="absolute w-24 h-24 rounded-full floatSmall1 transition-opacity duration-300"
        style={{
          top: '5rem',
          left: '50%',
          background: gradients.small1,
          filter: 'blur(15px)',
          opacity: isDark ? 0.25 : 0.5,
        }}
      />

      <div
        className="absolute w-32 h-32 rounded-full floatSmall2 transition-opacity duration-300"
        style={{
          top: '66%',
          right: '33%',
          background: gradients.small2,
          filter: 'blur(20px)',
          opacity: isDark ? 0.22 : 0.45,
        }}
      />

      <div
        className="absolute w-28 h-28 rounded-full floatSmall3 transition-opacity duration-300"
        style={{
          bottom: '25%',
          left: '16%',
          background: gradients.small3,
          filter: 'blur(18px)',
          opacity: isDark ? 0.2 : 0.4,
        }}
      />

      {/* Tailwind-animated elements */}
      <div
        className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-700 dark:to-pink-700 animate-pulse-slow transition-opacity duration-300"
        style={{ filter: 'blur(10px)', opacity: isDark ? 0.15 : 0.3 }}
      />

      <div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-400 dark:from-green-700 dark:to-blue-700 animate-float-reverse transition-opacity duration-300"
        style={{ filter: 'blur(8px)', opacity: isDark ? 0.18 : 0.35 }}
      />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 dark:from-black/30 dark:via-transparent dark:to-black/20 pointer-events-none transition-colors duration-300" />
    </div>
  )
})
