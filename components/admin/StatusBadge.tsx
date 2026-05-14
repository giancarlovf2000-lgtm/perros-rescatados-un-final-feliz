import type { EstadoSolicitud } from '@/lib/types'

const config: Record<EstadoSolicitud, { label: string; className: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800' },
  aprobado: { label: 'Aprobado', className: 'bg-green-100 text-green-800' },
  rechazado: { label: 'Rechazado', className: 'bg-red-100 text-red-800' },
}

export function StatusBadge({ estado }: { estado: EstadoSolicitud }) {
  const { label, className } = config[estado]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
