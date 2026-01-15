-- ====================
-- HELPFUL VIEWS TO MAKE QUERYING EASY
-- ====================

-- View 1: Complete Registration Details
-- Shows all registrations with player, team, and sport info
CREATE OR REPLACE VIEW public.registration_details AS
SELECT 
  r.id as registration_id,
  r.registered_at,
  r.is_captain,
  -- Player info
  p.id as player_id,
  p.name as player_name,
  p.email as player_email,
  p.roll_number as player_roll_no,
  p.year as player_year,
  p.phone as player_phone,
  -- Sport info
  s.id as sport_id,
  s.name as sport_name,
  s.icon as sport_icon,
  -- Team info (will be NULL for solo sports)
  t.id as team_id,
  t.team_name,
  t.section
FROM public.registrations r
JOIN public.players p ON r.player_id = p.id
JOIN public.sports s ON r.sport_id = s.id
LEFT JOIN public.teams t ON r.team_id = t.id;

-- View 2: Team Summary (only for team/doubles sports)
-- Shows teams with their section and sport
CREATE OR REPLACE VIEW public.team_summary AS
SELECT 
  t.id as team_id,
  t.team_name,
  t.section,
  s.id as sport_id,
  s.name as sport_name,
  s.icon as sport_icon,
  COUNT(r.id) as total_players,
  t.created_at
FROM public.teams t
JOIN public.sports s ON t.sport_id = s.id
LEFT JOIN public.registrations r ON r.team_id = t.id
GROUP BY t.id, t.team_name, t.section, s.id, s.name, s.icon, t.created_at;

-- View 3: Captain Info (for easy captain lookup)
CREATE OR REPLACE VIEW public.team_captains AS
SELECT 
  t.id as team_id,
  t.team_name,
  t.section,
  s.name as sport_name,
  p.name as captain_name,
  p.email as captain_email,
  p.roll_number as captain_roll_no,
  p.phone as captain_phone
FROM public.registrations r
JOIN public.players p ON r.player_id = p.id
JOIN public.teams t ON r.team_id = t.id
JOIN public.sports s ON t.sport_id = s.id
WHERE r.is_captain = true;


-- ====================
-- USEFUL QUERIES
-- ====================

-- Query 1: Get all teams registered for "Badminton Doubles" with their players
-- Replace 'Badminton Doubles' with any sport name
SELECT 
  team_name,
  section,
  player_name,
  player_roll_no,
  player_email,
  CASE WHEN is_captain THEN 'Captain' ELSE 'Member' END as role
FROM registration_details
WHERE sport_name = 'Badminton Doubles'
ORDER BY section, team_name, is_captain DESC;

-- Query 2: Get all teams for a specific sport with player count
-- Replace 'Cricket' with any sport name
SELECT 
  team_name,
  section,
  total_players
FROM team_summary
WHERE sport_name = 'Cricket'
ORDER BY section;

-- Query 3: Get detailed team roster (all players grouped by team)
-- Replace 'Cricket' with any sport name
SELECT 
  section,
  team_name,
  STRING_AGG(
    player_name || ' (' || player_roll_no || ')' || 
    CASE WHEN is_captain THEN ' - Captain' ELSE '' END, 
    ', ' ORDER BY is_captain DESC
  ) as players
FROM registration_details
WHERE sport_name = 'Cricket'
GROUP BY section, team_name
ORDER BY section;

-- Query 4: Get all solo sport registrations
-- Shows individual players registered for solo sports
SELECT 
  sport_name,
  section,
  player_name,
  player_roll_no,
  player_email,
  player_phone,
  registered_at
FROM registration_details
WHERE team_id IS NULL
ORDER BY sport_name, section, player_name;

-- Query 5: Count registrations by sport
SELECT 
  sport_name,
  COUNT(DISTINCT CASE WHEN team_id IS NULL THEN player_id ELSE NULL END) as solo_players,
  COUNT(DISTINCT team_id) as teams,
  COUNT(*) as total_registrations
FROM registration_details
GROUP BY sport_name
ORDER BY sport_name;

-- Query 6: Get captain contact details for a specific sport
-- Replace 'Volleyball' with any sport name
SELECT 
  team_name,
  section,
  captain_name,
  captain_email,
  captain_phone,
  captain_roll_no
FROM team_captains
WHERE sport_name = 'Volleyball'
ORDER BY section;

-- Query 7: Get all players from a specific section
-- Replace 'FESE-A' with any section
SELECT 
  sport_name,
  team_name,
  player_name,
  player_roll_no,
  CASE WHEN is_captain THEN 'Yes' ELSE 'No' END as is_captain
FROM registration_details
WHERE section = 'FESE-A'
ORDER BY sport_name, team_name;

-- Query 8: Find which sports a specific student is registered for
-- Replace 'SE-23086' with any roll number
SELECT 
  sport_name,
  section,
  team_name,
  CASE WHEN is_captain THEN 'Captain' ELSE 'Member' END as role,
  registered_at
FROM registration_details
WHERE player_roll_no = 'SE-23086'
ORDER BY registered_at DESC;

-- ====================
-- GRANT PERMISSIONS TO VIEWS
-- ====================
GRANT SELECT ON public.registration_details TO authenticated, anon;
GRANT SELECT ON public.team_summary TO authenticated, anon;
GRANT SELECT ON public.team_captains TO authenticated, anon;
