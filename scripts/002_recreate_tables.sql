-- Drop existing tables (except sports)
DROP TABLE IF EXISTS public.registrations CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.players CASCADE;

-- Create players table
CREATE TABLE IF NOT EXISTS public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  roll_number text NOT NULL UNIQUE,
  year text NOT NULL,
  phone text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id uuid NOT NULL REFERENCES public.sports(id) ON DELETE CASCADE,
  section text NOT NULL,
  team_name text,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(sport_id, section)
);

-- Create registrations table
-- For solo sports: team_id can be NULL
-- For team sports: team_id is required
CREATE TABLE IF NOT EXISTS public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  sport_id uuid NOT NULL REFERENCES public.sports(id) ON DELETE CASCADE,
  is_captain boolean DEFAULT false,
  registered_at timestamp with time zone DEFAULT now(),
  UNIQUE(player_id, sport_id)
);

-- Enable RLS
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow insert players" ON public.players;
DROP POLICY IF EXISTS "Allow select own players" ON public.players;
DROP POLICY IF EXISTS "Allow insert teams" ON public.teams;
DROP POLICY IF EXISTS "Allow select teams" ON public.teams;
DROP POLICY IF EXISTS "Allow insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow select registrations" ON public.registrations;

-- Create policies for players
CREATE POLICY "Allow insert players"
  ON public.players FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select players"
  ON public.players FOR SELECT
  USING (true);

-- Create policies for teams
CREATE POLICY "Allow insert teams"
  ON public.teams FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select teams"
  ON public.teams FOR SELECT
  USING (true);

-- Create policies for registrations
CREATE POLICY "Allow insert registrations"
  ON public.registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select registrations"
  ON public.registrations FOR SELECT
  USING (true);
