-- Create sports table
create table if not exists public.sports (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon text,
  description text,
  min_team_size integer default 1,
  max_team_size integer default 11,
  created_at timestamp with time zone default now()
);

-- Create teams table
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports(id) on delete cascade,
  section text not null,
  team_name text,
  created_at timestamp with time zone default now(),
  unique(sport_id, section)
);

-- Create players table
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  roll_number text not null unique,
  year text not null,
  created_at timestamp with time zone default now()
);

-- Create registrations table
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  sport_id uuid not null references public.sports(id) on delete cascade,
  registered_at timestamp with time zone default now(),
  unique(player_id, sport_id)
);

-- Enable RLS
alter table public.sports enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.registrations enable row level security;

-- Create policies for sports (read-only for everyone)
create policy "Allow public to read sports"
  on public.sports for select
  using (true);

-- Create policies for players (insert for registration, select own)
create policy "Allow insert players"
  on public.players for insert
  with check (true);

create policy "Allow select own players"
  on public.players for select
  using (true);

-- Create policies for teams (insert and select)
create policy "Allow insert teams"
  on public.teams for insert
  with check (true);

create policy "Allow select teams"
  on public.teams for select
  using (true);

-- Create policies for registrations (insert and select)
create policy "Allow insert registrations"
  on public.registrations for insert
  with check (true);

create policy "Allow select registrations"
  on public.registrations for select
  using (true);

-- Insert sports data
insert into public.sports (name, icon, description, min_team_size, max_team_size) values
  ('Cricket', '🏏', 'A bat-and-ball sport played between two teams of eleven players', 1, 11),
  ('Badminton Singles', '🏸', 'Individual badminton competition', 1, 1),
  ('Badminton Doubles', '🏸', 'Badminton competition in pairs', 2, 2),
  ('Volleyball', '🏐', 'A sport played between two teams across a net', 1, 12),
  ('Football Pickup', '⚽', 'Casual football game for all skill levels', 1, 11)
on conflict (name) do nothing;
