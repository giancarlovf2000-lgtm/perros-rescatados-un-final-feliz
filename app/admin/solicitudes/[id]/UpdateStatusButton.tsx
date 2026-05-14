'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import type { EstadoSolicitud } from '@/lib/types'

interface UpdateStatusButtonProps {
  solicitudId: string
  currentEstado: EstadoSolicitud
}

export function UpdateStatusButton({ solicitudId, currentEstado }: UpdateStatusButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const updateStatus = async (estado: EstadoSolicitud) => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.from('solicitudes').update({ estado }).eq('id', solicitudId)
    router.refresh()
    setIsLoading(false)
  }

  return (
    <>
      {currentEstado !== 'aprobado' && (
        <Button
          onClick={() => updateStatus('aprobado')}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Aprobar
        </Button>
      )}
      {currentEstado !== 'rechazado' && (
        <Button
          variant="outline"
          onClick={() => updateStatus('rechazado')}
          disabled={isLoading}
          className="border-red-300 text-red-600 hover:bg-red-50"
        >
          Rechazar
        </Button>
      )}
      {currentEstado !== 'pendiente' && (
        <Button
          variant="outline"
          onClick={() => updateStatus('pendiente')}
          disabled={isLoading}
        >
          Marcar pendiente
        </Button>
      )}
    </>
  )
}
