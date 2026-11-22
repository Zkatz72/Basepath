-- supabase/search_players.sql
-- Adds accent-insensitive, full-name player search.
-- Run once by hand (psql or the Supabase SQL editor) against the project DB.

create extension if not exists unaccent with schema extensions;

create or replace function public.search_players(search text default '')
returns table (
  id bigint,
  reg_id text,
  first_name text,
  last_name text,
  suffix text,
  start_year integer,
  end_year integer
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  select
    id, reg_id, first_name, last_name, suffix, start_year, end_year
  from player
  where
    search = ''
    or unaccent(first_name || ' ' || last_name || ' ' || coalesce(suffix, ''))
       ilike unaccent('%' || search || '%')
  order by last_name, first_name
  limit 100;
$$;

revoke all on function public.search_players(text) from public;
grant execute on function public.search_players(text) to anon, authenticated;
