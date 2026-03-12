'use client'

/* eslint-disable react-hooks/refs */
import { useTranslations } from 'next-intl'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function WorkInProgress() {
  const t = useTranslations('wip')

  const iconAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 0 })
  const titleAnimation = useScrollAnimation<HTMLHeadingElement>('fade-up', {
    delay: 100,
  })
  const descAnimation = useScrollAnimation<HTMLParagraphElement>('fade-up', {
    delay: 200,
  })

  return (
    <section className="relative px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div
          ref={iconAnimation.ref}
          className={`mb-8 flex justify-center ${iconAnimation.className}`}
        >
          <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-6">
            <svg
              className="h-12 w-12 text-primary-500 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743"
              />
            </svg>
          </div>
        </div>
        <h2
          ref={titleAnimation.ref}
          className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl ${titleAnimation.className}`}
        >
          {t('title')}
        </h2>
        <p
          ref={descAnimation.ref}
          className={`mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 ${descAnimation.className}`}
        >
          {t('description')}
        </p>
      </div>
    </section>
  )
}
