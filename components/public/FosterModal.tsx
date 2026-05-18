'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function FosterModal() {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: dbError } = await supabase
      .from('mensajes_foster')
      .insert({ nombre, email: email || null, telefono: telefono || null, mensaje })

    setLoading(false)
    if (dbError) {
      setError('Hubo un problema al enviar tu mensaje. Intenta de nuevo.')
    } else {
      setSuccess(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setNombre('')
    setEmail('')
    setTelefono('')
    setMensaje('')
    setSuccess(false)
    setError('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
      >
        Quiero ser Foster 🐾
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-6 sm:p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {success ? (
              <div className="text-center py-6 space-y-4">
                <div className="text-5xl">🐾</div>
                <h2 className="text-2xl font-bold text-amber-900">¡Gracias por tu interés!</h2>
                <p className="text-gray-600 leading-relaxed">
                  Recibimos tu mensaje. Nos pondremos en contacto contigo pronto para contarte
                  más sobre cómo puedes ser un Ángel Cuidador.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-amber-900">Quiero ser Foster 🐾</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Cuéntanos sobre ti y nos pondremos en contacto.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                        placeholder="+1 (000) 000-0000"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ¿Por qué quieres ser foster? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={mensaje}
                      onChange={e => setMensaje(e.target.value)}
                      placeholder="Cuéntanos sobre tu hogar, si tienes mascotas, tu disponibilidad de tiempo..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-full transition-all"
                  >
                    {loading ? 'Enviando...' : 'Enviar mensaje 🐾'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
