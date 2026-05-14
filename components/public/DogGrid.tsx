'use client'

import { useState } from 'react'
import { DogCard } from './DogCard'
import { AdoptionModal } from './AdoptionModal'
import type { Perro } from '@/lib/types'

interface DogGridProps {
  perros: Perro[]
}

export function DogGrid({ perros }: DogGridProps) {
  const [selectedPerro, setSelectedPerro] = useState<Perro | null>(null)

  const disponibles = perros.filter(p => p.disponible)

  return (
    <>
      {disponibles.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-semibold text-gray-600">
            Por ahora no hay perros disponibles
          </h3>
          <p className="text-gray-500 mt-2">Vuelve pronto, siempre hay nuevos rescates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {disponibles.map(perro => (
            <DogCard
              key={perro.id}
              perro={perro}
              onAdoptar={setSelectedPerro}
            />
          ))}
        </div>
      )}

      <AdoptionModal
        perro={selectedPerro}
        onClose={() => setSelectedPerro(null)}
      />
    </>
  )
}
