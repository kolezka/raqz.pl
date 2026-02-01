'use client'

/* eslint-disable react-hooks/refs */
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
  RiGlobalLine,
  RiGithubLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiCodeSSlashLine,
  RiUserLine,
  RiHeartLine,
  RiTranslate2,
  RiTeamLine,
  RiRocketLine,
} from 'react-icons/ri'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import clsx from 'clsx'

type SkillLevel = 'expert' | 'intermediate' | 'learning'

interface SkillItem {
  name: string
  level?: SkillLevel
}

interface SkillGroup {
  category: string
  skills: (string | SkillItem)[]
}

function normalizeSkill(skill: string | SkillItem): { name: string; level: SkillLevel } {
  if (typeof skill === 'string') {
    return { name: skill, level: 'intermediate' }
  }
  return { name: skill.name, level: skill.level || 'intermediate' }
}

const levelOrder: Record<SkillLevel, number> = { expert: 0, intermediate: 1, learning: 2 }

function sortSkillsByLevel(skills: (string | SkillItem)[]): { name: string; level: SkillLevel }[] {
  return skills.map(normalizeSkill).sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
}

function getSkillBadgeClasses(level: SkillLevel): string {
  const baseClasses = 'px-3 py-1.5 rounded-md text-sm font-medium cursor-default'
  const levelClassMap: Record<SkillLevel, string> = {
    expert: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400',
    intermediate: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    learning: 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500',
  }
  return clsx(baseClasses, levelClassMap[level] || levelClassMap['intermediate'])
}

interface SkillCategory {
  title: string
  subtitle?: string
  items: SkillGroup[]
}

interface Project {
  company: string
  title: string
  role: string
  period: string
  description: string
  tech: string[]
}

interface Experience {
  company: string
  location: string
  role: string
  period: string
  description: string
  tech?: string[]
}

interface Education {
  institution: string
  degree: string
  period: string
}

interface Language {
  name: string
  level: string
}

interface Reference {
  name: string
  title: string
  contact: string
}

// Navigation sections
const navSections = [
  { id: 'summary', icon: RiUserLine },
  { id: 'skills', icon: RiCodeSSlashLine },
  { id: 'projects', icon: RiRocketLine },
  { id: 'experience', icon: RiBriefcaseLine },
  { id: 'education', icon: RiGraduationCapLine },
  { id: 'interests', icon: RiHeartLine },
  { id: 'languages', icon: RiTranslate2 },
  { id: 'references', icon: RiTeamLine },
]

export default function CVClient() {
  const t = useTranslations('cv')
  const [activeSection, setActiveSection] = useState('summary')

  // Get CV data from translations
  const cvData = {
    name: t('data.name'),
    title: t('data.title'),
    location: t('data.location'),
    email: t('data.email'),
    phone: t('data.phone'),
    website: t('data.website'),
    github: t('data.github'),
    summary: t.raw('data.summary') as string[],
    skills: {
      core: t.raw('data.skills.core') as SkillCategory,
      ai: t.raw('data.skills.ai') as SkillCategory,
    },
    projects: t.raw('data.projects') as Project[],
    experience: t.raw('data.experience') as Experience[],
    education: t.raw('data.education') as Education[],
    interests: t.raw('data.interests') as string[],
    languages: t.raw('data.languages') as Language[],
    references: t.raw('data.references') as Reference[],
  }

  const heroAnimation = useScrollAnimation<HTMLDivElement>('fade-up')
  const summaryAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const skillsAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const projectsAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const experienceAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const educationAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const interestsAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const languagesAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })
  const referencesAnimation = useScrollAnimation<HTMLDivElement>('fade-up', { delay: 100 })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navSections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navSections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 pt-32 lg:pt-48">
        {/* Hero Section */}
        <header ref={heroAnimation.ref} className={`text-center mb-12 ${heroAnimation.className}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {cvData.name}
          </h1>
          <p className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-medium mb-6">
            {cvData.title}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <RiMapPinLine className="w-5 h-5 mr-2 text-primary-500" aria-hidden="true" />
              <span>{cvData.location}</span>
            </div>
            <a
              href={`mailto:${cvData.email}`}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <RiMailLine className="w-5 h-5 mr-2 text-primary-500" aria-hidden="true" />
              <span>{cvData.email}</span>
            </a>
            <a
              href={`tel:${cvData.phone.replace(/\s/g, '')}`}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <RiPhoneLine className="w-5 h-5 mr-2 text-primary-500" aria-hidden="true" />
              <span>{cvData.phone}</span>
            </a>
            <a
              href={`https://${cvData.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <RiGlobalLine className="w-5 h-5 mr-2 text-primary-500" aria-hidden="true" />
              <span>{cvData.website}</span>
            </a>
            <a
              href={`https://${cvData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <RiGithubLine className="w-5 h-5 mr-2 text-primary-500" aria-hidden="true" />
              <span>{cvData.github}</span>
            </a>
          </div>

          {/* Export PDF Button */}
          {/* <button
            onClick={handleExportPDF}
            className="print:hidden inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors shadow-xs hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-900"
            aria-label={t('actions.downloadPdf')}
          >
            <RiDownloadLine className="w-5 h-5" aria-hidden="true" />
            {t('actions.downloadPdf')}
          </button> */}
        </header>

        {/* Summary Section */}
        <section
          id="summary"
          ref={summaryAnimation.ref}
          className={`mb-12 ${summaryAnimation.className}`}
          aria-labelledby="summary-heading"
        >
          <h2
            id="summary-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <RiUserLine className="w-6 h-6 text-primary-500" aria-hidden="true" />
            {t('sections.summary')}
          </h2>
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700">
            <ul className="space-y-3">
              {cvData.summary.map((item, index) => (
                <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                  <span
                    className="mr-3 mt-1.5 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsAnimation.ref}
          className={`mb-12 ${skillsAnimation.className}`}
          aria-labelledby="skills-heading"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2
              id="skills-heading"
              className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3"
            >
              <RiCodeSSlashLine className="w-6 h-6 text-primary-500" aria-hidden="true" />
              {t('sections.skills')}
            </h2>
            {/* Skill Level Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900" />
                <span className="text-gray-600 dark:text-gray-400">{t('skillLevels.expert')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700" />
                <span className="text-gray-600 dark:text-gray-400">
                  {t('skillLevels.intermediate')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-transparent border border-gray-300 dark:border-gray-600" />
                <span className="text-gray-400 dark:text-gray-500">
                  {t('skillLevels.learning')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Core Skills */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {cvData.skills.core.title}
              </h3>
              <div className="space-y-4">
                {cvData.skills.core.items.map((group, index) => (
                  <div key={index}>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {sortSkillsByLevel(group.skills).map(({ name, level }) => (
                        <span
                          key={name}
                          className={getSkillBadgeClasses(level)}
                          title={t(`skillLevels.${level}`)}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI & Data Skills */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {cvData.skills.ai.title}
              </h3>
              {cvData.skills.ai.subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {cvData.skills.ai.subtitle}
                </p>
              )}
              <div className="space-y-4">
                {cvData.skills.ai.items.map((group, index) => (
                  <div key={index}>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {sortSkillsByLevel(group.skills).map(({ name, level }) => (
                        <span
                          key={name}
                          className={getSkillBadgeClasses(level)}
                          title={t(`skillLevels.${level}`)}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsAnimation.ref}
          className={`mb-12 ${projectsAnimation.className}`}
          aria-labelledby="projects-heading"
        >
          <h2
            id="projects-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <RiRocketLine className="w-6 h-6 text-primary-500" aria-hidden="true" />
            {t('sections.projects')}
          </h2>

          <div className="space-y-6">
            {cvData.projects.map((project, index) => (
              <article
                key={index}
                className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.company} — {project.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {project.role}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 whitespace-nowrap">
                    {project.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                    {t('labels.techStack')}:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience Section (Timeline) */}
        <section
          id="experience"
          ref={experienceAnimation.ref}
          className={`mb-12 ${experienceAnimation.className}`}
          aria-labelledby="experience-heading"
        >
          <h2
            id="experience-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <RiBriefcaseLine className="w-6 h-6 text-primary-500" aria-hidden="true" />
            {t('sections.experience')}
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute -left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {cvData.experience.map((exp, index) => (
                <article key={index} className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-8 top-2 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-dark-900 shadow"
                    aria-hidden="true"
                  />

                  <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {exp.company} — {exp.location}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                    {exp.tech && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.tech.map(tech => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          ref={educationAnimation.ref}
          className={`mb-12 ${educationAnimation.className}`}
          aria-labelledby="education-heading"
        >
          <h2
            id="education-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <RiGraduationCapLine className="w-6 h-6 text-primary-500" aria-hidden="true" />
            {t('sections.education')}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {cvData.education.map((edu, index) => (
              <article
                key={index}
                className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {edu.institution}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                  {edu.degree}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section
          id="interests"
          ref={interestsAnimation.ref}
          className={`mb-12 ${interestsAnimation.className}`}
          aria-labelledby="interests-heading"
        >
          <h2
            id="interests-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <RiHeartLine className="w-6 h-6 text-primary-500" aria-hidden="true" />
            {t('sections.interests')}
          </h2>

          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-3">
              {cvData.interests.map(interest => (
                <span key={interest} className="text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section
          id="languages"
          ref={languagesAnimation.ref}
          className={`mb-12 ${languagesAnimation.className}`}
          aria-labelledby="languages-heading"
        >
          <h2
            id="languages-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <RiTranslate2 className="w-6 h-6 text-primary-500" aria-hidden="true" />
            {t('sections.languages')}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {cvData.languages.map(lang => (
              <div
                key={lang.name}
                className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {lang.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{lang.level}</p>
              </div>
            ))}
          </div>
        </section>

        {/* References Section */}
        <section
          id="references"
          ref={referencesAnimation.ref}
          className={referencesAnimation.className}
          aria-labelledby="references-heading"
        >
          <h2
            id="references-heading"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <RiTeamLine className="w-6 h-6 text-primary-500" aria-hidden="true" />
            {t('sections.references')}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {cvData.references.map((ref, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {ref.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{ref.title}</p>
                {ref.contact && (
                  <a className="block text-sm text-primary-600 dark:text-primary-400">
                    {ref.contact}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Floating Navigation */}
      <nav
        className="print:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-dark-800/90 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 shadow-xs px-2 py-2"
        aria-label={t('navigation.ariaLabel')}
      >
        <div className="flex items-center gap-1">
          {navSections.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`flex items-center justify-center p-2.5 rounded-full transition-all duration-200
                ${
                  activeSection === id
                    ? 'bg-primary-500 text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-900`}
              aria-label={t(`navigation.${id}`)}
              aria-current={activeSection === id ? 'true' : undefined}
              title={t(`navigation.${id}`)}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
