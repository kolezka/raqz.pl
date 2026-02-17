'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import type { Specialist } from '@/types/developers'
import clsx from 'clsx'
import { RiCodeSSlashLine, RiServerLine, RiSmartphoneLine, RiPaintBrushLine } from 'react-icons/ri'

interface DeveloperCardProps {
  specialist: Specialist
}

const iconMap = {
  'react-developer': RiCodeSSlashLine,
  'python-developer': RiServerLine,
  'react-native-developer': RiSmartphoneLine,
  'nodejs-developer': RiServerLine,
  'graphics-designer': RiPaintBrushLine,
}

export default function DeveloperCard({ specialist }: DeveloperCardProps) {
  const t = useTranslations('developers')
  const locale = useLocale()
  const slug = specialist.slug[locale as 'en' | 'pl']
  const IconComponent = iconMap[specialist.type as keyof typeof iconMap]

  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-lg',
        'bg-white dark:bg-dark-800',
        'p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700',
        'hover:shadow-lg dark:hover:shadow-primary-500/10',
        'transition-all duration-200'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={clsx(
            'flex-shrink-0 flex items-center justify-center',
            'w-14 h-14 rounded-xl',
            'bg-gradient-to-br from-primary-500 to-primary-600',
            'text-white shadow-md'
          )}
        >
          {IconComponent && <IconComponent className="w-7 h-7" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {specialist.name}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 mt-0.5">
              {specialist.role}
            </p>
          </div>

          {/* Short description */}
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {specialist.shortDescription}
          </p>

          {/* Technologies */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {specialist.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-gray-50 dark:bg-dark-700 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
            {specialist.technologies.length > 4 && (
              <span className="inline-flex items-center rounded-md bg-gray-50 dark:bg-dark-700 px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{specialist.technologies.length - 4}
              </span>
            )}
          </div>

          {/* View Details Link */}
          <div className="mt-4">
            <Link
              href={{
                pathname: '/developers/[developerSlug]',
                params: { developerSlug: slug },
              }}
              className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-150"
            >
              {t('viewDetails', { defaultValue: 'View Details' })}
              <span
                className={clsx(
                  'ml-1 transition-transform duration-200',
                  'group-hover:translate-x-1'
                )}
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
