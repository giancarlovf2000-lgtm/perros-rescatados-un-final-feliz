'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import type { Perro } from '@/lib/types'

const schema = z.object({
  nombre_adoptante: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  tiene_otros_animales: z.boolean(),
  tiene_jardin: z.boolean(),
  motivo: z.string().min(10, 'Por favor cuéntanos un poco más (mínimo 10 caracteres)'),
})

type FormData = z.infer<typeof schema>

interface AdoptionFormProps {
  perro: Perro
  onSuccess: () => void
  onCancel: () => void
}

export function AdoptionForm({ perro, onSuccess, onCancel }: AdoptionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tiene_otros_animales: false,
      tiene_jardin: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase
        .from('solicitudes')
        .insert({ ...data, perro_id: perro.id })

      if (insertError) throw insertError
      onSuccess()
    } catch (e) {
      setError('Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-orange-50 rounded-lg p-3 flex items-center gap-3">
        <span className="text-2xl">🐾</span>
        <div>
          <p className="text-sm text-gray-600">Solicitud de adopción para</p>
          <p className="font-bold text-orange-700">{perro.nombre}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="nombre_adoptante">Nombre completo *</Label>
          <Input id="nombre_adoptante" {...register('nombre_adoptante')} placeholder="Tu nombre" />
          {errors.nombre_adoptante && (
            <p className="text-xs text-red-500">{errors.nombre_adoptante.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input id="email" type="email" {...register('email')} placeholder="tu@email.com" />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" {...register('telefono')} placeholder="+52 000 000 0000" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="direccion">Dirección / Ciudad</Label>
          <Input id="direccion" {...register('direccion')} placeholder="Tu ciudad o dirección" />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register('tiene_otros_animales')} className="w-4 h-4 accent-orange-500" />
          <span className="text-sm">¿Tienes otros animales en casa?</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register('tiene_jardin')} className="w-4 h-4 accent-orange-500" />
          <span className="text-sm">¿Tienes jardín o patio?</span>
        </label>
      </div>

      <div className="space-y-1">
        <Label htmlFor="motivo">¿Por qué quieres adoptar a {perro.nombre}? *</Label>
        <Textarea
          id="motivo"
          {...register('motivo')}
          placeholder="Cuéntanos sobre ti y por qué serías el hogar perfecto..."
          rows={3}
        />
        {errors.motivo && (
          <p className="text-xs text-red-500">{errors.motivo.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-orange-500 hover:bg-orange-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        </Button>
      </div>
    </form>
  )
}
