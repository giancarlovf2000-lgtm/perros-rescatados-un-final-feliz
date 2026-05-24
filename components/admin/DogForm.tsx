'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import type { Perro } from '@/lib/types'

interface DogFormProps {
  perro?: Perro
}

type PhotoEntry = { url: string; file?: File }

export function DogForm({ perro }: DogFormProps) {
  const router = useRouter()
  const mainInputRef = useRef<HTMLInputElement>(null)
  const additionalInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Main photo
  const [mainPreview, setMainPreview] = useState<string | null>(perro?.foto_url ?? null)
  const [mainFile, setMainFile] = useState<File | null>(null)

  // Additional photos: { url (preview or existing DB url), file? (undefined = already in DB) }
  const [additionalPhotos, setAdditionalPhotos] = useState<PhotoEntry[]>(
    (perro?.fotos_adicionales ?? []).filter(Boolean).map(url => ({ url }))
  )

  const [form, setForm] = useState({
    nombre: perro?.nombre ?? '',
    raza: perro?.raza ?? '',
    edad: perro?.edad ?? '',
    genero: perro?.genero ?? '',
    tamano: perro?.tamano ?? '',
    descripcion: perro?.descripcion ?? '',
    vacunado: perro?.vacunado ?? false,
    esterilizado: perro?.esterilizado ?? false,
    disponible: perro?.disponible ?? true,
  })

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMainFile(file)
    setMainPreview(URL.createObjectURL(file))
  }

  const handleAdditionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const newEntries = files.map(file => ({ url: URL.createObjectURL(file), file }))
    setAdditionalPhotos(prev => [...prev, ...newEntries])
    e.target.value = ''
  }

  const removeAdditional = (index: number) => {
    setAdditionalPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFile = async (file: File): Promise<string> => {
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('perros-fotos')
      .upload(path, file, { upsert: true })
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from('perros-fotos').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Upload main photo if new file selected
      let foto_url = perro?.foto_url ?? null
      if (mainFile) {
        foto_url = await uploadFile(mainFile)
      }

      // Upload any new additional photos, keep existing URLs
      const fotos_adicionales: string[] = []
      for (const entry of additionalPhotos) {
        if (entry.file) {
          const url = await uploadFile(entry.file)
          fotos_adicionales.push(url)
        } else {
          fotos_adicionales.push(entry.url)
        }
      }

      const payload = {
        nombre: form.nombre,
        raza: form.raza || null,
        edad: form.edad || null,
        genero: form.genero || null,
        tamano: form.tamano || null,
        descripcion: form.descripcion || null,
        vacunado: form.vacunado,
        esterilizado: form.esterilizado,
        disponible: form.disponible,
        foto_url,
        fotos_adicionales,
      }

      if (perro) {
        const { error: updateError } = await supabase
          .from('perros')
          .update(payload)
          .eq('id', perro.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('perros')
          .insert(payload)
        if (insertError) throw insertError
      }

      router.push('/admin/perros')
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al guardar el perro')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Foto principal */}
      <div className="space-y-2">
        <Label>Foto principal</Label>
        <div
          className="w-40 h-40 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors relative"
          onClick={() => mainInputRef.current?.click()}
        >
          {mainPreview ? (
            <Image src={mainPreview} alt="Preview" fill className="object-cover" />
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-3xl mb-1">📷</div>
              <div className="text-xs">Subir foto</div>
            </div>
          )}
        </div>
        <input
          ref={mainInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleMainFileChange}
        />
      </div>

      {/* Fotos adicionales */}
      <div className="space-y-2">
        <Label>Fotos adicionales</Label>
        <div className="flex flex-wrap gap-2">
          {additionalPhotos.map((entry, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <Image src={entry.url} alt="" fill className="object-cover" sizes="80px" />
              <button
                type="button"
                onClick={() => removeAdditional(i)}
                className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center leading-none hover:bg-black/80"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => additionalInputRef.current?.click()}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            <span className="text-2xl leading-none">+</span>
            <span className="text-xs mt-0.5">Añadir</span>
          </button>
        </div>
        <input
          ref={additionalInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleAdditionalChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            id="nombre"
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
            placeholder="Ej: Max"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="raza">Raza</Label>
          <Input
            id="raza"
            value={form.raza}
            onChange={e => setForm(f => ({ ...f, raza: e.target.value }))}
            placeholder="Ej: Labrador mixto"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="edad">Edad</Label>
          <Input
            id="edad"
            value={form.edad}
            onChange={e => setForm(f => ({ ...f, edad: e.target.value }))}
            placeholder="Ej: 2 años"
          />
        </div>

        <div className="space-y-1">
          <Label>Género</Label>
          <Select value={form.genero} onValueChange={v => setForm(f => ({ ...f, genero: v as string }))}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="macho">Macho</SelectItem>
              <SelectItem value="hembra">Hembra</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Tamaño</Label>
          <Select value={form.tamano} onValueChange={v => setForm(f => ({ ...f, tamano: v as string }))}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pequeño">Pequeño</SelectItem>
              <SelectItem value="mediano">Mediano</SelectItem>
              <SelectItem value="grande">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="descripcion">Descripción / Personalidad</Label>
        <Textarea
          id="descripcion"
          value={form.descripcion}
          onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
          placeholder="Cuéntanos sobre la personalidad y la historia de este perro..."
          rows={4}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.vacunado}
            onChange={e => setForm(f => ({ ...f, vacunado: e.target.checked }))}
            className="w-4 h-4 accent-orange-500"
          />
          <span className="text-sm font-medium">Vacunado</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.esterilizado}
            onChange={e => setForm(f => ({ ...f, esterilizado: e.target.checked }))}
            className="w-4 h-4 accent-orange-500"
          />
          <span className="text-sm font-medium">Esterilizado</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.disponible}
            onChange={e => setForm(f => ({ ...f, disponible: e.target.checked }))}
            className="w-4 h-4 accent-orange-500"
          />
          <span className="text-sm font-medium">Disponible para adopción</span>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : perro ? 'Guardar cambios' : 'Añadir perro'}
        </Button>
      </div>
    </form>
  )
}
