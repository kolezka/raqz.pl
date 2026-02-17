export interface Specialist {
  id: string
  slug: { en: string; pl: string }
  name: string
  role: string
  type: SpecialistType
  icon?: string
  shortDescription: string
  fullDescription: string
  skills: string[]
  technologies: string[]
  specializations: string[]
  exampleProjects?: Array<{
    name: string
    description: string
    technologies: string[]
  }>
}

export type SpecialistType =
  | 'react-developer'
  | 'python-developer'
  | 'react-native-developer'
  | 'nodejs-developer'
  | 'graphics-designer'

export interface SpecialistsData {
  specialists: Specialist[]
}
