'use client'

import { useTranslations } from 'next-intl'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { RiExternalLinkLine, RiGithubLine } from 'react-icons/ri'

// Portfolio projects data
const projects = [
  {
    id: 'directdental',
    image: '/portfolio/directdental.png',
    technologies: ['React Native', 'Expo', 'TypeScript', 'PostgreSQL', 'Ruby on Rails', 'CI/CD'],
    liveUrl: null,
    githubUrl: null,
    featured: true,
  },
  {
    id: 'dynamic-xyz',
    image: '/portfolio/dynamic.png',
    technologies: ['React', 'Node.JS', 'Express', 'PostgreSQL', 'Prisma', 'WalletConnect', 'Wagmi'],
    liveUrl: 'https://dynamic.xyz',
    githubUrl: null,
    featured: true,
  },
  {
    id: 'raqzpl',
    image: '/portfolio/raqzpl.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'MDX'],
    liveUrl: 'https://raqz.pl',
    githubUrl: 'https://github.com/kolezka/raqz.pl',
    featured: false,
  },
]

export default function PortfolioClient() {
  const t = useTranslations('portfolio')
  const { ref: titleRef, className: titleClass } = useScrollAnimation<HTMLDivElement>('fade-up')

  return (
    <section className="bg-gray-50 dark:bg-dark-900 pt-20 min-h-screen">
      {/* Hero Section */}
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div ref={titleRef} className={`mx-auto max-w-2xl text-center ${titleClass}`}>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="bg-white dark:bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Featured Projects */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('featured')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter(p => p.featured)
                .map(project => (
                  <ProjectCard key={project.id} project={project} t={t} featured />
                ))}
            </div>
          </div>

          {/* Other Projects */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('otherProjects')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter(p => !p.featured)
                .map(project => (
                  <ProjectCard key={project.id} project={project} t={t} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[number]
  t: (key: string) => string
  featured?: boolean
}

function ProjectCard({ project, t, featured = false }: ProjectCardProps) {
  const { ref, className } = useScrollAnimation<HTMLDivElement>('fade-up')

  return (
    <div
      ref={ref}
      className={`group bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 hover:shadow-xl ${className} ${
        featured ? 'lg:flex' : ''
      }`}
    >
      {/* Project Image */}
      <div
        className={`relative overflow-hidden bg-gray-100 dark:bg-dark-700 ${
          featured ? 'lg:w-1/2 h-64 lg:h-auto' : 'h-48'
        }`}
      >
        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Project Info */}
      <div className={`p-6 ${featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-center' : ''}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {t(`projects.${project.id}.title`)}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t(`projects.${project.id}.description`)}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <RiExternalLinkLine className="w-4 h-4" />
              {t('viewLive')}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <RiGithubLine className="w-4 h-4" />
              {t('viewCode')}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
