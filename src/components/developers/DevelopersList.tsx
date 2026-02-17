'use client'

import type { Specialist } from '@/types/developers'
import DeveloperCard from './DeveloperCard'

interface DevelopersListProps {
  specialists: Specialist[]
}

export default function DevelopersList({ specialists }: DevelopersListProps) {
  if (specialists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No specialists available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {specialists.map(specialist => (
        <DeveloperCard key={specialist.id} specialist={specialist} />
      ))}
    </div>
  )
}
