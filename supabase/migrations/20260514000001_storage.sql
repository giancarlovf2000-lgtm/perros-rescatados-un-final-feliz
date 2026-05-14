INSERT INTO storage.buckets (id, name, public) VALUES ('perros-fotos', 'perros-fotos', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "perros_fotos_select" ON storage.objects FOR SELECT USING (bucket_id = 'perros-fotos');
CREATE POLICY "perros_fotos_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'perros-fotos');
CREATE POLICY "perros_fotos_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'perros-fotos');
