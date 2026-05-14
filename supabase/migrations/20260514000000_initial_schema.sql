-- Schema para Perros Rescatados - Un Final Feliz

-- Tabla de perros
CREATE TABLE perros (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre       text NOT NULL,
  raza         text,
  edad         text,
  genero       text CHECK (genero IN ('macho', 'hembra')),
  tamano       text CHECK (tamano IN ('pequeño', 'mediano', 'grande')),
  descripcion  text,
  foto_url     text,
  vacunado     boolean DEFAULT false,
  esterilizado boolean DEFAULT false,
  disponible   boolean DEFAULT true,
  created_at   timestamptz DEFAULT now()
);

-- Tabla de solicitudes de adopción
CREATE TABLE solicitudes (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  perro_id             uuid REFERENCES perros(id) ON DELETE SET NULL,
  nombre_adoptante     text NOT NULL,
  email                text NOT NULL,
  telefono             text,
  direccion            text,
  tiene_otros_animales boolean,
  tiene_jardin         boolean,
  motivo               text,
  estado               text DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
  created_at           timestamptz DEFAULT now()
);

-- RLS: Habilitar Row Level Security
ALTER TABLE perros ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitudes ENABLE ROW LEVEL SECURITY;

-- Políticas para perros
-- Cualquiera puede leer perros disponibles
CREATE POLICY "perros_select_public" ON perros
  FOR SELECT USING (true);

-- Solo admins autenticados pueden insertar/actualizar/eliminar
CREATE POLICY "perros_insert_admin" ON perros
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "perros_update_admin" ON perros
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "perros_delete_admin" ON perros
  FOR DELETE TO authenticated USING (true);

-- Políticas para solicitudes
-- Cualquiera puede enviar una solicitud
CREATE POLICY "solicitudes_insert_public" ON solicitudes
  FOR INSERT WITH CHECK (true);

-- Solo admins pueden leer y actualizar solicitudes
CREATE POLICY "solicitudes_select_admin" ON solicitudes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "solicitudes_update_admin" ON solicitudes
  FOR UPDATE TO authenticated USING (true);

-- Storage bucket (ejecutar en el dashboard de Supabase o via CLI)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('perros-fotos', 'perros-fotos', true);
-- CREATE POLICY "perros_fotos_select" ON storage.objects FOR SELECT USING (bucket_id = 'perros-fotos');
-- CREATE POLICY "perros_fotos_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'perros-fotos');
-- CREATE POLICY "perros_fotos_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'perros-fotos');
