'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter()

  const markRead = async () => {
    const supabase = createClient()
    await supabase.from('mensajes_foster').update({ leido: true }).eq('id', id)
    router.refresh()
  }

  return (
    <button
      onClick={markRead}
      className="text-xs text-orange-500 hover:text-orange-700 font-medium transition-colors"
    >
      Marcar como leído ✓
    </button>
  )
}
