// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import SportRegistrationModal from "@/components/sport-registration-modal"
// import RulesModal from "@/components/rules-modal"

// interface Sport {
//   id: string
//   name: string
//   icon: string
//   description: string
// }

// const MALE_SPORTS: Sport[] = [
//   { id: "cricket", name: "Cricket", icon: "🏏", description: "Fast-paced team sport combining strategy and skill" },
//   { id: "futsal", name: "Futsal", icon: "⚽", description: "Indoor football with fast-paced action and teamwork" },
//   {
//     id: "volleyball",
//     name: "Volleyball",
//     icon: "🏐",
//     description: "Dynamic team sport requiring agility and communication",
//   },
//   {
//     id: "badminton-singles",
//     name: "Badminton Singles",
//     icon: "🏸",
//     description: "Individual competition with speed and precision",
//   },
//   {
//     id: "badminton-doubles",
//     name: "Badminton Doubles",
//     icon: "👥",
//     description: "Doubles competition testing coordination and teamwork",
//   },
//   {
//     id: "table-tennis-singles",
//     name: "Table Tennis Singles",
//     icon: "🏓",
//     description: "Fast-paced individual sport requiring precision and reflexes",
//   },
//   {
//     id: "relay-race",
//     name: "Relay Race",
//     icon: "🏃",
//     description: "Team sprint race combining speed and coordination",
//   },
//   { id: "tug-of-war", name: "Tug of War", icon: "🔗", description: "Team strength competition requiring coordination" },
// ]

// const FEMALE_SPORTS: Sport[] = [
//   {
//     id: "throwball",
//     name: "Throwball",
//     icon: "🎯",
//     description: "Team sport combining throwing accuracy and strategy",
//   },
//   {
//     id: "badminton-singles",
//     name: "Badminton Singles",
//     icon: "🏸",
//     description: "Individual competition with speed and precision",
//   },
//   {
//     id: "badminton-doubles",
//     name: "Badminton Doubles",
//     icon: "👥",
//     description: "Doubles competition testing coordination and teamwork",
//   },
//   {
//     id: "table-tennis-singles",
//     name: "Table Tennis Singles",
//     icon: "🏓",
//     description: "Fast-paced individual sport requiring precision and reflexes",
//   },
//   {
//     id: "relay-race",
//     name: "Relay Race",
//     icon: "🏃",
//     description: "Team sprint race combining speed and coordination",
//   },
//   { id: "tug-of-war", name: "Tug of War", icon: "🔗", description: "Team strength competition requiring coordination" },
// ]

// export default function Sports() {
//   const [gender, setGender] = useState<"male" | "female">("male")
//   const [selectedSport, setSelectedSport] = useState<Sport | null>(null)
//   const [showRegisterModal, setShowRegisterModal] = useState(false)
//   const [showRulesModal, setShowRulesModal] = useState(false)

//   const sports = gender === "male" ? MALE_SPORTS : FEMALE_SPORTS

//   const handleRegister = (sport: Sport) => {
//     setSelectedSport(sport)
//     setShowRegisterModal(true)
//   }

//   const handleViewRules = (sport: Sport) => {
//     setSelectedSport(sport)
//     setShowRulesModal(true)
//   }

//   return (
//     <section id="sports" className="relative py-20 md:py-32 px-4 bg-background">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
//           Featured <span className="text-cyan-400">Sports</span>
//         </h2>

//         <div className="flex justify-center mb-12">
//           <div className="inline-flex bg-slate-900/50 border border-slate-700 rounded-lg p-1">
//             <button
//               onClick={() => setGender("male")}
//               className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
//                 gender === "male" ? "bg-cyan-500 text-black glow-cyan" : "text-gray-400 hover:text-gray-300"
//               }`}
//             >
//               Male
//             </button>
//             <button
//               onClick={() => setGender("female")}
//               className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
//                 gender === "female" ? "bg-magenta-500 text-white glow-magenta" : "text-gray-400 hover:text-gray-300"
//               }`}
//             >
//               Female
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {sports.map((sport) => (
//             <div
//               key={sport.id}
//               className="group p-6 rounded-lg border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:glow-cyan flex flex-col"
//             >
//               {/* Icon */}
//               <div className="text-5xl mb-4">{sport.icon}</div>

//               {/* Sport Name */}
//               <h3 className="text-xl font-bold text-cyan-300 mb-2">{sport.name}</h3>

//               {/* Description */}
//               <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{sport.description}</p>

//               {/* Animated underline */}
//               <div className="mb-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-all duration-300" />

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex-1 border-magenta-400/50 text-magenta-300 hover:bg-magenta-500/10 bg-transparent"
//                   onClick={() => handleViewRules(sport)}
//                 >
//                   View Rules
//                 </Button>
//                 <Button
//                   size="sm"
//                   className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold glow-cyan"
//                   onClick={() => handleRegister(sport)}
//                 >
//                   Register
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedSport && (
//         <>
//           <SportRegistrationModal
//             sport={selectedSport}
//             isOpen={showRegisterModal}
//             onClose={() => {
//               setShowRegisterModal(false)
//               setSelectedSport(null)
//             }}
//           />
//           <RulesModal
//             sport={selectedSport}
//             isOpen={showRulesModal}
//             onClose={() => {
//               setShowRulesModal(false)
//               setSelectedSport(null)
//             }}
//           />
//         </>
//       )}
//     </section>
//   )
// }

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import SportRegistrationModal from "@/components/sport-registration-modal"
import RulesModal from "@/components/rules-modal"

export interface Sport {
  id: string
  name: string
  icon: string
  type: 'solo' | 'doubles' | 'team'
  teamSize?: number
  maxSubstitutes?: number
  totalTeams?: number
  maxTeams?: number
  description: string
  rules: string
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
    description: "Venue: Tennis Court",
    rules: `CRICKET - 7-A-SIDE FORMAT

Team Composition: 
• Squad size: 8 players  
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
• Wide ball: Ball passing outside the wide line  
• No-ball: Overstepping, waist-high full toss, or bouncer above shoulder
• Sledging or any interruption during ball delivery is considered a **No-Ball**

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
• All other standard cricket rules are applicable unless specifically modified above`
  },
  { 
    id: "futsal", 
    name: "Futsal", 
    icon: "⚽", 
    type: "team",
    teamSize: 9,
    maxSubstitutes: 3,
    totalTeams: 12,
    maxTeams: 16,
    description: "Fast-paced indoor football",
    rules: `FUTSAL RULES & GUIDELINES

Team Composition:
• 6 players per team (1 goalkeeper + 5 outfield players)
• Maximum 2 substitutes
• Rolling substitutions allowed (unlimited)
• Substitution only during stoppage and with referee permission

Match Duration:
• Two halves of 15 minutes each
• 5-minute halftime break
• Running clock (stops only for injuries/time-outs)
• Each team gets 1 timeout of 1 minute per half

Playing Surface & Ball:
• Indoor court with futsal-specific ball (size 4, low bounce)
• Goal size: 3m × 2m
• No offside rule

Fouls & Free Kicks:
• First 5 fouls per half: Indirect free kick with defensive wall
• 6th foul onwards: Direct free kick from 10m mark (no wall)
• Accumulated fouls reset at halftime
• Yellow card: Caution, player continues
• Red card: Player sent off, team plays with one less player for 2 minutes or until goal conceded

Goalkeeper Rules:
• Cannot handle ball in own half after teammate's pass (results in indirect free kick)
• 4-second rule: Must release ball within 4 seconds of possession
• Can score in opponent's goal
• May act as outfield player

Kick-Ins & Restarts:
• Ball out of play: Kick-in (not throw-in) from touchline
• Kick-in must be taken within 4 seconds
• Opponent must be 5m away
• Corner kicks and goal kicks as per FIFA futsal rules

Scoring:
• Goal scored when entire ball crosses goal line between posts
• Ball can be played at any height
• Goalkeeper cannot score by throwing ball directly

Prohibited Actions:
• Slide tackles (except goalkeeper in penalty area)
• Dangerous play
• Holding, pushing, or charging opponent
• Playing with raised foot near opponent's head

Discipline & Sportsmanship:
• Respect referee decisions
• No arguing or dissent
• Fair play and sporting conduct required at all times
• Violent conduct results in immediate red card and tournament ban`
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
    description: "Agility and teamwork",
    rules: `VOLLEYBALL RULES

Team Composition:
• 6 players on court per team
• Maximum 2 substitutes

Match Format:
• Best of 3 sets
• First 2 sets: First team to 25 points (must win by 2)
• 3rd set (if needed): First team to 15 points (must win by 2)
• Rally scoring: Point awarded on every serve

Service:
• Serve from behind end line
• Ball must clear net without touching it
• Serve hits net but goes over: Play continues (let serve)
• Server gets one attempt only

Playing the Ball:
• Maximum 3 touches per side (block doesn't count as touch)
• Same player cannot hit ball twice consecutively (except after block)
• Ball must be hit, not caught or thrown
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
• Repeated violations: Player expulsion`
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    type: "solo",
    totalTeams: 24,
    maxTeams: 32,
    description: "Speed and precision",
    rules: `BADMINTON SINGLES RULES

Match Format:
• Best of 3 games
• Each game: First to 21 points
• Must win by 2 points
• If score reaches 29-29, player scoring 30th point wins game
• 60-second rest between games
• 2-minute rest between 2nd and 3rd games

Scoring System:
• Rally point scoring (point on every serve)
• Winner of rally scores point and serves next
• Player winning game serves first in next game

Service Rules:
• Serve diagonally to opponent's service court
• Server and receiver must stand in diagonally opposite service courts
• Feet must remain stationary until serve is struck
• Racket head must be below server's hand at contact
• Shuttle must be struck below server's waist
• Service motion must be continuous (no fake serves)
• If score is EVEN: Serve from RIGHT service court
• If score is ODD: Serve from LEFT service court

Court Usage:
• Service courts: Narrower (singles sideline)
• After service: Full court width (including doubles sideline)
• Singles sidelines apply during rallies

During Rally:
• Shuttle must pass over net
• Shuttle cannot touch ceiling or walls
• Player cannot touch net with racket or body
• Shuttle cannot be hit twice consecutively by same player
• Shuttle landing on line is IN

Lets (Replay):
• Shuttle caught in/on net during service
• Service receiver not ready
• Unforeseen or accidental situation
• Shuttle disintegrates during play

Faults (Opponent Wins Rally):
• Shuttle lands outside boundary lines
• Shuttle doesn't cross net
• Shuttle touches player's body or clothing
• Shuttle hit before crossing net to your side
• Touching net with racket or body during play
• Hitting shuttle twice in succession
• Obstructing opponent
• Service faults (illegal service)

Interval & Change of Ends:
• Change ends after each game
• In 3rd game: Change ends when leading player reaches 11 points
• 60-second interval when leading player reaches 11 points

Equipment:
• Approved BWF feather shuttlecock
• Racket meeting BWF specifications
• Proper court shoes (non-marking)

Conduct:
• No coaching during match
• No abuse of equipment
• Respect umpire decisions
• Fair play and sportsmanship required
• Continuous play (no deliberate delays)
• Medical timeout: Maximum 5 minutes for injury`
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    type: "doubles",
    teamSize: 2,
    totalTeams: 14,
    maxTeams: 16,
    description: "Coordination challenge",
    rules: `BADMINTON DOUBLES RULES

Match Format:
• Best of 3 games
• Each game: First to 21 points
• Must win by 2 points
• If score reaches 29-29, pair scoring 30th point wins game
• 60-second rest between games
• 2-minute rest between 2nd and 3rd games

Scoring System:
• Rally point scoring (point on every serve)
• Winning pair scores point and serves next
• Same server continues serving until pair loses rally
• Pair winning game serves first in next game

Service Rules - CRITICAL FOR DOUBLES:
• Serve diagonally to opponent's service court
• Server, partner, receiver, and receiver's partner must stay in respective courts
• Feet must remain stationary until serve is struck
• Racket head below server's hand at contact
• Shuttle struck below server's waist
• If serving side's score is EVEN (0, 2, 4...): Serve from RIGHT court
• If serving side's score is ODD (1, 3, 5...): Serve from LEFT court

Service Sequence (Important):
• At start of game: Serving side gets only ONE service
• After first rally: Winning side serves
• Only player in correct service court may serve/receive
• Partners switch service courts after winning rally while serving
• Partners DO NOT switch when receiving side wins rally

Court Boundaries:
• Service courts: Shorter (inner back line) and wider (outer sideline)
• After service: Full court including outer sideline and back tramline
• Doubles sidelines and back lines apply during rallies

During Rally:
• Either partner may hit the shuttle
• Shuttle cannot be hit twice consecutively by same pair
• Partners can hit shuttle alternately or either can hit
• Shuttle must pass over net
• Players cannot touch net with racket or body
• Shuttle landing on line is IN

Rotation of Service:
• When serving side wins rally: Same server serves from alternate court
• When receiving side wins rally: They become serving side, no position change
• Player who was in right court serves first for new serving side

Faults:
• Service faults: Wrong court, illegal service motion, foot fault
• Shuttle lands outside boundaries during service
• Shuttle doesn't cross net
• Shuttle touches player's body or clothing
• Wrong player serving or receiving
• Player obstructing opponent
• Touching net during play
• Double hit by same player

Interval & Change of Ends:
• Change ends after each game
• In 3rd game: Change ends when leading pair reaches 11 points
• 60-second interval when leading pair reaches 11 points

Communication & Strategy:
• Partners may communicate during play
• Front-back or side-by-side formations allowed
• Team strategy and positioning is key

Lets (Replay):
• Shuttle caught in/on net during service
• Receiver not ready
• Accidental or unforeseen situation
• Shuttle disintegrates during play

Conduct:
• No coaching during match
• Partners must work as team
• Respect umpire decisions
• Fair play and sportsmanship mandatory
• Continuous play (no deliberate delays)
• Medical timeout: Maximum 5 minutes for injury`
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    type: "solo",
    totalTeams: 20,
    maxTeams: 32,
    description: "Lightning-fast reflexes",
    rules: `TABLE TENNIS SINGLES RULES

Match Format:
• Best of 5 games (first to win 3 games)
• Each game: First to 11 points
• Must win by 2 points
• If score reaches 10-10: Play continues until one player leads by 2
• 1-minute rest between games

Service Rules:
• Service alternates every 2 points (not every 5 points)
• At 10-10 (deuce): Service alternates every point
• Ball must be visible to opponent before service
• Ball tossed minimum 16cm (6 inches) upward from flat palm
• Ball must be struck behind end line and above table surface
• Ball must bounce once on server's side, then opponent's side
• Service must be diagonal (no straight serves)
• Ball touching net during service but landing correctly: LET (replay)

Scoring:
• Rally point scoring (point on every serve)
• Winner of rally scores point
• Player losing previous point serves next (unless score is 10-10)
• No second serves (unlike tennis)

During Rally:
• Ball must bounce once on your side before returning
• Can hit ball anywhere on opponent's side
• Ball touching net during rally and going over: Play continues
• Ball hitting edge of table: IN
• Ball hitting side of table: OUT

Legal Returns:
• Ball must be struck, not caught or carried
• Can hit ball before it bounces on your side (volley) - results in point for opponent
• Must hit ball with racket only
• Free hand cannot touch table during play

Lets (Replay):
• Service where ball touches net but lands correctly
• Opponent not ready (only on first occurrence)
• Ball broken during play
• Play disturbed by external factors

Faults (Opponent Scores):
• Ball bounces twice on your side
• Ball doesn't bounce on opponent's side
• Touching table with free hand during rally
• Moving table during play
• Ball hits you or your clothing before bouncing
• Illegal service
• Volleying ball (hitting before it bounces on your side)
• Double hit

Equipment:
• ITTF approved table (9ft × 5ft × 2.5ft high)
• ITTF approved 40mm ball (white or orange)
• Racket: Any size, rubber on both sides if used
• Red rubber on one side, black on other

Court Rules:
• Players cannot touch net or table with free hand
• Players cannot obstruct opponent's view of ball
• Cannot rock or move table
• Playing area should be clear of obstructions

Timeout:
• Each player gets 1 timeout per match (1 minute)
• Taken between games only
• Towel break after every 6 points

Expedite System:
• If game not finished after 10 minutes
• Service alternates each point
• Receiver wins if makes 13 returns

Conduct:
• No coaching during game
• Respect umpire decisions
• No racket abuse or ball abuse
• No verbal abuse or intimidation
• Fair play and sportsmanship required
• Wiping sweat allowed during breaks only`
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    type: "team",
    teamSize: 4,
    totalTeams: 6,
    maxTeams: 12,
    description: "Speed and coordination",
    rules: `RELAY RACE RULES (4×100M)

Team Composition:
• 4 runners per team
• Each runner completes 100 meters
• Total distance: 400 meters
• Running order must be declared before race

Race Format:
• Sprint relay: 4 × 100 meters
• Each runner carries baton for their leg
• Baton must be passed within exchange zone

Starting:
• First runner starts from crouch position (starting blocks optional)
• Starts on starter's gun command
• False start: Warning for first offense, disqualification for second
• "On your marks... Set... [Gun]"

Baton Exchange - MOST CRITICAL:
• Exchange zones: 20-meter zones (10m before + 10m after each 100m mark)
• Baton must be passed within exchange zone
• Receiving runner can start running 10m before zone (acceleration zone)
• Baton must be handed, not thrown
• If baton dropped: Only athlete who dropped it can pick it up
• Must pick up from where it was dropped
• Cannot leave lane to pick up baton

Exchange Technique:
• Upsweep: Incoming runner places baton up into receiver's hand
• Downsweep: Incoming runner places baton down into receiver's hand
• Visual exchange: Receiver looks back
• Blind exchange: Receiver doesn't look back (faster but riskier)
• Receiver cannot reach back before exchange zone

Lane Rules:
• Each team assigned specific lane
• Runners must stay in designated lane throughout their leg
• Crossing into another lane: Disqualification (if gains advantage)
• Cannot obstruct other teams

Disqualifications:
• Baton exchange outside zone
• Dropping baton and someone else picking it up
• Running out of lane
• Obstructing another runner
• Two false starts
• Throwing baton to next runner
• Wrong running order

Winning:
• Team whose last runner crosses finish line first
• Torso must cross line (not head or arms)
• Baton must cross finish line
• Photo finish if close

Race Procedure:
• Leg 1: Standard sprint start from blocks/crouch
• Legs 2-4: Standing start, waiting for baton
• Runner must wait for baton before leaving exchange zone
• Cannot start running before acceleration zone (10m before exchange zone)

Baton Specifications:
• Smooth, hollow tube
• Length: 28-30 cm
• Circumference: 12-13 cm
• Weight: Minimum 50 grams
• Visible color (usually bright)

Safety Rules:
• Must wear proper running shoes (spikes allowed)
• No jewelry or sharp objects
• Athletes must stay in lane after finishing their leg
• No coaching on track during race

Communication:
• Outgoing runner can shout "Hand!" or "Stick!" to signal readiness
• Must be alert and coordinated
• Practice baton exchanges before race recommended

Conduct:
• Respect officials and other teams
• No unsportsmanlike conduct
• Decisions of race officials are final
• Team spirit and coordination essential
• Any intentional interference: Immediate disqualification`
  },
  { 
    id: "tug-of-war", 
    name: "Tug of War", 
    icon: "🔗", 
    type: "team",
    teamSize: 8,
    // maxSubstitutes: 2,
    totalTeams: 5,
    maxTeams: 10,
    description: "Raw power and unity",
    rules: `TUG OF WAR RULES

Team Composition:
• 8 pullers per team
• Maximum 2 substitutes
• Total team weight limit may apply (if specified)
• Anchor (last puller) is crucial position

Match Format:
• Best of 3 pulls
• Each pull continues until one team wins
• 2-minute rest between pulls
• 5-minute rest between matches

Equipment:
• Rope specifications:
  - Circumference: 10-12.5 cm
  - Length: Minimum 33.5 meters
  - Center marking clearly visible
• Ground markings:
  - Center line (tape on ground)
  - Two side lines 4 meters from center (one for each team)

Winning a Pull:
• Team wins when they pull center mark of rope over their 4m line
• OR when opposing team commits a fault/violation
• OR when judge determines team cannot continue (safety)

Starting Position:
• Teams line up on opposite sides of center line
• Rope must be taut before start
• All pullers must be behind their respective 4m line
• Judge commands: "Pick up the rope", "Take the strain", "Pull!"
• Pull begins on "Pull!" command only

Pulling Positions:
• Anchor (last person): Can wrap rope around body for better grip
• Other pullers: Must hold rope with hands only
• Must maintain position in line (no changing order during pull)
• Foot positions: Side-by-side or tandem

Legal Techniques:
• Pulling straight back in coordinated manner
• Leaning back with body weight
• Bracing feet against ground
• Synchronized pulling commands/chanting
• Anchor wrapping rope around body/shoulder

Fouls & Violations:
• Sitting or falling deliberately
• Locking/knotting rope around body (except anchor)
• Touching ground with any body part except feet
• Letting go of rope intentionally
• Crossing center line before winning
• Starting before "Pull!" command
• Using gloves or grip aids (unless permitted)
• Verbal abuse or unsportsmanlike conduct

Anchor Rules:
• Last puller on team
• Can wrap rope over shoulder and around body
• Provides stability and power to team
• Must maintain control of rope at all times

Safety Rules:
• Proper footwear required (flat sole, good grip)
• No gloves with grip enhancements (unless specified)
• No sharp objects or jewelry
• If someone falls: Team must continue or forfeit
• Judge can stop pull if safety concern arises
• No wrapping rope around hands (risk of injury)

Coaching:
• Coach can give commands from designated area
• Cannot touch rope or pullers during pull
• Cannot cross boundary lines
• Must respect judge's authority

Ground Surface:
• Flat, non-slip surface preferred
• Grass or indoor mat typical
• No holes or obstacles near pulling area
• Safe run-off space behind each team

Weight Classes:
• May be organized by total team weight
• Weigh-in before competition if required
• Weight limit must be met (if applicable)

Strategy:
• Coordination and timing crucial
• Anchor provides stability
• Front pullers provide initial power
• Middle pullers maintain steady pull
• Team communication essential
• Rhythmic pulling more effective than random

Judging:
• Judge's decision is final
• Center mark must clearly cross line to win
• Judge monitors for fouls
• Can award pull to team if opponent commits violation

Conduct:
• Sportsmanship essential
• No intentional injury to opponents
• Respect officials and opponents
• Team unity and coordination wins
• No individual heroics - team effort required`
  },
]

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
    description: "Accuracy and strategy",
    rules: `THROWBALL RULES

Team Composition:
• 7 players on court per team
• Maximum 2 substitutes
• Positions: 4 front court + 3 back court players
• Players must maintain position zones during play

Match Format:
• Best of 3 sets
• Sets 1 & 2: First team to 15 points (must win by 2)
• Set 3 (if needed): First team to 7 points (must win by 2)
• Rally scoring: Point on every serve
• 2-minute break between sets

Court Dimensions:
• Length: 18.3 meters (60 feet)
• Width: 12.2 meters (40 feet)
• Net height: 2.2 meters (7.2 feet) for women
• Divided into front court and back court by center line

Serving Rules:
• Server must be in back right position
• Serve from behind end line
• Ball must be thrown (not hit) over net
• Server gets ONE attempt only (no second serve)
• Serve must land in opponent's court
• Served ball touching net and going over: FAULT (unlike volleyball)
• Server must throw ball with one or both hands

Playing the Ball:
• Ball must be CAUGHT and THROWN (not hit or volleyed)
• Player catching ball must release it within 3 seconds
• Ball can be caught with one or both hands
• Only ONE catch per team before returning ball
• No dribbling or multiple contacts
• Ball must travel over net in throwing motion

Rotation:
• Team winning serve rotates clockwise
• Must maintain rotation order throughout set
• Players shift positions after winning serve from opponent

Court Positions:
• Front court: 3 left + 1 right (4 players)
• Back court: 3 players
• Players must stay in their zone until ball is thrown
• Can move within zone freely

Scoring:
• Rally point system (point on every throw)
• Point awarded when:
  - Ball lands in opponent's court
  - Opponent commits fault
  - Opponent fails to return ball legally
• Team winning rally scores and serves next (if not already serving)

Faults (Opponent Scores):
• Ball thrown out of bounds
• Taking more than 3 seconds to throw
• Ball touching net during throw
• Catching ball twice by same team
• Stepping into opponent's court
• Touching net during play
• Improper throw (ball not released cleanly)
• Illegal catch (juggling, fumbling)
• Player out of position zone

Net Rules:
• Players cannot touch net with body or clothing
• Cannot reach over net to catch ball
• Ball touching net during play (not serve): Fault
• Net height: 2.2m for women, 2.4m for men

Substitutions:
• Allowed during dead ball situations only
• Must notify referee before substituting
• Substitute enters at back right position
• Maximum 2 substitutes per team
• Player leaving can re-enter once per set

Timeouts:
• Each team gets 2 timeouts per set (30 seconds each)
• Can only be called by captain
• Taken during dead ball situation

Winning:
• Win 2 out of 3 sets
• Must win set by 2 points
• No maximum point cap

Ball Specifications:
• Size: Circumference 65-67 cm
• Weight: 400-450 grams
• Properly inflated to official pressure
• Must be spherical and leather/synthetic

Special Rules:
• Joker/Powerplay: May be allowed (1 player can play any position for limited time)
• Back court players cannot catch ball in front court zone
• Captain can dispute decisions politely
• Referee decision is final

Conduct:
• Fair play and sportsmanship essential
• No arguing with officials
• Respect opponents and teammates
• No unsportsmanlike conduct
• Yellow card: Warning
• Red card: Point penalty or expulsion

Key Differences from Volleyball:
• CATCH and THROW (not hit)
• Only ONE touch per team
• Ball touching net is FAULT (even during rally)
• 3-second rule for holding ball
• Different court positioning rules`
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    type: "solo",
    totalTeams: 18,
    maxTeams: 32,
    description: "Speed and precision",
    rules: `BADMINTON SINGLES RULES

Match Format:
• Best of 3 games
• Each game: First to 21 points
• Must win by 2 points
• If score reaches 29-29, player scoring 30th point wins game
• 60-second rest between games
• 2-minute rest between 2nd and 3rd games

Scoring System:
• Rally point scoring (point on every serve)
• Winner of rally scores point and serves next
• Player winning game serves first in next game

Service Rules:
• Serve diagonally to opponent's service court
• Server and receiver must stand in diagonally opposite service courts
• Feet must remain stationary until serve is struck
• Racket head must be below server's hand at contact
• Shuttle must be struck below server's waist
• Service motion must be continuous (no fake serves)
• If score is EVEN: Serve from RIGHT service court
• If score is ODD: Serve from LEFT service court

Court Usage:
• Service courts: Narrower (singles sideline)
• After service: Full court width (including doubles sideline)
• Singles sidelines apply during rallies

During Rally:
• Shuttle must pass over net
• Shuttle cannot touch ceiling or walls
• Player cannot touch net with racket or body
• Shuttle cannot be hit twice consecutively by same player
• Shuttle landing on line is IN

Lets (Replay):
• Shuttle caught in/on net during service
• Service receiver not ready
• Unforeseen or accidental situation
• Shuttle disintegrates during play

Faults (Opponent Wins Rally):
• Shuttle lands outside boundary lines
• Shuttle doesn't cross net
• Shuttle touches player's body or clothing
• Shuttle hit before crossing net to your side
• Touching net with racket or body during play
• Hitting shuttle twice in succession
• Obstructing opponent
• Service faults (illegal service)

Interval & Change of Ends:
• Change ends after each game
• In 3rd game: Change ends when leading player reaches 11 points
• 60-second interval when leading player reaches 11 points

Equipment:
• Approved BWF feather shuttlecock
• Racket meeting BWF specifications
• Proper court shoes (non-marking)

Conduct:
• No coaching during match
• No abuse of equipment
• Respect umpire decisions
• Fair play and sportsmanship required
• Continuous play (no deliberate delays)
• Medical timeout: Maximum 5 minutes for injury`
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    type: "doubles",
    teamSize: 2,
    totalTeams: 10,
    maxTeams: 16,
    description: "Coordination challenge",
    rules: `BADMINTON DOUBLES RULES

Match Format:
• Best of 3 games
• Each game: First to 21 points
• Must win by 2 points
• If score reaches 29-29, pair scoring 30th point wins game
• 60-second rest between games
• 2-minute rest between 2nd and 3rd games

Scoring System:
• Rally point scoring (point on every serve)
• Winning pair scores point and serves next
• Same server continues serving until pair loses rally
• Pair winning game serves first in next game

Service Rules - CRITICAL FOR DOUBLES:
• Serve diagonally to opponent's service court
• Server, partner, receiver, and receiver's partner must stay in respective courts
• Feet must remain stationary until serve is struck
• Racket head below server's hand at contact
• Shuttle struck below server's waist
• If serving side's score is EVEN (0, 2, 4...): Serve from RIGHT court
• If serving side's score is ODD (1, 3, 5...): Serve from LEFT court

Service Sequence (Important):
• At start of game: Serving side gets only ONE service
• After first rally: Winning side serves
• Only player in correct service court may serve/receive
• Partners switch service courts after winning rally while serving
• Partners DO NOT switch when receiving side wins rally

Court Boundaries:
• Service courts: Shorter (inner back line) and wider (outer sideline)
• After service: Full court including outer sideline and back tramline
• Doubles sidelines and back lines apply during rallies

During Rally:
• Either partner may hit the shuttle
• Shuttle cannot be hit twice consecutively by same pair
• Partners can hit shuttle alternately or either can hit
• Shuttle must pass over net
• Players cannot touch net with racket or body
• Shuttle landing on line is IN

Rotation of Service:
• When serving side wins rally: Same server serves from alternate court
• When receiving side wins rally: They become serving side, no position change
• Player who was in right court serves first for new serving side

Faults:
• Service faults: Wrong court, illegal service motion, foot fault
• Shuttle lands outside boundaries during service
• Shuttle doesn't cross net
• Shuttle touches player's body or clothing
• Wrong player serving or receiving
• Player obstructing opponent
• Touching net during play
• Double hit by same player

Interval & Change of Ends:
• Change ends after each game
• In 3rd game: Change ends when leading pair reaches 11 points
• 60-second interval when leading pair reaches 11 points

Communication & Strategy:
• Partners may communicate during play
• Front-back or side-by-side formations allowed
• Team strategy and positioning is key

Lets (Replay):
• Shuttle caught in/on net during service
• Receiver not ready
• Accidental or unforeseen situation
• Shuttle disintegrates during play

Conduct:
• No coaching during match
• Partners must work as team
• Respect umpire decisions
• Fair play and sportsmanship mandatory
• Continuous play (no deliberate delays)
• Medical timeout: Maximum 5 minutes for injury`
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    type: "solo",
    totalTeams: 15,
    maxTeams: 32,
    description: "Lightning-fast reflexes",
    rules: `TABLE TENNIS SINGLES RULES

Match Format:
• Best of 5 games (first to win 3 games)
• Each game: First to 11 points
• Must win by 2 points
• If score reaches 10-10: Play continues until one player leads by 2
• 1-minute rest between games

Service Rules:
• Service alternates every 2 points (not every 5 points)
• At 10-10 (deuce): Service alternates every point
• Ball must be visible to opponent before service
• Ball tossed minimum 16cm (6 inches) upward from flat palm
• Ball must be struck behind end line and above table surface
• Ball must bounce once on server's side, then opponent's side
• Service must be diagonal (no straight serves)
• Ball touching net during service but landing correctly: LET (replay)

Scoring:
• Rally point scoring (point on every serve)
• Winner of rally scores point
• Player losing previous point serves next (unless score is 10-10)
• No second serves (unlike tennis)

During Rally:
• Ball must bounce once on your side before returning
• Can hit ball anywhere on opponent's side
• Ball touching net during rally and going over: Play continues
• Ball hitting edge of table: IN
• Ball hitting side of table: OUT

Legal Returns:
• Ball must be struck, not caught or carried
• Can hit ball before it bounces on your side (volley) - results in point for opponent
• Must hit ball with racket only
• Free hand cannot touch table during play

Lets (Replay):
• Service where ball touches net but lands correctly
• Opponent not ready (only on first occurrence)
• Ball broken during play
• Play disturbed by external factors

Faults (Opponent Scores):
• Ball bounces twice on your side
• Ball doesn't bounce on opponent's side
• Touching table with free hand during rally
• Moving table during play
• Ball hits you or your clothing before bouncing
• Illegal service
• Volleying ball (hitting before it bounces on your side)
• Double hit

Equipment:
• ITTF approved table (9ft × 5ft × 2.5ft high)
• ITTF approved 40mm ball (white or orange)
• Racket: Any size, rubber on both sides if used
• Red rubber on one side, black on other

Court Rules:
• Players cannot touch net or table with free hand
• Players cannot obstruct opponent's view of ball
• Cannot rock or move table
• Playing area should be clear of obstructions

Timeout:
• Each player gets 1 timeout per match (1 minute)
• Taken between games only
• Towel break after every 6 points

Expedite System:
• If game not finished after 10 minutes
• Service alternates each point
• Receiver wins if makes 13 returns

Conduct:
• No coaching during game
• Respect umpire decisions
• No racket abuse or ball abuse
• No verbal abuse or intimidation
• Fair play and sportsmanship required
• Wiping sweat allowed during breaks only`
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    type: "team",
    teamSize: 4,
    totalTeams: 3,
    maxTeams: 10,
    description: "Speed and coordination",
    rules: `RELAY RACE RULES (4×100M)

Team Composition:
• 4 runners per team
• Each runner completes 100 meters
• Total distance: 400 meters
• Running order must be declared before race

Race Format:
• Sprint relay: 4 × 100 meters
• Each runner carries baton for their leg
• Baton must be passed within exchange zone

Starting:
• First runner starts from crouch position (starting blocks optional)
• Starts on starter's gun command
• False start: Warning for first offense, disqualification for second
• "On your marks... Set... [Gun]"

Baton Exchange - MOST CRITICAL:
• Exchange zones: 20-meter zones (10m before + 10m after each 100m mark)
• Baton must be passed within exchange zone
• Receiving runner can start running 10m before zone (acceleration zone)
• Baton must be handed, not thrown
• If baton dropped: Only athlete who dropped it can pick it up
• Must pick up from where it was dropped
• Cannot leave lane to pick up baton

Exchange Technique:
• Upsweep: Incoming runner places baton up into receiver's hand
• Downsweep: Incoming runner places baton down into receiver's hand
• Visual exchange: Receiver looks back
• Blind exchange: Receiver doesn't look back (faster but riskier)
• Receiver cannot reach back before exchange zone

Lane Rules:
• Each team assigned specific lane
• Runners must stay in designated lane throughout their leg
• Crossing into another lane: Disqualification (if gains advantage)
• Cannot obstruct other teams

Disqualifications:
• Baton exchange outside zone
• Dropping baton and someone else picking it up
• Running out of lane
• Obstructing another runner
• Two false starts
• Throwing baton to next runner
• Wrong running order

Winning:
• Team whose last runner crosses finish line first
• Torso must cross line (not head or arms)
• Baton must cross finish line
• Photo finish if close

Race Procedure:
• Leg 1: Standard sprint start from blocks/crouch
• Legs 2-4: Standing start, waiting for baton
• Runner must wait for baton before leaving exchange zone
• Cannot start running before acceleration zone (10m before exchange zone)

Baton Specifications:
• Smooth, hollow tube
• Length: 28-30 cm
• Circumference: 12-13 cm
• Weight: Minimum 50 grams
• Visible color (usually bright)

Safety Rules:
• Must wear proper running shoes (spikes allowed)
• No jewelry or sharp objects
• Athletes must stay in lane after finishing their leg
• No coaching on track during race

Communication:
• Outgoing runner can shout "Hand!" or "Stick!" to signal readiness
• Must be alert and coordinated
• Practice baton exchanges before race recommended

Conduct:
• Respect officials and other teams
• No unsportsmanlike conduct
• Decisions of race officials are final
• Team spirit and coordination essential
• Any intentional interference: Immediate disqualification`
  },
  { 
    id: "tug-of-war", 
    name: "Tug of War", 
    icon: "🔗", 
    type: "team",
    teamSize: 8,
    maxSubstitutes: 2,
    totalTeams: 2,
    maxTeams: 8,
    description: "Raw power and unity",
    rules: `TUG OF WAR RULES

Team Composition:
• 8 pullers per team
• Maximum 2 substitutes
• Total team weight limit may apply (if specified)
• Anchor (last puller) is crucial position

Match Format:
• Best of 3 pulls
• Each pull continues until one team wins
• 2-minute rest between pulls
• 5-minute rest between matches

Equipment:
• Rope specifications:
  - Circumference: 10-12.5 cm
  - Length: Minimum 33.5 meters
  - Center marking clearly visible
• Ground markings:
  - Center line (tape on ground)
  - Two side lines 4 meters from center (one for each team)

Winning a Pull:
• Team wins when they pull center mark of rope over their 4m line
• OR when opposing team commits a fault/violation
• OR when judge determines team cannot continue (safety)

Starting Position:
• Teams line up on opposite sides of center line
• Rope must be taut before start
• All pullers must be behind their respective 4m line
• Judge commands: "Pick up the rope", "Take the strain", "Pull!"
• Pull begins on "Pull!" command only

Pulling Positions:
• Anchor (last person): Can wrap rope around body for better grip
• Other pullers: Must hold rope with hands only
• Must maintain position in line (no changing order during pull)
• Foot positions: Side-by-side or tandem

Legal Techniques:
• Pulling straight back in coordinated manner
• Leaning back with body weight
• Bracing feet against ground
• Synchronized pulling commands/chanting
• Anchor wrapping rope around body/shoulder

Fouls & Violations:
• Sitting or falling deliberately
• Locking/knotting rope around body (except anchor)
• Touching ground with any body part except feet
• Letting go of rope intentionally
• Crossing center line before winning
• Starting before "Pull!" command
• Using gloves or grip aids (unless permitted)
• Verbal abuse or unsportsmanlike conduct

Anchor Rules:
• Last puller on team
• Can wrap rope over shoulder and around body
• Provides stability and power to team
• Must maintain control of rope at all times

Safety Rules:
• Proper footwear required (flat sole, good grip)
• No gloves with grip enhancements (unless specified)
• No sharp objects or jewelry
• If someone falls: Team must continue or forfeit
• Judge can stop pull if safety concern arises
• No wrapping rope around hands (risk of injury)

Coaching:
• Coach can give commands from designated area
• Cannot touch rope or pullers during pull
• Cannot cross boundary lines
• Must respect judge's authority

Ground Surface:
• Flat, non-slip surface preferred
• Grass or indoor mat typical
• No holes or obstacles near pulling area
• Safe run-off space behind each team

Weight Classes:
• May be organized by total team weight
• Weigh-in before competition if required
• Weight limit must be met (if applicable)

Strategy:
• Coordination and timing crucial
• Anchor provides stability
• Front pullers provide initial power
• Middle pullers maintain steady pull
• Team communication essential
• Rhythmic pulling more effective than random

Judging:
• Judge's decision is final
• Center mark must clearly cross line to win
• Judge monitors for fouls
• Can award pull to team if opponent commits violation

Conduct:
• Sportsmanship essential
• No intentional injury to opponents
• Respect officials and opponents
• Team unity and coordination wins
• No individual heroics - team effort required`
  },
]

const getSportTypeBadge = (type: string) => {
  const badges = {
    solo: { label: "SOLO", color: "bg-blue-500/20 text-blue-400 border-blue-400/50" },
    doubles: { label: "DOUBLES", color: "bg-purple-500/20 text-purple-400 border-purple-400/50" },
    team: { label: "TEAM", color: "bg-green-500/20 text-green-400 border-green-400/50" }
  }
  return badges[type as keyof typeof badges]
}

const getTeamSizeLabel = (sport: Sport) => {
  if (sport.type === 'solo') return 'Individual'
  if (sport.type === 'doubles') return '2v2'
  return `${sport.teamSize}v${sport.teamSize}`
}

export default function Sports() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [sportType, setSportType] = useState<"all" | "solo" | "doubles" | "team">("all")
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)

  const allSports = gender === "male" ? MALE_SPORTS : FEMALE_SPORTS
  const sports = sportType === "all" ? allSports : allSports.filter(s => s.type === sportType)

  const handleRegister = (sport: Sport) => {
    setSelectedSport(sport)
    setShowRegisterModal(true)
  }

  const handleViewRules = (sport: Sport) => {
    setSelectedSport(sport)
    setShowRulesModal(true)
  }

  const getSpotsRemaining = (sport: Sport) => {
    const remaining = (sport.maxTeams || 0) - (sport.totalTeams || 0)
    const percentage = ((sport.totalTeams || 0) / (sport.maxTeams || 1)) * 100
    
    if (percentage >= 90) return { text: `Only ${remaining} spots left!`, color: "text-red-400" }
    if (percentage >= 70) return { text: `${remaining} spots remaining`, color: "text-yellow-400" }
    return { text: `${remaining} spots available`, color: "text-green-400" }
  }

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
                gender === "male" ? "bg-cyan-500 text-black glow-cyan" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender("female")}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                gender === "female" ? "bg-magenta-500 text-white glow-magenta" : "text-gray-400 hover:text-gray-300"
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
                sportType === "all" ? "bg-gradient-to-r from-cyan-500 to-magenta-500 text-white" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              All Sports
            </button>
            <button
              onClick={() => setSportType("team")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                sportType === "team" ? "bg-green-500 text-white" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Team
            </button>
            <button
              onClick={() => setSportType("doubles")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                sportType === "doubles" ? "bg-purple-500 text-white" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Doubles
            </button>
            <button
              onClick={() => setSportType("solo")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                sportType === "solo" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Solo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport) => {
            const badge = getSportTypeBadge(sport.type)
            const spotsInfo = getSpotsRemaining(sport)
            
            return (
              <div
                key={sport.id}
                className="group p-6 rounded-lg border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:glow-cyan flex flex-col relative overflow-hidden"
              >
                {/* Diagonal Light Sweep Animation */}
                <div className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000 bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none scale-150" />
                
                {/* Header with Badge and Team Size */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${badge.color}`}>
                    {badge.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 bg-slate-800 px-2 py-1 rounded">
                    {getTeamSizeLabel(sport)}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 relative z-10">{sport.icon}</div>

                {/* Sport Name */}
                <h3 className="text-xl font-bold text-cyan-300 mb-2 relative z-10">{sport.name}</h3>

                {/* Description */}
                <p className="text-gray-400 text-xs mb-4 italic relative z-10">{sport.description}</p>

                {/* Team Requirements (for team sports) */}
                {sport.type !== 'solo' && (
                  <div className="text-xs text-gray-500 mb-6 flex-grow relative z-10">
                    <div>Team Size: {sport.teamSize} players</div>
                    {sport.maxSubstitutes && (
                      <div>Including {sport.maxSubstitutes} substitutes</div>
                    )}
                  </div>
                )}

                {sport.type === 'solo' && <div className="flex-grow mb-6"></div>}

                {/* Animated underline */}
                <div className="mb-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-all duration-300 relative z-10" />

                {/* Action Buttons */}
                <div className="flex gap-3 relative z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-magenta-400/50 text-magenta-300 hover:bg-magenta-500/10 bg-transparent"
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
            )
          })}
        </div>
      </div>

      {selectedSport && (
        <>
          <SportRegistrationModal
            sport={selectedSport}
            isOpen={showRegisterModal}
            onClose={() => {
              setShowRegisterModal(false)
              setSelectedSport(null)
            }}
          />
          <RulesModal
            sport={selectedSport}
            isOpen={showRulesModal}
            onClose={() => {
              setShowRulesModal(false)
              setSelectedSport(null)
            }}
          />
        </>
      )}
    </section>
  )
}