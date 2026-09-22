-- Eifeler Kebaphaus · gerçek yorum sistemi için Supabase şeması
-- Supabase panelinde SQL Editor'a yapıştırıp "Run" deyin. Tek seferlik.

-- 1) Yönetici listesi: yalnızca burada yazan GitHub kullanıcı adları onaylayabilir/silebilir.
create table if not exists public.admins (
  github_login text primary key
);
insert into public.admins (github_login) values ('ubixdubi')
  on conflict do nothing;

-- 2) Yorumlar
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guest_name text not null check (char_length(guest_name) between 2 and 60),
  message text not null check (char_length(message) between 5 and 800),
  rating smallint check (rating between 1 and 5),
  photo_path text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'))
);

create index if not exists reviews_status_created_idx
  on public.reviews (status, created_at desc);

-- 3) Yardımcı: oturumdaki GitHub kullanıcısı yönetici mi?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where a.github_login = lower(coalesce(
      auth.jwt() -> 'user_metadata' ->> 'user_name',
      auth.jwt() -> 'user_metadata' ->> 'preferred_username'
    ))
  );
$$;

-- 4) Satır düzeyinde güvenlik
alter table public.reviews enable row level security;
alter table public.admins enable row level security;

-- Ziyaretçi yalnızca onaylanmış yorumları görür.
drop policy if exists reviews_public_read on public.reviews;
create policy reviews_public_read on public.reviews
  for select using (status = 'approved' or public.is_admin());

-- Ziyaretçi yalnızca "pending" olarak yorum ekleyebilir; kendi yorumunu onaylayamaz.
drop policy if exists reviews_public_insert on public.reviews;
create policy reviews_public_insert on public.reviews
  for insert with check (status = 'pending');

-- Onaylama / reddetme / silme yalnızca yöneticide.
drop policy if exists reviews_admin_update on public.reviews;
create policy reviews_admin_update on public.reviews
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists reviews_admin_delete on public.reviews;
create policy reviews_admin_delete on public.reviews
  for delete using (public.is_admin());

-- admins tablosunu kimse okumasın/yazmasın (fonksiyon security definer ile okuyor).
drop policy if exists admins_no_access on public.admins;
create policy admins_no_access on public.admins
  for select using (false);

-- 5) Fotoğraflar için depolama kovası
insert into storage.buckets (id, name, public)
values ('review-photos', 'review-photos', true)
on conflict (id) do update set public = true;

-- Ziyaretçi fotoğraf yükleyebilir, üzerine yazamaz; silme yalnızca yöneticide.
drop policy if exists review_photos_insert on storage.objects;
create policy review_photos_insert on storage.objects
  for insert with check (bucket_id = 'review-photos');

drop policy if exists review_photos_read on storage.objects;
create policy review_photos_read on storage.objects
  for select using (bucket_id = 'review-photos');

drop policy if exists review_photos_delete on storage.objects;
create policy review_photos_delete on storage.objects
  for delete using (bucket_id = 'review-photos' and public.is_admin());

-- Not: kova herkese açık okunabilir olduğu için onay bekleyen bir fotoğrafın
-- doğrudan adresini bilen biri görebilir; adresler hiçbir yerde listelenmez.
-- Tamamen kapalı olması gerekiyorsa kovayı private yapıp imzalı bağlantı
-- üreten bir Edge Function eklenmesi gerekir.
