import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { UpdateStatusButton } from './UpdateStatusButton'
import type { Solicitud, EstadoSolicitud } from '@/lib/types'

function Field({ label, value }: { label: string; value: string | boolean | null | undefined }) {
  const display =
    value === null || value === undefined || value === ''
      ? '—'
      : value === true
      ? 'Sí ✓'
      : value === false
      ? 'No'
      : String(value)
  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className={`text-sm ${display === '—' ? 'text-gray-300' : 'text-gray-800 font-medium'}`}>{display}</p>
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <span>{icon}</span>
        <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}

function FullField({ label, value }: { label: string; value: string | boolean | null | undefined }) {
  const display =
    value === null || value === undefined || value === ''
      ? '—'
      : value === true ? 'Sí ✓'
      : value === false ? 'No'
      : String(value)
  return (
    <div className="sm:col-span-2">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className={`text-sm leading-relaxed ${display === '—' ? 'text-gray-300' : 'text-gray-800'}`}>{display}</p>
    </div>
  )
}

export default async function SolicitudDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('solicitudes')
    .select('*, perros(id, nombre, foto_url, raza, edad)')
    .eq('id', id)
    .single()

  if (!data) notFound()
  const sol = data as Solicitud

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <Link href="/admin/solicitudes" className="text-sm text-gray-400 hover:text-gray-600">
          ← Volver a solicitudes
        </Link>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Solicitud de adopción</h1>
          <StatusBadge estado={sol.estado} />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Recibida el {new Date(sol.created_at).toLocaleDateString('es-MX', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </p>
      </div>

      <div className="space-y-4">
        {/* Perro */}
        {sol.perros && (
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-xs text-orange-500 uppercase font-semibold tracking-wide mb-1">Perro solicitado</p>
            <p className="font-bold text-orange-800 text-lg">{sol.perros.nombre}</p>
            {(sol.perros.raza || sol.perros.edad) && (
              <p className="text-sm text-orange-600">{[sol.perros.raza, sol.perros.edad].filter(Boolean).join(' · ')}</p>
            )}
          </div>
        )}

        {/* Información Personal */}
        <Section title="Información Personal" icon="👤">
          <Field label="Nombre y apellido" value={sol.nombre_adoptante} />
          <Field label="Edad" value={sol.edad} />
          <Field label="Correo electrónico" value={sol.email} />
          <Field label="Teléfono" value={sol.telefono} />
          <Field label="Ocupación" value={sol.ocupacion} />
          <FullField label="Dirección física" value={sol.direccion} />
        </Section>

        {/* Vivienda */}
        <Section title="Vivienda" icon="🏠">
          <Field label="Tipo de vivienda" value={sol.tipo_vivienda} />
          <Field label="Especificación (si otro)" value={sol.tipo_vivienda_otro} />
          <Field label="La vivienda es" value={sol.vivienda_es} />
          <Field label="Si alquilada, ¿permiten mascotas?" value={sol.alquiler_permite_mascotas} />
        </Section>

        {/* Espacio */}
        <Section title="Espacio para el Perrito" icon="🌿">
          <Field label="¿Dónde estará mayormente?" value={sol.donde_estara_perrito} />
          <Field label="Patio completamente verjado" value={sol.patio_verjado} />
          <Field label="Horas solo al día" value={sol.horas_solo} />
          <FullField label="¿Qué ocurrirá si se muda?" value={sol.que_ocurrira_si_mudas} />
        </Section>

        {/* Hogar */}
        <Section title="El Hogar" icon="👨‍👩‍👧">
          <Field label="Personas en el hogar" value={sol.personas_en_hogar} />
          <Field label="Niños (edades)" value={sol.hay_ninos_edades} />
          <Field label="Todos de acuerdo con adopción" value={sol.todos_de_acuerdo} />
          <Field label="Alguien alérgico a animales" value={sol.alguien_alergico} />
        </Section>

        {/* Mascotas */}
        <Section title="Experiencia con Mascotas" icon="🐾">
          <Field label="¿Ha tenido perros antes?" value={sol.ha_tenido_perros} />
          <Field label="¿Tiene otras mascotas actualmente?" value={sol.tiene_otras_mascotas} />
          <Field label="¿Mascotas esterilizadas/vacunadas?" value={sol.mascotas_esterilizadas} />
          <Field label="¿Tiene veterinario?" value={sol.tiene_veterinario} />
          <FullField label="¿Qué ocurrió con mascotas anteriores?" value={sol.que_ocurrio_con_ellos} />
        </Section>

        {/* Compromiso */}
        <Section title="Compromiso" icon="🤝">
          <Field label="¿Dispuesto a cubrir gastos veterinarios?" value={sol.dispuesto_gastos_vet} />
          <Field label="¿Consciente de responsabilidad?" value={sol.consciente_responsabilidad} />
          <Field label="Acepta necesidades de perros rescatados" value={sol.consciente_necesidades} />
          <FullField label="¿Dónde dormirá el perro?" value={sol.donde_dormira_perro} />
          <FullField label="Si el perro rompe algo o presenta problemas de conducta..." value={sol.que_haria_conducta} />
          <FullField label="Si en el futuro no puede con la responsabilidad..." value={sol.que_haria_no_puede} />
          <FullField label="Motivo que haría que no pudiese con la responsabilidad" value={sol.motivo_no_podria} />
        </Section>

        {/* Motivación */}
        <Section title="Motivación" icon="💛">
          <FullField label="¿Por qué desea adoptar?" value={sol.motivo} />
          <FullField label="¿Qué cualidades buscaba en un perrito?" value={sol.cualidades_buscadas} />
          <FullField label="Algo más que desee mencionar" value={sol.algo_mas} />
        </Section>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3 pt-2">
          <UpdateStatusButton solicitudId={sol.id} currentEstado={sol.estado as EstadoSolicitud} />
        </div>
      </div>
    </div>
  )
}
