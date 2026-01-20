"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SportRegistrationModal from "@/components/sport-registration-modal";
import RulesModal from "@/components/rules-modal";

export interface Sport {
  id: string;
  name: string;
  icon: string;
  type: "solo" | "doubles" | "team";
  teamSize?: number;
  maxSubstitutes?: number;
  totalTeams?: number;
  maxTeams?: number;
  description: string;
  rules: string;
}

const MALE_SPORTS: Sport[] = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "🏏",
    type: "team",
    teamSize: 7,
    // maxSubstitutes: 1,
    totalTeams: 8,
    maxTeams: 16,
    description: "Match Format: Group Stage → Semi-Finals → Final",
    rules: `CRICKET - 7-A-SIDE FORMAT

Team Composition: 
• Squad size: 7 players  
• Players on field: 7

Match Duration:
• Group-Stage: 4 overs per innings  
• Semi-finals: 5 overs per innings  
• Final: 6 overs per innings  
• Each over consists of 6 legal deliveries

Scoring:
• Standard cricket scoring applies
• Boundaries: 4 runs (ball crosses boundary after bouncing)
• Six: 6 runs (ball crosses boundary without bouncing)
• Wide/No-Ball: 1 extra run + ball to be re-bowled

Bowling Rules:
• Group Stage: No player can bowl more than 1 over  
• Semi-finals: Only 1 player is allowed to bowl 2 overs  
• Final: Up to 2 players can bowl 2 overs each  

• Wide Ball:
  - Ball passing outside the wide line  
  - Bouncer above shoulder head height  

• Bouncer (Height Rule):
  - One bouncer above shoulder height is allowed per over  
  - Second bouncer above shoulder height in the same over = NO-BALL  

• No-Ball:
  - Free hit awarded to batting side
  - Overstepping  
  - Waist-high full toss  
  - Second bouncer above shoulder height  
  - Sledging or any interruption during bowler’s delivery action


Batting Rules:
• No Last Man standing - Innings ends when only 1 batsman remains.
• Declaration: If the batting team declares, the batsman at the crease will be considered out.

Dismissals:
• Bowled, Caught, Run Out, Hit Wicket
• Obstructing the field: OUT

General Rules:
• Toss winner chooses to bat or bowl
• No break between innings
• Umpire's decision is final
• Fair play and sportsmanship mandatory
• Any dangerous or unfair play will result in penalty/dismissal
• All other standard cricket rules are applicable unless specifically modified above`,
  },
  {
    id: "futsal",
    name: "Futsal",
    icon: "⚽",
    type: "team",
    teamSize: 8,
    maxSubstitutes: 2,
    totalTeams: 12,
    maxTeams: 16,
    description: "Match Format: Group Stage → Semi-Finals → Final",
    rules: `FUTSAL RULES & GUIDELINES

Team Composition:
• 6 players per team (1 goalkeeper + 5 outfield players)
• Maximum 2 substitutes
• Rolling substitutions allowed (unlimited)
• Substitution only during stoppage and with referee permission

Match Duration:
• Group Stage / Semi-Final: Two halves of 10 minutes each  
• Final: Two halves of 15 minutes each  
• Halftime break: 3 minutes for Group Stage / Semi-Final, 5 minutes for Final  
• Running clock (stops only for injuries or time-outs)  

Fouls & Free Kicks:
• No wall on free kicks wihtin the opponent half
• Yellow card: Caution, player continues
• Red card: Player sent off, team plays with one less player for 1 half

Goalkeeper Rules:
• Back-pass rule: Cannot pick up ball from teammate's deliberate kick (Penalty awarded to opponent)
• 4-second rule: Must release ball within 4 seconds of possession
• May act as outfield player

Kick-Ins & Restarts:
• Ball out of play: Kick-in (not throw-in) from touchline
• Kick-in must be taken within 10 seconds
• Opponent must be 5m away
• Corner kicks and goal kicks as per FIFA futsal rules

Scoring:
• Goal scored when entire ball crosses goal line between posts
• Goalkeeper cannot score by throwing ball directly

Prohibited Actions:
• Dangerous play
• Holding, pushing, or charging opponent
• Playing with raised foot near opponent's head

Discipline & Sportsmanship:
• Respect referee decisions
• No arguing or dissent
• Fair play and sporting conduct required at all times
• Violent conduct results in immediate red card and tournament ban`,
  },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    type: "team",
    teamSize: 6,
    // maxSubstitutes: 2,
    totalTeams: 10,
    maxTeams: 12,
    description: "Match Format: Knockout",
    rules: `VOLLEYBALL RULES

Team Composition:
• 6 players on court per team

Match Format:
• Knockout: Game point at 15  
  - In case of a tie: Team must score **2 consecutive points** to win  
• Semi-Final: Game point at 20  
  - In case of a tie: Both teams’ points reset to **15**, continue until a winner is decided  
• Final: Game point at 25  
  - In case of a tie: Both teams’ points reset to **20**, continue until a winner is decided  

Service Rules:
• Serve from behind the **service line** (blue line)  
• Ball must clear the net without touching it  
• If the serve hits the net but goes over, the play continues (let serve)  
• Server is allowed only **one attempt**  
• Court boundary lines are **white**; the blue line marks the service area

Playing the Ball:
• Each team can touch the ball a **maximum of 3 times** before sending it over the net  
• Blocks by front-row players at the net do not count as one of the 3 touches
• Same player cannot hit ball twice consecutively (except after block)
• You **cannot catch, carry, or throw** the ball.  
• The ball can be touched with any part of the body (including feet). 
• Ball can be played with any part of body
• Ball touching boundary line is IN

Net Rules:
• Players cannot touch net during play
• Reaching over net to attack allowed only after opponent's attack
• Blocking opponent's serve is NOT allowed
• Players cannot cross centerline completely (foot/hand over is OK)

Scoring:
• Rally scoring system (point on every serve)
• Team must win by 2 points
• No cap on maximum points

Faults:
• Four hits on one side
• Double contact by same player
• Ball lands out of bounds
• Net violation
• Foot fault on serve
• Reaching under net and interfering with opponent

Conduct:
• Respect referee decisions
• No unsportsmanlike conduct
• Disputes resolved by team captain only
• Repeated violations: Player expulsion`,
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    type: "solo",
    totalTeams: 24,
    maxTeams: 32,
    description: "Match Format: Knockout",
    rules: `BADMINTON SINGLES RULES

Match Format:
• Normal Matches: Single game to 15 points
  - 14 is game point
  - Must win by 2 points
• Semi-Final: Single game to 20 points
  - 20 is game point
  - Must win by 2 points
• Final: Best of 3 games
  - Each game to 20 points
  - Must win by 2 points

Scoring:
• Rally point scoring
• Point on every rally
• Winner of rally serves next

Service Rules:
• Only ONE serve per rally
• Serve must be diagonal
• Shuttle must be hit below the waist

General Rules:
• Shuttle landing on line is IN
• No double hit
• No touching the net
• All other standard badminton rules apply
`,
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    type: "doubles",
    teamSize: 2,
    totalTeams: 14,
    maxTeams: 16,
    description: "Match Format: Knockout",
    rules: `BADMINTON DOUBLES RULES

Match Format:
• Normal Matches: Single game to 15 points
  - 14 is game point
  - Must win by 2 points
• Semi-Final: Single game to 20 points
  - 20 is game point
  - Must win by 2 points
• Final: Best of 3 games
  - Each game to 20 points
  - Must win by 2 points

Scoring:
• Rally point scoring
• Point on every rally
• Winning pair serves next

Service Rules (Minimal):
• Only ONE serve per rally
• Serve must be diagonal
• Shuttle must be hit below the waist

General Rules:
• Shuttle landing on line is IN
• Same player cannot hit shuttle twice
• No touching the net
• All other standard badminton rules apply`,
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    type: "solo",
    totalTeams: 20,
    maxTeams: 32,
    description:
      "Match Format: Knockout",
    rules: `TABLE TENNIS SINGLES RULES

Match Format:
• Normal Matches: Single game to 15 points
  - 14 is game point (first to 15 wins)
  - Must win by 2 points
• Semi-Final: Single game to 20 points
  - 20 is game point (first to 20 wins)
  - Must win by 2 points
• Final: Best of 3 games, each game to 20 points
  - 20 is game point
  - Must win by 2 points
• 1-minute rest between games (Final only)

Service Rules:
• Service alternates every 2 points
• At deuce: Service alternates every point
• Ball must be visible to opponent before service
• Ball must be struck behind end line and above table surface
• Ball must bounce once on server's side, then opponent's side
• Service must be diagonal
• Ball touching net during service but landing correctly: LET (replay)

Scoring:
• Rally point scoring (point on every serve)
• Winner of rally scores point
• No second serves

During Rally:
• Ball must bounce once on your side before returning
• Ball touching net during rally and going over: Play continues
• Ball hitting edge of table: IN
• Ball hitting side of table: OUT

Faults (Opponent Scores):
• Ball bounces twice on your side
• Illegal service
• Touching table with free hand during rally
• Volleying ball (hitting before it bounces on your side)
• Double hit
• Ball hits you or your clothing before bouncing

Conduct:
• Respect umpire decisions
• No racket/ball abuse
• Fair play and sportsmanship required

Note:
• All other table tennis rules remain the same unless explicitly changed above.`,
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    type: "team",
    teamSize: 4,
    totalTeams: 6,
    maxTeams: 12,
    description: "Match Format: Knockout",
    rules: `RELAY RACE RULES

Team Format:
• 4 runners per team
• Total distance: 400 meters (4 × 100m)

Match Format:
• Knockout rounds
• Top 5 teams qualify for the Final

Race Rules:
• Each runner completes 100 meters
• Baton must be passed within exchange zone
• Baton must be handed, not thrown
• If baton is dropped, only the runner who dropped it may pick it up

Lane Rules:
• Teams must stay in their assigned lanes
• Leaving lane or obstructing another team = disqualification

Winning:
• Team whose final runner crosses the finish line first wins
• Baton must be carried to the finish line

Conduct:
• Follow official instructions
• No interference with other teams
• Officials’ decision is final
• All other standard relay race rules apply
`,
  },
  {
    id: "tug-of-war",
    name: "Tug of War",
    icon: "🔗",
    type: "team",
    teamSize: 5,
    // maxSubstitutes: 2,
    totalTeams: 5,
    maxTeams: 10,
    description: "Match Format: Knockout",
    rules: `TUG OF WAR RULES

Team Format:
• 5 vs 5 players

Match Format:
• Normal Matches: ONE pull only
• Semi-Final: Best of 3 pulls
• Final: Best of 5 pulls

Winning a Pull:
• Team wins when opponent is pulled past the center line

Rules:
• Pull starts only on referee signal
• No sitting or falling intentionally
• No wrapping rope around hands
• All players must pull fairly

Conduct:
• Referee’s decision is final
• Fair play and sportsmanship required
• All other standard tug of war rules apply
`,
  },
];

const FEMALE_SPORTS: Sport[] = [
  {
    id: "throwball",
    name: "Throwball",
    icon: "🎯",
    type: "team",
    teamSize: 7,
    maxSubstitutes: 2,
    totalTeams: 4,
    maxTeams: 8,
    description:
      "Match Format: Knockout",
    rules: `THROWBALL RULES

Team Format:
• 7 players on court per team

Match Format:
• Knockout tournament
• Normal Matches: Single match to 15 points
  - 14 is game point
  - Must win by 2 points
• Semi-Final: Single match to 20 points
  - Must win by 2 points
• Final: Single match to 25 points
  - Must win by 2 points

Scoring:
• Rally point scoring
• Point on every serve

Serving Rules (Minimal):
• Serve from behind end line
• Ball must be thrown over the net
• Only ONE serve attempt

Play Rules (Minimal):
• Ball must be caught and thrown
• Player must release ball within 3 seconds
• Only ONE catch per team
• Ball touching net is FAULT

General Rules:
• Players must stay in their court
• No touching the net
• All other standard throwball rules apply

Conduct:
• Referee decision is final
• Fair play and sportsmanship required
`,
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    type: "solo",
    totalTeams: 18,
    maxTeams: 32,
    description: "Match Format: Knockout",
    rules: `BADMINTON SINGLES RULES

Match Format:
• Normal Matches: Single game to 15 points
  - 14 is game point
  - Must win by 2 points
• Semi-Final: Single game to 20 points
  - 20 is game point
  - Must win by 2 points
• Final: Best of 3 games
  - Each game to 20 points
  - Must win by 2 points

Scoring:
• Rally point scoring
• Point on every rally
• Winner of rally serves next

Service Rules :
• Only ONE serve per rally
• Serve must be diagonal
• Shuttle must be hit below the waist

General Rules:
• Shuttle landing on line is IN
• No double hit
• No touching the net
• All other standard badminton rules apply
`,
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    type: "doubles",
    teamSize: 2,
    totalTeams: 10,
    maxTeams: 16,
    description: "Match Format: Knockout",
    rules: `BADMINTON DOUBLES RULES

Match Format:
• Normal Matches: Single game to 15 points
  - 14 is game point
  - Must win by 2 points
• Semi-Final: Single game to 20 points
  - 20 is game point
  - Must win by 2 points
• Final: Best of 3 games
  - Each game to 20 points
  - Must win by 2 points

Scoring:
• Rally point scoring
• Point on every rally
• Winning pair serves next

Service Rules:
• Only ONE serve per rally
• Serve must be diagonal
• Shuttle must be hit below the waist

General Rules:
• Shuttle landing on line is IN
• Same player cannot hit shuttle twice
• No touching the net
• All other standard badminton rules apply
`,
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    type: "solo",
    totalTeams: 15,
    maxTeams: 32,
    description: "Match Format: Knockout",
       rules: `TABLE TENNIS SINGLES RULES

Match Format:
• Normal Matches: Single game to 15 points
  - 14 is game point (first to 15 wins)
  - Must win by 2 points
• Semi-Final: Single game to 20 points
  - 20 is game point (first to 20 wins)
  - Must win by 2 points
• Final: Best of 3 games, each game to 20 points
  - 20 is game point
  - Must win by 2 points
• 1-minute rest between games (Final only)

Service Rules:
• Service alternates every 2 points
• At deuce: Service alternates every point
• Ball must be visible to opponent before service
• Ball must be struck behind end line and above table surface
• Ball must bounce once on server's side, then opponent's side
• Service must be diagonal
• Ball touching net during service but landing correctly: LET (replay)

Scoring:
• Rally point scoring (point on every serve)
• Winner of rally scores point
• No second serves

During Rally:
• Ball must bounce once on your side before returning
• Ball touching net during rally and going over: Play continues
• Ball hitting edge of table: IN
• Ball hitting side of table: OUT

Faults (Opponent Scores):
• Ball bounces twice on your side
• Illegal service
• Touching table with free hand during rally
• Volleying ball (hitting before it bounces on your side)
• Double hit
• Ball hits you or your clothing before bouncing

Conduct:
• Respect umpire decisions
• No racket/ball abuse
• Fair play and sportsmanship required

Note:
• All other table tennis rules remain the same unless explicitly changed above.`,
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    type: "team",
    teamSize: 4,
    totalTeams: 3,
    maxTeams: 10,
    description: "Match Format: Knockout",
    rules: `RELAY RACE RULES

Team Format:
• 4 runners per team
• Total distance: 400 meters (4 × 100m)

Match Format:
• Knockout rounds
• Top 5 teams qualify for the Final

Race Rules:
• Each runner completes 100 meters
• Baton must be passed within exchange zone
• Baton must be handed, not thrown
• If baton is dropped, only the runner who dropped it may pick it up

Lane Rules:
• Teams must stay in their assigned lanes
• Leaving lane or obstructing another team = disqualification

Winning:
• Team whose final runner crosses the finish line first wins
• Baton must be carried to the finish line

Conduct:
• Follow official instructions
• No interference with other teams
• Officials’ decision is final
• All other standard relay race rules apply
`,
  },
  {
    id: "tug-of-war",
    name: "Tug of War",
    icon: "🔗",
    type: "team",
    teamSize: 5,
    // maxSubstitutes: 2,
    totalTeams: 2,
    maxTeams: 8,
    description: "Match Format: Knockout",
    rules: `TUG OF WAR RULES

Team Format:
• 5 vs 5 players

Match Format:
• Normal Matches: ONE pull only
• Semi-Final: Best of 3 pulls
• Final: Best of 5 pulls

Winning a Pull:
• Team wins when opponent is pulled past the center line

Rules:
• Pull starts only on referee signal
• No sitting or falling intentionally
• No wrapping rope around hands
• All players must pull fairly

Conduct:
• Referee’s decision is final
• Fair play and sportsmanship required
• All other standard tug of war rules apply
`,
  },
];

const getSportTypeBadge = (type: string) => {
  const badges = {
    solo: {
      label: "SOLO",
      color: "bg-blue-500/20 text-blue-400 border-blue-400/50",
    },
    doubles: {
      label: "DOUBLES",
      color: "bg-purple-500/20 text-purple-400 border-purple-400/50",
    },
    team: {
      label: "TEAM",
      color: "bg-green-500/20 text-green-400 border-green-400/50",
    },
  };
  return badges[type as keyof typeof badges];
};

const getTeamSizeLabel = (sport: Sport) => {
  if (sport.type === "solo") return "Individual";
  if (sport.type === "doubles") return "2v2";
  return `${sport.teamSize}v${sport.teamSize}`;
};

export default function Sports() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [sportType, setSportType] = useState<
    "all" | "solo" | "doubles" | "team"
  >("all");
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const allSports = gender === "male" ? MALE_SPORTS : FEMALE_SPORTS;
  const sports =
    sportType === "all"
      ? allSports
      : allSports.filter((s) => s.type === sportType);

  const handleRegister = (sport: Sport) => {
    setSelectedSport(sport);
    setShowRegisterModal(true);
  };

  const handleViewRules = (sport: Sport) => {
    setSelectedSport(sport);
    setShowRulesModal(true);
  };

  const getSpotsRemaining = (sport: Sport) => {
    const remaining = (sport.maxTeams || 0) - (sport.totalTeams || 0);
    const percentage = ((sport.totalTeams || 0) / (sport.maxTeams || 1)) * 100;

    if (percentage >= 90)
      return { text: `Only ${remaining} spots left!`, color: "text-red-400" };
    if (percentage >= 70)
      return { text: `${remaining} spots remaining`, color: "text-yellow-400" };
    return { text: `${remaining} spots available`, color: "text-green-400" };
  };

  return (
    <section id="sports" className="relative py-20 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Featured <span className="text-cyan-400">Sports</span>
        </h2>

        {/* Filter Section */}
        <div className="flex flex-col items-center gap-6 mb-12">
          {/* Gender Filter */}
          <div className="inline-flex bg-slate-900/50 border border-slate-700 rounded-lg p-1">
            <button
              onClick={() => setGender("male")}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                gender === "male"
                  ? "bg-cyan-500 text-black glow-cyan"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender("female")}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                gender === "female"
                  ? "bg-magenta-500 text-white glow-magenta"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Female
            </button>
          </div>

          {/* Sport Type Filter */}
          <div className="inline-flex bg-slate-900/50 border border-slate-700 rounded-lg p-1 flex-wrap justify-center">
            <button
              onClick={() => setSportType("all")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                sportType === "all"
                  ? "bg-gradient-to-r from-cyan-500 to-magenta-500 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              All Sports
            </button>
            <button
              onClick={() => setSportType("team")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                sportType === "team"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Team
            </button>
            <button
              onClick={() => setSportType("doubles")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                sportType === "doubles"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Doubles
            </button>
            <button
              onClick={() => setSportType("solo")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                sportType === "solo"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Solo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport) => {
            const badge = getSportTypeBadge(sport.type);
            const spotsInfo = getSpotsRemaining(sport);

            return (
              <div
                key={sport.id}
                className="group p-6 rounded-lg border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:glow-cyan flex flex-col relative overflow-hidden"
              >
                {/* Diagonal Light Sweep Animation */}
                <div className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000 bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none scale-150" />

                {/* Header with Badge and Team Size */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded border ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 bg-slate-800 px-2 py-1 rounded">
                    {getTeamSizeLabel(sport)}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 relative z-10">{sport.icon}</div>

                {/* Sport Name */}
                <h3 className="text-xl font-bold text-cyan-300 mb-2 relative z-10">
                  {sport.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs mb-4 italic relative z-10">
                  {sport.description}
                </p>

                {/* Team Requirements (for team sports) */}
                {sport.type !== "solo" && (
                  <div className="text-xs text-gray-500 mb-6 flex-grow relative z-10">
                    <div>Team Size: {sport.teamSize} players</div>
                    {sport.maxSubstitutes && (
                      <div>Including {sport.maxSubstitutes} substitutes</div>
                    )}
                  </div>
                )}

                {sport.type === "solo" && (
                  <div className="flex-grow mb-6"></div>
                )}

                {/* Animated underline */}
                <div className="mb-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-all duration-300 relative z-10" />

                {/* Action Buttons */}
                <div className="flex gap-3 relative z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-magenta-400/50 text-magenta-300 bg-transparent hover:bg-magenta-500/10"
                    onClick={() => handleViewRules(sport)}
                  >
                    View Rules
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold glow-cyan"
                    onClick={() => handleRegister(sport)}
                  >
                    Register
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedSport && (
        <>
          <SportRegistrationModal
            sport={selectedSport}
            gender={gender}
            isOpen={showRegisterModal}
            onClose={() => {
              setShowRegisterModal(false);
              setSelectedSport(null);
            }}
          />
          <RulesModal
            sport={selectedSport}
            isOpen={showRulesModal}
            onClose={() => {
              setShowRulesModal(false);
              setSelectedSport(null);
            }}
          />
        </>
      )}
    </section>
  );
}
