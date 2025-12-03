/* eslint-disable react-hooks/refs */
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'

export default function About() {
  const { t } = useTranslation()

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
        <div ref={headerAnimation.ref} className={`mx-auto max-w-2xl lg:text-center ${headerAnimation.className}`}>
          <h2 className="text-base font-semibold leading-7 text-primary-600">{t('about.title')}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('about.description')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('about.subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div ref={value1Animation.ref} className={`flex flex-col ${value1Animation.className}`} style={staggerStyles[0]}>
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div className="h-10 w-10 flex-none bg-primary-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 hover:scale-110 hover:rotate-12">
                  1
                </div>
                {t('about.values.innovation.title')}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  {t('about.values.innovation.description')}
                </p>
              </dd>
            </div>
            <div ref={value2Animation.ref} className={`flex flex-col ${value2Animation.className}`} style={staggerStyles[1]}>
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div className="h-10 w-10 flex-none bg-primary-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 hover:scale-110 hover:rotate-12">
                  2
                </div>
                {t('about.values.quality.title')}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  {t('about.values.quality.description')}
                </p>
              </dd>
            </div>
            <div ref={value3Animation.ref} className={`flex flex-col ${value3Animation.className}`} style={staggerStyles[2]}>
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div className="h-10 w-10 flex-none bg-primary-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 hover:scale-110 hover:rotate-12">
                  3
                </div>
                {t('about.values.partnership.title')}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  {t('about.values.partnership.description')}
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}