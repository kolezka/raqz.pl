import { useState, useEffect } from 'react'

type ScrollDirection = 'up' | 'down' | null

interface UseScrollDirectionReturn {
  scrollDirection: ScrollDirection
  scrollY: number
  isAtTop: boolean
}

export const useScrollDirection = (threshold: number = 10): UseScrollDirectionReturn => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      const distance = Math.abs(scrollY - lastScrollY)

      // Only update if we've scrolled more than the threshold
      if (distance >= threshold) {
        setScrollDirection(direction)
        lastScrollY = scrollY > 0 ? scrollY : 0
      }

      setScrollY(scrollY)
      setIsAtTop(scrollY < 10)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    // Add passive flag for better scroll performance
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { scrollDirection, scrollY, isAtTop }
}
