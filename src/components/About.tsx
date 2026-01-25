'use client'

/* eslint-disable react-hooks/refs */
import { useTranslations } from 'next-intl'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'

export default function About() {
  const t = useTranslations()

  const headerAnimation = useScrollAnimation<HTMLDivElement>('fade-up')
  const staggerStyles = useStaggerAnimation(3, {
    baseDelay: 0,
    staggerDelay: 150,
    duration: 500,
  })

  const value1Animation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 0 })
  const value2Animation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 150 })
  const value3Animation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 300 })

  return (
    <section id="about" className="py-24  sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerAnimation.ref}
          className={`mx-auto max-w-2xl lg:text-center ${headerAnimation.className}`}
        >
          <h2 className="font-semibold text-primary-600 dark:text-primary-400 text-md mb-2">{t('about.title')}</h2>
          <p className="font-bold tracking-tight text-gray-900 dark:text-white text-5xl mb-4">
            {t('about.description')}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">{t('about.subtitle')}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div
              ref={value1Animation.ref}
              className={`flex flex-col ${value1Animation.className}`}
              style={staggerStyles[0]}
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <div className="h-10 w-10 flex-none bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ">
                  1
                </div>
                {t('about.values.innovation.title')}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">{t('about.values.innovation.description')}</p>
              </dd>
            </div>
            <div
              ref={value2Animation.ref}
              className={`flex flex-col ${value2Animation.className}`}
              style={staggerStyles[1]}
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <div className="h-10 w-10 flex-none bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ">
                  2
                </div>
                {t('about.values.quality.title')}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">{t('about.values.quality.description')}</p>
              </dd>
            </div>
            <div
              ref={value3Animation.ref}
              className={`flex flex-col ${value3Animation.className}`}
              style={staggerStyles[2]}
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <div className="h-10 w-10 flex-none bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ">
                  3
                </div>
                {t('about.values.partnership.title')}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">{t('about.values.partnership.description')}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
