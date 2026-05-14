import { createClient } from '@/lib/supabase/server'
import { DogForm } from '@/components/admin/DogForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Perro } from '@/lib/types'

export default async function EditPerroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: perro } = await supabase.from('perros').select('*').eq('id', id).single()

  if (!perro) notFound()

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/perros" className="text-sm text-gray-500 hover:text-gray-700">
          ← Volver a perros
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar: {perro.nombre}</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <DogForm perro={perro as Perro} />
      </div>
    </div>
  )
}
