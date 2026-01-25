'use client'

/* eslint-disable react-hooks/refs */
import { useTranslations } from 'next-intl'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { RiGithubLine, RiLinkedinLine, RiMapPinLine, RiMailLine } from 'react-icons/ri'

export default function AboutMe() {
  const t = useTranslations()

  const headerAnimation = useScrollAnimation<HTMLDivElement>('fade-up')
  const contentAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const imageAnimation = useScrollAnimation<HTMLDivElement>('zoom-in', { delay: 200 })

  return (
    <section id="about-me" className="py-24 sm:py-32 bg-gray-50 dark:bg-dark-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div ref={headerAnimation.ref} className={headerAnimation.className}>
              <h2 className="font-semibold text-primary-600 dark:text-primary-400 text-md mb-2">
                {t('aboutMe.title')}
              </h2>
              <p className="font-bold tracking-tight text-gray-900 dark:text-white text-4xl sm:text-5xl mb-4">
                {t('aboutMe.name')}
              </p>
              <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-6">
                {t('aboutMe.role')}
              </p>
            </div>

            <div ref={contentAnimation.ref} className={`space-y-4 ${contentAnimation.className}`}>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t('aboutMe.description')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t('aboutMe.description2')}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <RiMapPinLine className="w-5 h-5 mr-2 text-primary-500" />
                  <span>{t('aboutMe.location')}</span>
                </div>
                <a
                  href="mailto:mariusz@raqz.pl"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <RiMailLine className="w-5 h-5 mr-2 text-primary-500" />
                  <span>mariusz@raqz.pl</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/kolezka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                >
                  <RiGithubLine className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mariusz-rakus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0077B5] text-white hover:bg-[#006699] transition-all duration-200 hover:scale-105"
                >
                  <RiLinkedinLine className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Experience Highlights */}
          <div ref={imageAnimation.ref} className={`${imageAnimation.className}`}>
            <div className="grid grid-cols-2 gap-4">
              {/* Stats Cards */}
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  7+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t('aboutMe.stats.yearsExperience')}
                </div>
              </div>
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  50+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {t('aboutMe.stats.projectsDelivered')}
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mt-6 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-4">{t('aboutMe.highlights.title')}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{t('aboutMe.highlights.item1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{t('aboutMe.highlights.item2')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
