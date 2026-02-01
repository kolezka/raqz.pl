'use client'

/* eslint-disable react-hooks/refs */
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Hero() {
  const t = useTranslations()

  const titleAnimation = useScrollAnimation<HTMLHeadingElement>('fade-up', { delay: 0 })
  const subtitleAnimation = useScrollAnimation<HTMLParagraphElement>('fade-up', { delay: 100 })
  const ctaAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 200 })

  return (
    <section id="home" className="relative px-6 pt-20 lg:px-8 min-h-screen flex items-center">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1
            ref={titleAnimation.ref}
            className={`whitespace-pre-line font-bold tracking-tight text-gray-900 dark:text-white text-4xl sm:text-6xl ${titleAnimation.className}`}
          >
            {t('hero.title')}
          </h1>
          <p
            ref={subtitleAnimation.ref}
            className={`whitespace-pre-line mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 ${subtitleAnimation.className}`}
          >
            {t('hero.subtitle')}
          </p>
          <div
            ref={ctaAnimation.ref}
            className={`mt-10 flex items-center justify-center gap-x-6 ${ctaAnimation.className}`}
          >
            <Link
              href="/services"
              className="rounded-md bg-primary-500 dark:bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 dark:hover:bg-primary-500 hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
            >
              {t('hero.getStarted')}
            </Link>
            {/* <a
              href="#about"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-200"
            >
              {t('hero.learnMore')} <span aria-hidden="true">→</span>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}
