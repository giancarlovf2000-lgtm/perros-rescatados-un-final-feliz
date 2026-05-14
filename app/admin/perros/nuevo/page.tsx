import { DogForm } from '@/components/admin/DogForm'
import Link from 'next/link'

export default function NuevoPerroPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/perros" className="text-sm text-gray-500 hover:text-gray-700">
          ← Volver a perros
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Añadir nuevo perro</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <DogForm />
      </div>
    </div>
  )
}
