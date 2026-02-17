'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import type { Specialist } from '@/types/developers'
import clsx from 'clsx'
import { RiCodeSSlashLine, RiServerLine, RiSmartphoneLine, RiPaintBrushLine } from 'react-icons/ri'

interface DeveloperProfileProps {
  specialist: Specialist
}

const iconMap = {
  'react-developer': RiCodeSSlashLine,
  'python-developer': RiServerLine,
  'react-native-developer': RiSmartphoneLine,
  'nodejs-developer': RiServerLine,
  'graphics-designer': RiPaintBrushLine,
}

export default function DeveloperProfile({ specialist }: DeveloperProfileProps) {
  const t = useTranslations('developers')
  const IconComponent = iconMap[specialist.type as keyof typeof iconMap]

  // Create contact URL with pre-filled subject
  const contactUrl = useMemo(() => {
    const subject = encodeURIComponent(`Inquiry about ${specialist.name}`)
    return `/#contact?subject=${subject}`
  }, [specialist.name])

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Icon */}
          <div
            className={clsx(
              'flex-shrink-0 flex items-center justify-center',
              'w-20 h-20 rounded-2xl',
              'bg-gradient-to-br from-primary-500 to-primary-600',
              'text-white shadow-lg'
            )}
          >
            {IconComponent && <IconComponent className="w-10 h-10" />}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {specialist.name}
              </h1>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                {specialist.role}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{specialist.shortDescription}</p>
          </div>

          {/* Contact Button */}
          <a
            href={contactUrl}
            className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-150 shadow-sm"
          >
            {t('contactUs', { defaultValue: 'Contact Us' })}
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('about', { defaultValue: 'About' })}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {specialist.fullDescription}
        </p>
      </div>

      {/* Skills Section */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('skills', { defaultValue: 'Skills' })}
        </h2>
        <div className="flex flex-wrap gap-2">
          {specialist.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-md bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('technologies', { defaultValue: 'Technologies' })}
        </h2>
        <div className="flex flex-wrap gap-2">
          {specialist.technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-md bg-gray-100 dark:bg-dark-700 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Specializations Section */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('specializations', { defaultValue: 'Specializations' })}
        </h2>
        <ul className="space-y-2">
          {specialist.specializations.map((spec, index) => (
            <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
              <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
              {spec}
            </li>
          ))}
        </ul>
        {/* Designer note */}
        {specialist.type === 'graphics-designer' && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <span className="font-semibold">
                {t('designerNote', {
                  defaultValue: 'Specializes in illustrations and branding — not UI design',
                })}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Example Projects Section */}
      {specialist.exampleProjects && specialist.exampleProjects.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('exampleProjects', { defaultValue: 'Example Projects' })}
          </h2>
          <div className="space-y-6">
            {specialist.exampleProjects.map((project, index) => (
              <div
                key={index}
                className="border-l-4 border-primary-500 dark:border-primary-400 pl-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center rounded-md bg-gray-100 dark:bg-dark-700 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to List */}
      <div className="text-center">
        <Link
          href="/developers"
          className="inline-flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
        >
          <span className="mr-1">←</span>
          {t('backToList', { defaultValue: 'Back to Specialists' })}
        </Link>
      </div>
    </article>
  )
}
