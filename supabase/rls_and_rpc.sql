-- supabase/rls_and_rpc.sql
-- Run once by hand (psql or the Supabase SQL editor) against the project DB.

-- 1. Row Level Security: enable + read-only policies for anon/authenticated
alter table public.player enable row level security;
alter table public.team   enable row level security;
alter table public.stint  enable row level security;

create policy "Public read access" on public.player
  for select to anon, authenticated using (true);
create policy "Public read access" on public.team
  for select to anon, authenticated using (true);
create policy "Public read access" on public.stint
  for select to anon, authenticated using (true);

-- Tables created by hand via psql don't automatically get the grants the
-- Supabase dashboard UI adds, so these are required even with RLS policies above.
grant usage on schema public to anon, authenticated;
grant select on public.player, public.team, public.stint to anon, authenticated;

-- 2. RPC function mirroring getSharedTeams (api/src/repositories/player.repository.js)
create or replace function public.get_shared_teams(player1_id bigint, player2_id bigint)
returns table (
  id bigint,
  full_name text,
  overlap_start date,
  overlap_end date
)
language sql
stable
security invoker
set search_path = public
as $$
  select
    t.id,
    t.full_name,
    greatest(s1.start_date, s2.start_date) as overlap_start,
    least(s1.end_date, s2.end_date) as overlap_end
  from stint s1
  join stint s2 on s1.team_id = s2.team_id
  join team t on t.id = s1.team_id
  where s1.player_id = player1_id
    and s2.player_id = player2_id
    and s1.start_date <= s2.end_date
    and s2.start_date <= s1.end_date
  order by overlap_start;
$$;

revoke all on function public.get_shared_teams(bigint, bigint) from public;
grant execute on function public.get_shared_teams(bigint, bigint) to anon, authenticated;
