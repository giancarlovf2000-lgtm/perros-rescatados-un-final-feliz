'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Perro } from '@/lib/types'

interface DogCardProps {
  perro: Perro
  onAdoptar: (perro: Perro) => void
}

export function DogCard({ perro, onAdoptar }: DogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative aspect-square bg-amber-50">
        {perro.foto_url ? (
          <Image
            src={perro.foto_url}
            alt={`Foto de ${perro.nombre}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-amber-100">
            🐾
          </div>
        )}
      </div>

      <CardContent className="p-4 flex-1">
        <h3 className="text-xl font-bold text-amber-900 mb-1">{perro.nombre}</h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {perro.raza && (
            <span className="text-sm text-gray-600">{perro.raza}</span>
          )}
          {perro.raza && (perro.edad || perro.genero) && (
            <span className="text-sm text-gray-400">·</span>
          )}
          {perro.edad && (
            <span className="text-sm text-gray-600">{perro.edad}</span>
          )}
          {perro.edad && perro.genero && (
            <span className="text-sm text-gray-400">·</span>
          )}
          {perro.genero && (
            <span className="text-sm text-gray-600 capitalize">{perro.genero}</span>
          )}
        </div>

        {perro.descripcion && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{perro.descripcion}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {perro.vacunado && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              Vacunado
            </Badge>
          )}
          {perro.esterilizado && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              Esterilizado
            </Badge>
          )}
          {perro.tamano && (
            <Badge variant="outline" className="text-xs capitalize">
              {perro.tamano}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAdoptar(perro)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
        >
          ¡Adóptame!
        </Button>
      </CardFooter>
    </Card>
  )
}
