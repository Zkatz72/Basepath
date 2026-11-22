# BasePath

A daily baseball connections game: given a starting player and a goal player, find
a chain of **teammates** that connects one to the other.

## How to Play

Each day, BasePath gives you two players — a **starting player** and a **goal
player**. Your job is to travel from one to the other using only *connected*
players.

Two players are **connected** if they played for the **same team at the same
time** — you don't need to know which team, just name a teammate of your current
player and keep going. It's possible for two players to be connected without ever
having appeared in the same game together (e.g. one was a pinch hitter who never
faced the other's position), as long as their time on the roster overlapped.

- **Total bases** — your correct guesses.
- **Outs** — your incorrect guesses (not a teammate of your current player).

A new puzzle unlocks once per day. Player eras and roster overlaps come straight
from each player's career **stints** (the team(s) and date range(s) they played
for); a stint with a missing start or end date is assumed to span the entire
season.

## Data Source

All player, team, and roster data is sourced from **[Baseball Reference](https://www.baseball-reference.com/)®**.
Raw per-player career data is cleaned and merged by [`scripts/mergeData.py`](scripts/mergeData.py)
and loaded into Postgres by [`seeder/seed.js`](seeder/seed.js), which builds out
three tables:

- **`player`** — identity info (name, career start/end year, games batted/pitched).
- **`team`** — franchise names.
- **`stint`** — the join table: which player played for which team, and when
  (derived from each player's year-by-year team history).

## How It's Built

- **Frontend**: React (Create React App) + MUI, deployed to GitHub Pages.
- **Data access**: the frontend talks to **Supabase** directly (via
  [`@supabase/supabase-js`](https://supabase.com/docs/reference/javascript)) —
  no backend server sits in the request path. Simple lookups (search, player
  detail) are plain PostgREST table queries; the "are these two players
  connected" check is a Postgres RPC function (`get_shared_teams`) that joins
  overlapping `stint` rows, since that logic can't be expressed as a plain table
  read. Player search is likewise backed by an RPC (`search_players`) that
  matches on the full name, accent-insensitively.
- **Security**: the DB is exposed read-only. Row Level Security policies grant
  `SELECT` only on `player`/`team`/`stint`, and the two RPC functions are the
  only callable write-adjacent surface (and they're read-only themselves). The
  frontend only ever holds the public anon/publishable key — see
  [`supabase/`](supabase/) for the exact SQL.
- **Legacy API**: [`api/`](api/) is a small Express + `pg` server that predates
  the direct-to-Supabase setup. It's kept in the repo as a local/offline
  fallback but isn't used by the deployed frontend.

## Project Structure

```
src/                  React app
  components/         UI components (search, cards, modals, app bar)
  services/           Supabase client + data-access functions
src/games.json         Precomputed daily puzzles (start/goal player pairs)
supabase/              SQL run by hand against the Supabase project
                       (RLS policies, RPC functions)
api/                   Legacy Express/Postgres API (unused by the deployed app)
seeder/                Scripts + raw data for seeding Postgres
scripts/               One-off data-cleaning scripts
```

## Running Locally

```bash
npm install
npm start
```

You'll need a `.env` with:

```
REACT_APP_SUPABASE_URL=<your Supabase project URL>
REACT_APP_SUPABASE_ANON_KEY=<your Supabase anon/publishable key>
```

## Deploying

```bash
npm run deploy
```

Builds the app and publishes it to GitHub Pages via `gh-pages`.

---

Created by Zachary Katz. All data provided by Baseball Reference®.
