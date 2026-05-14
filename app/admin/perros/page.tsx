import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { DeleteDogButton } from './DeleteDogButton'
import type { Perro } from '@/lib/types'

export default async function PerrosAdminPage() {
  const supabase = await createClient()
  const { data: perros } = await supabase
    .from('perros')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perros</h1>
          <p className="text-gray-500 mt-1">{perros?.length ?? 0} perros registrados</p>
        </div>
        <Link
          href="/admin/perros/nuevo"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          + Añadir perro
        </Link>
      </div>

      {!perros?.length ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🐾</div>
          <p>No hay perros registrados aún.</p>
          <Link href="/admin/perros/nuevo" className="text-orange-500 hover:underline mt-2 inline-block">
            Añadir el primero
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Perro</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Raza / Edad</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Salud</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(perros as Perro[]).map(perro => (
                <tr key={perro.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 overflow-hidden flex-shrink-0 relative">
                        {perro.foto_url ? (
                          <Image src={perro.foto_url} alt={perro.nombre} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">🐾</div>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{perro.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                    {perro.raza ?? '—'} {perro.edad ? `· ${perro.edad}` : ''}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex gap-1">
                      {perro.vacunado && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Vac.</span>
                      )}
                      {perro.esterilizado && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">Est.</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      perro.disponible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {perro.disponible ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/perros/${perro.id}/edit`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteDogButton perroId={perro.id} perroNombre={perro.nombre} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
