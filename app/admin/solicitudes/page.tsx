import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { StatusBadge } from '@/components/admin/StatusBadge'
import type { Solicitud } from '@/lib/types'

export default async function SolicitudesPage() {
  const supabase = await createClient()
  const { data: solicitudes } = await supabase
    .from('solicitudes')
    .select('*, perros(id, nombre, foto_url)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Solicitudes de adopción</h1>
        <p className="text-gray-500 mt-1">{solicitudes?.length ?? 0} solicitudes recibidas</p>
      </div>

      {!solicitudes?.length ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">📋</div>
          <p>No hay solicitudes aún.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Adoptante</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Perro</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Fecha</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(solicitudes as Solicitud[]).map(sol => (
                <tr key={sol.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{sol.nombre_adoptante}</div>
                    <div className="text-gray-400 text-xs">{sol.email}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                    {sol.perros?.nombre ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {new Date(sol.created_at).toLocaleDateString('es-MX', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge estado={sol.estado} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/solicitudes/${sol.id}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Ver detalles
                    </Link>
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
