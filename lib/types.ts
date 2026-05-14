export type Genero = 'macho' | 'hembra'
export type Tamano = 'pequeño' | 'mediano' | 'grande'
export type EstadoSolicitud = 'pendiente' | 'aprobado' | 'rechazado'

export interface Perro {
  id: string
  nombre: string
  raza: string | null
  edad: string | null
  genero: Genero | null
  tamano: Tamano | null
  descripcion: string | null
  foto_url: string | null
  vacunado: boolean
  esterilizado: boolean
  disponible: boolean
  created_at: string
}

export interface Solicitud {
  id: string
  perro_id: string | null
  nombre_adoptante: string
  email: string
  telefono: string | null
  direccion: string | null
  tiene_otros_animales: boolean | null
  tiene_jardin: boolean | null
  motivo: string | null
  estado: EstadoSolicitud
  created_at: string
  perros?: Pick<Perro, 'id' | 'nombre' | 'foto_url'>
}
