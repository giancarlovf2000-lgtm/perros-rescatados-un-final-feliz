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

  const handleSuccess = () => {
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <Dialog open={!!perro} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-orange-700">
            {submitted ? '¡Solicitud enviada!' : 'Formulario de Adopción'}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="text-6xl">🎉</div>
            <h3 className="text-xl font-bold text-gray-800">¡Gracias por tu interés!</h3>
            <p className="text-gray-600">
              Hemos recibido tu solicitud de adopción. Nos pondremos en contacto contigo
              muy pronto para coordinar los próximos pasos.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : perro ? (
          <AdoptionForm perro={perro} onSuccess={handleSuccess} onCancel={handleClose} />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
