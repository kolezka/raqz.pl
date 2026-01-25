'use client'

/* eslint-disable react-hooks/refs */
import { useTranslations } from 'next-intl'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'

const techCategories = [
  {
    id: 'frontend',
    technologies: ['React', 'Vue', 'Angular', 'Next.js', 'Nuxt.js'],
  },
  {
    id: 'mobile',
    technologies: ['React Native', 'Expo', 'iOS', 'Android'],
  },
  {
    id: 'backend',
    technologies: ['Node.js', 'Python', 'Express', 'NestJS', 'FastAPI', 'Ruby on Rails'],
  },
  {
    id: 'database',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'PGVector'],
  },
  {
    id: 'cloud',
    technologies: ['Google Cloud', 'Azure', 'Docker', 'Kubernetes'],
  },
  // {
  //   id: 'ai',
  //   technologies: ['Claude', 'OpenAI', 'LangChain', 'Hugging Face', 'Flowise'],
  // },
]

export default function TechStack() {
  const t = useTranslations()

  const headerAnimation = useScrollAnimation<HTMLDivElement>('fade-up')
  const gridAnimation = useScrollAnimation<HTMLDivElement>('fade-up', {
    delay: 100,
  })
  const staggerStyles = useStaggerAnimation(techCategories.length, {
    baseDelay: 0,
    staggerDelay: 100,
    duration: 500,
  })

  return (
    <section id="tech-stack" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerAnimation.ref}
          className={`mx-auto max-w-2xl lg:text-center mb-16 ${headerAnimation.className}`}
        >
          <h2 className="font-semibold text-primary-600 dark:text-primary-400 text-md mb-2">
            {t('techStack.title')}
          </h2>
          <p className="font-bold tracking-tight text-gray-900 dark:text-white text-4xl sm:text-5xl mb-4">
            {t('techStack.heading')}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('techStack.description')}
          </p>
        </div>

        <div
          ref={gridAnimation.ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${gridAnimation.className}`}
        >
          {techCategories.map((category, index) => (
            <div
              key={category.id}
              className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl"
              style={staggerStyles[index]}
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                {t(`techStack.categories.${category.id}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
