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

interface Sport {
  id: string
  name: string
  icon: string
  type: 'solo' | 'doubles' | 'team'
  teamSize?: number
  maxSubstitutes?: number
  totalTeams?: number
  maxTeams?: number
  description: string
}

const MALE_SPORTS: Sport[] = [
  { 
    id: "cricket", 
    name: "Cricket", 
    icon: "🏏", 
    type: "team",
    teamSize: 7,
    maxSubstitutes: 1,
    totalTeams: 8,
    maxTeams: 16,
    description: "Strategy meets skill"
  },
  { 
    id: "futsal", 
    name: "Futsal", 
    icon: "⚽", 
    type: "team",
    teamSize: 6,
    maxSubstitutes: 2,
    totalTeams: 12,
    maxTeams: 16,
    description: "Fast-paced indoor football"
  },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    type: "team",
    teamSize: 6,
    maxSubstitutes: 2,
    totalTeams: 10,
    maxTeams: 12,
    description: "Agility and teamwork"
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    type: "solo",
    totalTeams: 24,
    maxTeams: 32,
    description: "Speed and precision"
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    type: "doubles",
    teamSize: 2,
    totalTeams: 14,
    maxTeams: 16,
    description: "Coordination challenge"
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    type: "solo",
    totalTeams: 20,
    maxTeams: 32,
    description: "Lightning-fast reflexes"
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    type: "team",
    teamSize: 4,
    totalTeams: 6,
    maxTeams: 12,
    description: "Speed and coordination"
  },
  { 
    id: "tug-of-war", 
    name: "Tug of War", 
    icon: "🔗", 
    type: "team",
    teamSize: 8,
    maxSubstitutes: 2,
    totalTeams: 5,
    maxTeams: 10,
    description: "Raw power and unity"
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
    description: "Accuracy and strategy"
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    type: "solo",
    totalTeams: 18,
    maxTeams: 32,
    description: "Speed and precision"
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    type: "doubles",
    teamSize: 2,
    totalTeams: 10,
    maxTeams: 16,
    description: "Coordination challenge"
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    type: "solo",
    totalTeams: 15,
    maxTeams: 32,
    description: "Lightning-fast reflexes"
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    type: "team",
    teamSize: 4,
    totalTeams: 3,
    maxTeams: 10,
    description: "Speed and coordination"
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
    description: "Raw power and unity"
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
                      <div>Substitutes: Up to {sport.maxSubstitutes}</div>
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