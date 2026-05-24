'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { Perro } from '@/lib/types'

interface DogProfileModalProps {
  perro: Perro | null
  onClose: () => void
  onAdoptar: (perro: Perro) => void
}

export function DogProfileModal({ perro, onClose, onAdoptar }: DogProfileModalProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null)

  if (!perro) return null

  const allPhotos = [
    ...(perro.foto_url ? [perro.foto_url] : []),
    ...(perro.fotos_adicionales?.filter(Boolean) ?? []),
  ]

  const displayPhoto = (activePhoto && allPhotos.includes(activePhoto))
    ? activePhoto
    : allPhotos[0] ?? null

  return (
    <Dialog open={!!perro} onOpenChange={onClose}>
      <DialogContent className="w-[96vw] max-w-2xl h-[94vh] flex flex-col p-0 rounded-2xl overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-amber-100 flex-shrink-0">
          <DialogTitle className="text-amber-900 text-xl font-bold">
            {perro.nombre}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Main photo */}
          <div className="relative w-full aspect-square bg-amber-50">
            {displayPhoto ? (
              <Image
                src={displayPhoto}
                alt={`Foto de ${perro.nombre}`}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 96vw, 672px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🐾</div>
            )}
          </div>

          {/* Thumbnail strip — only if more than 1 photo */}
          {allPhotos.length > 1 && (
            <div className="flex gap-2 px-4 py-3 overflow-x-auto">
              {allPhotos.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhoto(url)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    displayPhoto === url
                      ? 'border-orange-500'
                      : 'border-transparent hover:border-orange-300'
                  }`}
                >
                  <Image src={url} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="px-5 py-5 space-y-4">
            {/* Basic info row */}
            <div className="space-y-2">
              {(perro.raza || perro.edad || perro.genero) && (
                <p className="text-gray-600">
                  {[perro.raza, perro.edad, perro.genero].filter(Boolean).join(' · ')}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {perro.vacunado && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Vacunado</Badge>
                )}
                {perro.esterilizado && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Esterilizado</Badge>
                )}
                {perro.tamano && (
                  <Badge variant="outline" className="capitalize">{perro.tamano}</Badge>
                )}
              </div>
            </div>

            {/* Description */}
            {perro.descripcion && (
              <p className="text-gray-700 leading-relaxed">{perro.descripcion}</p>
            )}

            {/* Extra spacing so content doesn't hide behind sticky button */}
            <div className="h-4" />
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-amber-100 bg-white">
          <button
            type="button"
            onClick={() => onAdoptar(perro)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full text-lg transition-colors shadow-md"
          >
            ¡Quiero adoptar a {perro.nombre}! 🐾
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
