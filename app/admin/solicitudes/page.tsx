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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {/* Encabezado de columnas (solo desktop) */}
          <div className="hidden md:flex items-center gap-4 px-5 py-3 bg-gray-50 text-xs font-medium text-gray-600 rounded-t-xl">
            <span className="flex-1">Adoptante</span>
            <span className="w-40">Perro</span>
            <span className="w-32">Fecha</span>
            <span className="w-28">Estado</span>
            <span className="w-28 text-right">&nbsp;</span>
          </div>

          {(solicitudes as Solicitud[]).map(sol => (
            <Link
              key={sol.id}
              href={`/admin/solicitudes/${sol.id}`}
              className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              {/* Adoptante */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{sol.nombre_adoptante}</div>
                <div className="text-gray-400 text-xs truncate">{sol.email}</div>
              </div>

              {/* Perro */}
              <div className="text-sm text-gray-600 md:w-40">
                <span className="md:hidden text-gray-400">Perro: </span>
                {sol.perros?.nombre ?? '—'}
              </div>

              {/* Fecha */}
              <div className="text-sm text-gray-500 md:w-32">
                <span className="md:hidden text-gray-400">Fecha: </span>
                {new Date(sol.created_at).toLocaleDateString('es-MX', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </div>

              {/* Estado + acción */}
              <div className="flex items-center justify-between gap-3 md:w-56 md:justify-start">
                <div className="md:w-28">
                  <StatusBadge estado={sol.estado} />
                </div>
                <span className="text-xs font-medium text-blue-600 whitespace-nowrap md:w-28 md:text-right">
                  Ver detalles →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
