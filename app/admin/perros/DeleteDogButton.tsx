'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeleteDogButtonProps {
  perroId: string
  perroNombre: string
}

export function DeleteDogButton({ perroId, perroNombre }: DeleteDogButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar a ${perroNombre}? Esta acción no se puede deshacer.`)) return

    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from('perros').delete().eq('id', perroId)
    router.refresh()
    setIsDeleting(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs text-red-500 hover:underline disabled:opacity-50"
    >
      {isDeleting ? '...' : 'Eliminar'}
    </button>
  )
}
