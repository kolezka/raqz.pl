import developersData from '@/data/developers.json'
import type { Specialist, SpecialistsData } from '@/types/developers'

// Type assertion for JSON import
const typedDevelopersData = developersData as SpecialistsData

export function generateDeveloperParams(locale: string) {
  return typedDevelopersData.specialists.map(spec => ({
    developerSlug: spec.slug[locale as 'en' | 'pl'],
  }))
}

export function getSpecialistBySlug(slug: string, locale: string): Specialist | undefined {
  return typedDevelopersData.specialists.find(spec => spec.slug[locale as 'en' | 'pl'] === slug)
}

export function getAllSpecialists(): Specialist[] {
  return typedDevelopersData.specialists
}
