-- Tienda Andina · esquema para Supabase
-- Cómo usarlo: en tu proyecto de Supabase abre "SQL Editor", pega todo este archivo y ejecútalo una vez.

-- ---------- Productos (lectura pública) ----------
create table if not exists public.products (
  id          bigint generated always as identity primary key,
  name        text not null,
  category    text not null,
  price       numeric(10, 2) not null check (price >= 0),
  stock       integer not null default 0 check (stock >= 0),
  icon        text,
  bg          text,
  description text,
  badge       text,
  image       text,
  popularity  integer not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Si ya habías ejecutado una versión anterior sin la columna image:
alter table public.products add column if not exists image text;

alter table public.products enable row level security;
drop policy if exists "Productos activos visibles para todos" on public.products;
create policy "Productos activos visibles para todos" on public.products
  for select using (active);

-- ---------- Pedidos (solo el servidor puede leer y escribir) ----------
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,
  status          text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  customer_name   text not null,
  email           text not null,
  address         text not null,
  district        text not null,
  items           jsonb not null,
  subtotal        numeric(10, 2) not null,
  shipping        numeric(10, 2) not null,
  total           numeric(10, 2) not null,
  culqi_charge_id text,
  error           text,
  created_at      timestamptz not null default now(),
  paid_at         timestamptz
);

-- Sin políticas: el público no puede ver ni crear pedidos. Solo la función /api/checkout (clave service_role).
alter table public.orders enable row level security;

-- ---------- Reserva y liberación de stock (atómicas) ----------
-- p_items: [{"id": 1, "q": 2}, ...]
create or replace function public.reserve_stock(p_items jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  it jsonb;
begin
  for it in select * from jsonb_array_elements(p_items) loop
    update products
       set stock = stock - (it->>'q')::int
     where id = (it->>'id')::bigint
       and active
       and stock >= (it->>'q')::int;
    if not found then
      raise exception 'SIN_STOCK:%', it->>'id';
    end if;
  end loop;
end;
$$;

create or replace function public.release_stock(p_items jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  it jsonb;
begin
  for it in select * from jsonb_array_elements(p_items) loop
    update products set stock = stock + (it->>'q')::int where id = (it->>'id')::bigint;
  end loop;
end;
$$;

-- Solo el servidor (service_role) puede mover stock.
revoke execute on function public.reserve_stock(jsonb) from public, anon, authenticated;
revoke execute on function public.release_stock(jsonb) from public, anon, authenticated;

-- ---------- Productos iniciales (los mismos de la demo) ----------
insert into public.products (name, category, price, stock, icon, bg, badge, popularity, description, image)
select * from (values
  ('Chompa de alpaca',     'Textiles', 189.00, 12, '🧶', '#f1d9c4', 'Nuevo',  9, 'Tejida a mano en Puno con fibra de alpaca 100%. Abriga sin pesar y no pica.', '/demos/tienda/img/chompa.webp'),
  ('Café de altura 500 g', 'Café',      42.00, 40, '☕', '#e6d3bf', 'Top',   10, 'Grano arábica de Villa Rica, tostado medio. Notas a chocolate y frutos rojos.', '/demos/tienda/img/cafe.webp'),
  ('Chocolate 70% cacao',  'Café',      18.00, 60, '🍫', '#ead1c1', null,     7, 'Cacao fino de aroma de Piura, endulzado con panela. Barra de 80 g.', '/demos/tienda/img/chocolate.webp'),
  ('Vasija de cerámica',   'Cerámica',  95.00,  6, '🏺', '#efd7b8', null,     5, 'Cerámica de Chulucanas pintada a mano. Cada pieza es única.', '/demos/tienda/img/vasija.webp'),
  ('Manta tejida',         'Textiles', 230.00,  5, '🧣', '#dbe6d6', null,     6, 'Manta de lana de oveja con diseños de Cusco. 1.5 × 2 m.', '/demos/tienda/img/manta.webp'),
  ('Taza artesanal',       'Cerámica',  35.00, 25, '🍵', '#e3dccb', 'Oferta', 8, 'Taza de gres esmaltada, apta para microondas. 350 ml.', '/demos/tienda/img/taza.webp'),
  ('Gorro chullo',         'Textiles',  55.00, 18, '🧢', '#f0dccd', null,     4, 'Chullo tradicional con orejeras, tejido en Huancavelica.', '/demos/tienda/img/chullo.webp'),
  ('Miel de eucalipto',    'Café',      28.00, 30, '🍯', '#f2e1b9', null,     3, 'Miel pura de eucalipto de Cajamarca, sin procesar. Frasco de 500 g.', '/demos/tienda/img/miel.webp')
) as v(name, category, price, stock, icon, bg, badge, popularity, description, image)
where not exists (select 1 from public.products);

