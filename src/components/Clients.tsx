'use client'

/* eslint-disable react-hooks/refs */
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { RiCodeSSlashLine, RiCloseLine } from 'react-icons/ri'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface Client {
  name: string
  industry: string
  technologies: string[]
}

const clients: Client[] = [
  {
    name: 'Sofomo',
    industry: 'IT',
    technologies: [
      'React',
      'React Native',
      'TypeScript',
      'Node.js',
      'NestJS',
      'GraphQL',
      'PostgreSQL',
      'CI/CD'
    ]
  },
  {
    name: 'Henry Schein',
    industry: 'Healthcare',
    technologies: ['React Native', 'TypeScript', 'Node.js', 'CI/CD', 'PostgreSQL', 'Ruby on Rails'],
  },
  {
    name: 'Dynamic.xyz',
    industry: 'Web3',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'WalletConnect',
      'Wagmi',
    ],
  },
  {
    name: 'Globality',
    industry: 'AI / Enterprise',
    technologies: ['React', 'TypeScript', 'GraphQL'],
  },
  {
    name: 'ORLEN Lab',
    industry: 'Energy / Lab',
    technologies: ['Vue', '.NET', 'Microsoft Azure'],
  },
]

function ClientCard({ client }: { client: Client }) {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Card */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg group cursor-pointer w-full text-left"
      >
        <div className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-center">
          {client.name}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{client.industry}</div>

        {/* Tech indicator badge */}
        <div className="flex items-center gap-1 mt-3 text-xs text-primary-600 dark:text-primary-400 opacity-70 group-hover:opacity-100 transition-opacity">
          <RiCodeSSlashLine className="w-3.5 h-3.5" />
          <span>{client.technologies.length} tech</span>
        </div>
      </button>

      {/* Popover - shows on hover (desktop) or click (mobile) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full z-50 mt-2 w-72 rounded-xl bg-white dark:bg-dark-800 shadow-xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 p-4 transition-all duration-200 origin-top ${
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        {/* Arrow */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-dark-800 rotate-45 border-l border-t border-gray-200/50 dark:border-gray-700/50" />

        {/* Close button for mobile */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            setIsOpen(false)
          }}
          className="absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors md:hidden"
          aria-label="Close"
        >
          <RiCloseLine className="w-5 h-5" />
        </button>

        <div className="mb-3 relative">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            {t('clients.technologiesUsed')}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{client.name}</p>
        </div>

        <div className="flex flex-wrap gap-2 relative">
          {client.technologies.map(tech => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Clients() {
  const t = useTranslations()

  const headerAnimation = useScrollAnimation<HTMLDivElement>('fade-up')
  const clientsAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-dark-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerAnimation.ref} className={`text-center mb-12 ${headerAnimation.className}`}>
          <h2 className="font-semibold text-primary-600 dark:text-primary-400 text-md mb-2">
            {t('clients.title')}
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('clients.heading')}
          </p>
        </div>

        <div
          ref={clientsAnimation.ref}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ${clientsAnimation.className}`}
        >
          {clients.map(client => (
            <ClientCard key={client.name} client={client} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">{t('clients.note')}</p>
        </div>
      </div>
    </section>
  )
}
