'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import clsx from 'clsx'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return placeholder with same dimensions to prevent layout shift
    return (
      <div className={clsx('flex items-center gap-1', className)}>
        <div className="h-8 w-8 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const getIcon = () => {
    if (resolvedTheme === 'dark') {
      return <RiMoonLine className="h-5 w-5" />
    }
    return <RiSunLine className="h-5 w-5" />
  }

  const getLabel = () => {
    return resolvedTheme === 'dark' ? 'Dark theme' : 'Light theme'
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={clsx(
        'cursor-pointer',
        'flex items-center justify-center rounded-md p-2',
        'text-gray-700 dark:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        className
      )}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  )
}
