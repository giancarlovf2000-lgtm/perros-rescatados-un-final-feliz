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

export interface MensajeFoster {
  id: string
  nombre: string
  email: string | null
  telefono: string | null
  mensaje: string
  leido: boolean
  created_at: string
}

export interface Solicitud {
  id: string
  perro_id: string | null
  // Personal
  nombre_adoptante: string
  email: string
  telefono: string | null
  direccion: string | null
  edad: string | null
  ocupacion: string | null
  // Vivienda
  tipo_vivienda: string | null
  tipo_vivienda_otro: string | null
  vivienda_es: string | null
  alquiler_permite_mascotas: string | null
  // Espacio
  donde_estara_perrito: string | null
  patio_verjado: string | null
  horas_solo: string | null
  que_ocurrira_si_mudas: string | null
  // Hogar
  personas_en_hogar: string | null
  hay_ninos_edades: string | null
  todos_de_acuerdo: string | null
  alguien_alergico: string | null
  // Mascotas anteriores
  ha_tenido_perros: string | null
  que_ocurrio_con_ellos: string | null
  tiene_otras_mascotas: string | null
  mascotas_esterilizadas: string | null
  tiene_veterinario: string | null
  // Compromiso
  dispuesto_gastos_vet: string | null
  donde_dormira_perro: string | null
  que_haria_conducta: string | null
  que_haria_no_puede: string | null
  motivo_no_podria: string | null
  consciente_necesidades: boolean | null
  consciente_responsabilidad: string | null
  // Motivación
  motivo: string | null
  cualidades_buscadas: string | null
  algo_mas: string | null
  // Meta
  estado: EstadoSolicitud
  created_at: string
  perros?: Pick<Perro, 'id' | 'nombre' | 'foto_url' | 'raza' | 'edad'>
}
