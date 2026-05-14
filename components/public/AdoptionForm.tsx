'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import type { Perro } from '@/lib/types'

interface AdoptionFormProps {
  perro: Perro
  onSuccess: () => void
  onCancel: () => void
}

type FormState = Record<string, string | boolean>

function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  required,
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border text-sm transition-colors ${
              value === opt.value
                ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium'
                : 'border-gray-200 hover:border-orange-300 text-gray-600'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.value === value ? '●' : '○'} {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 pt-2">
      <div className="w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
        {number}
      </div>
      <h3 className="font-bold text-gray-800 text-base">{title}</h3>
    </div>
  )
}

const SI_NO = [{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }]

export function AdoptionForm({ perro, onSuccess, onCancel }: AdoptionFormProps) {
  const [form, setForm] = useState<FormState>({
    nombre_adoptante: '', edad: '', direccion: '', telefono: '', email: '', ocupacion: '',
    tipo_vivienda: '', tipo_vivienda_otro: '', vivienda_es: '', alquiler_permite_mascotas: '',
    donde_estara_perrito: '', patio_verjado: '', horas_solo: '', que_ocurrira_si_mudas: '',
    personas_en_hogar: '', hay_ninos_edades: '', todos_de_acuerdo: '', alguien_alergico: '',
    ha_tenido_perros: '', que_ocurrio_con_ellos: '', tiene_otras_mascotas: '', mascotas_esterilizadas: '',
    tiene_veterinario: '', dispuesto_gastos_vet: '', donde_dormira_perro: '', que_haria_conducta: '',
    que_haria_no_puede: '', motivo_no_podria: '', consciente_necesidades: false,
    consciente_responsabilidad: '', motivo: '', cualidades_buscadas: '', algo_mas: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const set = (key: string, value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!String(form.nombre_adoptante).trim()) e.nombre_adoptante = 'Requerido'
    if (!String(form.edad).trim()) e.edad = 'Requerido'
    if (!String(form.direccion).trim()) e.direccion = 'Requerido'
    if (!String(form.telefono).trim()) e.telefono = 'Requerido'
    if (!String(form.email).trim() || !String(form.email).includes('@')) e.email = 'Correo válido requerido'
    if (!String(form.ocupacion).trim()) e.ocupacion = 'Requerido'
    if (!String(form.tipo_vivienda)) e.tipo_vivienda = 'Requerido'
    if (!String(form.motivo).trim()) e.motivo = 'Requerido'
    if (!form.consciente_necesidades) e.consciente_necesidades = 'Debes confirmar este punto'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const supabase = createClient()
      const payload = { ...form, perro_id: perro.id }
      const { error } = await supabase.from('solicitudes').insert(payload)
      if (error) throw error
      onSuccess()
    } catch {
      setSubmitError('Hubo un error al enviar. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Intro */}
      <div className="text-center space-y-2 pb-2 border-b border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed">
          Adoptar es un acto de amor y compromiso para toda la vida.
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">
          Queremos asegurarnos de que cada uno de nuestros rescatados llegue al hogar correcto.
          Gracias por dar este paso.
        </p>
        <p className="text-xs text-gray-400 italic">
          Las adopciones se aprueban pensando siempre en el bienestar del perrito.
          Nos reservamos el derecho de aprobar la adopción según el bienestar del animal.
        </p>
      </div>

      {/* Perro seleccionado */}
      <div className="bg-orange-50 rounded-xl p-3 flex items-center gap-3">
        <span className="text-2xl">🐾</span>
        <div>
          <p className="text-xs text-orange-600">Solicitud de adopción para</p>
          <p className="font-bold text-orange-700">{perro.nombre}</p>
        </div>
      </div>

      {/* Sección 1: Información Personal */}
      <div className="border border-gray-100 rounded-xl p-4">
        <SectionHeader number={1} title="Información Personal" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="nombre_adoptante">Nombre y apellido <span className="text-red-500">*</span></Label>
            <Input id="nombre_adoptante" value={String(form.nombre_adoptante)} onChange={e => set('nombre_adoptante', e.target.value)} placeholder="Tu nombre completo" />
            {errors.nombre_adoptante && <p className="text-xs text-red-500">{errors.nombre_adoptante}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="edad">Edad <span className="text-red-500">*</span></Label>
            <Input id="edad" value={String(form.edad)} onChange={e => set('edad', e.target.value)} placeholder="Ej: 28" />
            {errors.edad && <p className="text-xs text-red-500">{errors.edad}</p>}
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="direccion">Dirección física completa <span className="text-red-500">*</span></Label>
            <Input id="direccion" value={String(form.direccion)} onChange={e => set('direccion', e.target.value)} placeholder="Calle, número, ciudad, estado" />
            {errors.direccion && <p className="text-xs text-red-500">{errors.direccion}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="telefono">Teléfono <span className="text-red-500">*</span></Label>
            <Input id="telefono" value={String(form.telefono)} onChange={e => set('telefono', e.target.value)} placeholder="+1 787 000 0000" />
            {errors.telefono && <p className="text-xs text-red-500">{errors.telefono}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Correo electrónico <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" value={String(form.email)} onChange={e => set('email', e.target.value)} placeholder="tu@email.com" />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="ocupacion">Ocupación <span className="text-red-500">*</span></Label>
            <Input id="ocupacion" value={String(form.ocupacion)} onChange={e => set('ocupacion', e.target.value)} placeholder="Ej: Maestra, Ingeniero, Estudiante..." />
            {errors.ocupacion && <p className="text-xs text-red-500">{errors.ocupacion}</p>}
          </div>
        </div>
      </div>

      {/* Sección 2: Vivienda */}
      <div className="border border-gray-100 rounded-xl p-4 space-y-4">
        <SectionHeader number={2} title="Vivienda" />
        <RadioGroup
          name="tipo_vivienda" label="Tipo de vivienda" required
          value={String(form.tipo_vivienda)}
          onChange={v => set('tipo_vivienda', v)}
          options={[
            { value: 'casa', label: 'Casa' },
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'walk-up', label: 'Walk-up' },
            { value: 'otro', label: 'Otro' },
          ]}
        />
        {errors.tipo_vivienda && <p className="text-xs text-red-500">{errors.tipo_vivienda}</p>}
        {form.tipo_vivienda === 'otro' && (
          <div className="space-y-1">
            <Label htmlFor="tipo_vivienda_otro">Especifica el tipo de vivienda</Label>
            <Input id="tipo_vivienda_otro" value={String(form.tipo_vivienda_otro)} onChange={e => set('tipo_vivienda_otro', e.target.value)} placeholder="Describe tu vivienda" />
          </div>
        )}
        <RadioGroup
          name="vivienda_es" label="La vivienda es:"
          value={String(form.vivienda_es)}
          onChange={v => set('vivienda_es', v)}
          options={[
            { value: 'propia', label: 'Propia' },
            { value: 'alquilada', label: 'Alquilada' },
            { value: 'familiar', label: 'Familiar' },
          ]}
        />
        {form.vivienda_es === 'alquilada' && (
          <RadioGroup
            name="alquiler_permite_mascotas" label="Si es alquilada, ¿permiten mascotas?"
            value={String(form.alquiler_permite_mascotas)}
            onChange={v => set('alquiler_permite_mascotas', v)}
            options={[
              { value: 'si', label: 'Sí' },
              { value: 'no', label: 'No' },
              { value: 'no_seguro', label: 'No estoy seguro(a)' },
            ]}
          />
        )}
      </div>

      {/* Sección 3: Espacio para el Perrito */}
      <div className="border border-gray-100 rounded-xl p-4 space-y-4">
        <SectionHeader number={3} title="Espacio para el Perrito" />
        <RadioGroup
          name="donde_estara_perrito" label="¿Dónde estará el perrito mayormente?"
          value={String(form.donde_estara_perrito)}
          onChange={v => set('donde_estara_perrito', v)}
          options={[
            { value: 'adentro', label: 'Mayoría del tiempo adentro' },
            { value: 'patio', label: 'Mayoría del tiempo en el patio' },
            { value: 'ambas', label: 'Ambas' },
          ]}
        />
        <RadioGroup
          name="patio_verjado" label="El patio está completamente verjado"
          value={String(form.patio_verjado)}
          onChange={v => set('patio_verjado', v)}
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
            { value: 'no_aplica', label: 'No aplica' },
          ]}
        />
        <div className="space-y-1">
          <Label htmlFor="horas_solo">¿Cuántas horas al día estaría solo el perro?</Label>
          <Input id="horas_solo" value={String(form.horas_solo)} onChange={e => set('horas_solo', e.target.value)} placeholder="Ej: 4 horas" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="que_ocurrira_si_mudas">¿Qué ocurrirá con el perro si te mudas?</Label>
          <Textarea id="que_ocurrira_si_mudas" value={String(form.que_ocurrira_si_mudas)} onChange={e => set('que_ocurrira_si_mudas', e.target.value)} rows={2} placeholder="Describe qué harías con el perro si tuvieras que mudarte" />
        </div>
      </div>

      {/* Sección 4: El Hogar */}
      <div className="border border-gray-100 rounded-xl p-4 space-y-4">
        <SectionHeader number={4} title="El Hogar" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="personas_en_hogar">¿Cuántas personas viven en el hogar?</Label>
            <Input id="personas_en_hogar" value={String(form.personas_en_hogar)} onChange={e => set('personas_en_hogar', e.target.value)} placeholder="Ej: 3" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="hay_ninos_edades">¿Hay niños? Indique edades</Label>
            <Input id="hay_ninos_edades" value={String(form.hay_ninos_edades)} onChange={e => set('hay_ninos_edades', e.target.value)} placeholder="Ej: 5 y 8 años, o No" />
          </div>
        </div>
        <RadioGroup
          name="todos_de_acuerdo" label="¿Todos los miembros del hogar están de acuerdo con la adopción?"
          value={String(form.todos_de_acuerdo)}
          onChange={v => set('todos_de_acuerdo', v)}
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
            { value: 'algunos', label: 'Algunos' },
          ]}
        />
        <RadioGroup
          name="alguien_alergico" label="¿Alguien en el hogar es alérgico a los animales?"
          value={String(form.alguien_alergico)}
          onChange={v => set('alguien_alergico', v)}
          options={SI_NO}
        />
      </div>

      {/* Sección 5: Experiencia con Mascotas */}
      <div className="border border-gray-100 rounded-xl p-4 space-y-4">
        <SectionHeader number={5} title="Experiencia con Mascotas" />
        <RadioGroup
          name="ha_tenido_perros" label="¿Has tenido perros anteriormente?"
          value={String(form.ha_tenido_perros)}
          onChange={v => set('ha_tenido_perros', v)}
          options={SI_NO}
        />
        {form.ha_tenido_perros === 'si' && (
          <div className="space-y-1">
            <Label htmlFor="que_ocurrio_con_ellos">¿Qué ocurrió con ellos?</Label>
            <Textarea id="que_ocurrio_con_ellos" value={String(form.que_ocurrio_con_ellos)} onChange={e => set('que_ocurrio_con_ellos', e.target.value)} rows={2} placeholder="Cuéntanos qué pasó con tus mascotas anteriores" />
          </div>
        )}
        <RadioGroup
          name="tiene_otras_mascotas" label="¿Actualmente tienes otras mascotas?"
          value={String(form.tiene_otras_mascotas)}
          onChange={v => set('tiene_otras_mascotas', v)}
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
            { value: 'no_aplica', label: 'No aplica' },
          ]}
        />
        {form.tiene_otras_mascotas === 'si' && (
          <RadioGroup
            name="mascotas_esterilizadas" label="¿Están esterilizadas y vacunadas?"
            value={String(form.mascotas_esterilizadas)}
            onChange={v => set('mascotas_esterilizadas', v)}
            options={[
              { value: 'si', label: 'Sí' },
              { value: 'no', label: 'No' },
              { value: 'algunas', label: 'Algunas' },
              { value: 'no_aplica', label: 'No aplica' },
            ]}
          />
        )}
        <RadioGroup
          name="tiene_veterinario" label="¿Tienes veterinario actualmente?"
          value={String(form.tiene_veterinario)}
          onChange={v => set('tiene_veterinario', v)}
          options={SI_NO}
        />
      </div>

      {/* Sección 6: Compromiso */}
      <div className="border border-gray-100 rounded-xl p-4 space-y-4">
        <SectionHeader number={6} title="Compromiso" />
        <RadioGroup
          name="dispuesto_gastos_vet" label="¿Estás dispuesto(a) a cubrir gastos veterinarios, vacunas y esterilización?"
          value={String(form.dispuesto_gastos_vet)}
          onChange={v => set('dispuesto_gastos_vet', v)}
          options={SI_NO}
        />
        <div className="space-y-1">
          <Label htmlFor="donde_dormira_perro">¿Dónde dormirá el perro?</Label>
          <Textarea id="donde_dormira_perro" value={String(form.donde_dormira_perro)} onChange={e => set('donde_dormira_perro', e.target.value)} rows={2} placeholder="Describe dónde dormirá el perro" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="que_haria_conducta">¿Qué harías si el perro rompe algo o presenta problemas de conducta?</Label>
          <Textarea id="que_haria_conducta" value={String(form.que_haria_conducta)} onChange={e => set('que_haria_conducta', e.target.value)} rows={2} placeholder="Tu respuesta..." />
        </div>
        <div className="space-y-1">
          <Label htmlFor="que_haria_no_puede">¿Qué harías si en el futuro no puedes con la responsabilidad?</Label>
          <Textarea id="que_haria_no_puede" value={String(form.que_haria_no_puede)} onChange={e => set('que_haria_no_puede', e.target.value)} rows={2} placeholder="Tu respuesta..." />
        </div>
        <div className="space-y-1">
          <Label htmlFor="motivo_no_podria">¿Qué motivo haría que usted no pudiese con la responsabilidad?</Label>
          <Textarea id="motivo_no_podria" value={String(form.motivo_no_podria)} onChange={e => set('motivo_no_podria', e.target.value)} rows={2} placeholder="Tu respuesta..." />
        </div>
        <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border transition-colors ${
          form.consciente_necesidades ? 'border-orange-400 bg-orange-50' : 'border-gray-200'
        }`}>
          <input
            type="checkbox"
            checked={Boolean(form.consciente_necesidades)}
            onChange={e => set('consciente_necesidades', e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-orange-500 flex-shrink-0"
          />
          <span className="text-sm text-gray-700">
            ¿Estás consciente que los perritos rescatados necesitan tiempo, paciencia y amor para adaptarse en su nuevo hogar?
          </span>
        </label>
        {errors.consciente_necesidades && <p className="text-xs text-red-500">{errors.consciente_necesidades}</p>}
        <RadioGroup
          name="consciente_responsabilidad" label="¿Estás consciente de la responsabilidad que conlleva tener una mascota?"
          value={String(form.consciente_responsabilidad)}
          onChange={v => set('consciente_responsabilidad', v)}
          options={SI_NO}
        />
      </div>

      {/* Sección 7: Motivación */}
      <div className="border border-gray-100 rounded-xl p-4 space-y-4">
        <SectionHeader number={7} title="Motivación" />
        <div className="space-y-1">
          <Label htmlFor="motivo">¿Por qué deseas adoptar? <span className="text-red-500">*</span></Label>
          <Textarea id="motivo" value={String(form.motivo)} onChange={e => set('motivo', e.target.value)} rows={3} placeholder="Cuéntanos por qué quieres adoptar..." />
          {errors.motivo && <p className="text-xs text-red-500">{errors.motivo}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="cualidades_buscadas">¿Qué cualidades buscabas en un perrito?</Label>
          <Textarea id="cualidades_buscadas" value={String(form.cualidades_buscadas)} onChange={e => set('cualidades_buscadas', e.target.value)} rows={2} placeholder="Ej: Tranquilo, juguetón, bueno con niños..." />
        </div>
        <div className="space-y-1">
          <Label htmlFor="algo_mas">¿Algo más que desees mencionar?</Label>
          <Textarea id="algo_mas" value={String(form.algo_mas)} onChange={e => set('algo_mas', e.target.value)} rows={2} placeholder="Cualquier información adicional..." />
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{submitError}</p>
      )}

      <div className="flex gap-3 pb-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 font-semibold" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        </Button>
      </div>
    </form>
  )
}
