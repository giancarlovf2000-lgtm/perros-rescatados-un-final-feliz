import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { UpdateStatusButton } from './UpdateStatusButton'
import type { Solicitud, EstadoSolicitud } from '@/lib/types'

export default async function SolicitudDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: solicitud } = await supabase
    .from('solicitudes')
    .select('*, perros(id, nombre, foto_url, raza, edad)')
    .eq('id', id)
    .single()

  if (!solicitud) notFound()

  const sol = solicitud as Solicitud & { perros: { nombre: string; raza: string; edad: string } | null }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/admin/solicitudes" className="text-sm text-gray-500 hover:text-gray-700">
          ← Volver a solicitudes
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-bold text-gray-900">Solicitud de adopción</h1>
          <StatusBadge estado={sol.estado} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Perro */}
        {sol.perros && (
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-xs text-orange-600 uppercase font-semibold tracking-wide mb-1">Perro solicitado</p>
            <p className="font-bold text-orange-800 text-lg">{sol.perros.nombre}</p>
            {(sol.perros.raza || sol.perros.edad) && (
              <p className="text-sm text-orange-600">
                {[sol.perros.raza, sol.perros.edad].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        )}

        {/* Adoptante */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
          <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Datos del adoptante</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Nombre</p>
              <p className="font-medium text-gray-800">{sol.nombre_adoptante}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Correo</p>
              <p className="font-medium text-gray-800">{sol.email}</p>
            </div>
            {sol.telefono && (
              <div>
                <p className="text-xs text-gray-400">Teléfono</p>
                <p className="font-medium text-gray-800">{sol.telefono}</p>
              </div>
            )}
            {sol.direccion && (
              <div>
                <p className="text-xs text-gray-400">Dirección</p>
                <p className="font-medium text-gray-800">{sol.direccion}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400">¿Otros animales?</p>
              <p className="font-medium text-gray-800">{sol.tiene_otros_animales ? 'Sí' : 'No'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">¿Tiene jardín?</p>
              <p className="font-medium text-gray-800">{sol.tiene_jardin ? 'Sí' : 'No'}</p>
            </div>
          </div>
          {sol.motivo && (
            <div className="mt-2 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Motivación para adoptar</p>
              <p className="text-gray-700 text-sm leading-relaxed">{sol.motivo}</p>
            </div>
          )}
        </div>

        {/* Metadata */}
        <p className="text-xs text-gray-400">
          Solicitud recibida el {new Date(sol.created_at).toLocaleDateString('es-MX', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </p>

        {/* Status actions */}
        <div className="flex gap-3 pt-2">
          <UpdateStatusButton solicitudId={sol.id} currentEstado={sol.estado as EstadoSolicitud} />
        </div>
      </div>
    </div>
  )
}
