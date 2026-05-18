create table mensajes_foster (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text,
  telefono text,
  mensaje text not null,
  leido boolean not null default false,
  created_at timestamptz not null default now()
);

alter table mensajes_foster enable row level security;

create policy "public insert" on mensajes_foster
  for insert to anon with check (true);

create policy "admin read" on mensajes_foster
  for select to authenticated using (true);

create policy "admin update" on mensajes_foster
  for update to authenticated using (true);
