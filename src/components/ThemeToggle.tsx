'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RiSunLine, RiMoonLine, RiComputerLine } from 'react-icons/ri'
import clsx from 'clsx'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
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

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <RiComputerLine className="h-5 w-5" />
    }
    if (resolvedTheme === 'dark') {
      return <RiMoonLine className="h-5 w-5" />
    }
    return <RiSunLine className="h-5 w-5" />
  }

  const getLabel = () => {
    if (theme === 'system') return 'System theme'
    if (theme === 'dark') return 'Dark theme'
    return 'Light theme'
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={clsx(
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
