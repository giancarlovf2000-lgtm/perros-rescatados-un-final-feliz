'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AdoptionForm } from './AdoptionForm'
import type { Perro } from '@/lib/types'

interface AdoptionModalProps {
  perro: Perro | null
  onClose: () => void
}

export function AdoptionModal({ perro, onClose }: AdoptionModalProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleClose = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <Dialog open={!!perro} onOpenChange={handleClose}>
      <DialogContent className="w-[96vw] max-w-2xl h-[94vh] flex flex-col p-0 rounded-2xl overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
          <DialogTitle className="text-orange-700 text-lg font-bold">
            {submitted ? '¡Solicitud enviada!' : 'Solicitud de Adopción — Un Final Feliz'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-6xl">🎉</div>
              <h3 className="text-xl font-bold text-gray-800">¡Gracias por tu interés!</h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Hemos recibido tu solicitud de adopción. Nos pondremos en contacto contigo
                muy pronto para coordinar los próximos pasos.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                Cerrar
              </button>
            </div>
          ) : perro ? (
            <AdoptionForm perro={perro} onSuccess={() => setSubmitted(true)} onCancel={handleClose} />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
