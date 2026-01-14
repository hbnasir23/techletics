"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import SportRegistrationModal from "@/components/sport-registration-modal"
import RulesModal from "@/components/rules-modal"

interface Sport {
  id: string
  name: string
  icon: string
  description: string
}

const MALE_SPORTS: Sport[] = [
  { id: "cricket", name: "Cricket", icon: "🏏", description: "Fast-paced team sport combining strategy and skill" },
  { id: "futsal", name: "Futsal", icon: "⚽", description: "Indoor football with fast-paced action and teamwork" },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    description: "Dynamic team sport requiring agility and communication",
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    description: "Individual competition with speed and precision",
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    description: "Doubles competition testing coordination and teamwork",
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    description: "Fast-paced individual sport requiring precision and reflexes",
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    description: "Team sprint race combining speed and coordination",
  },
  { id: "tug-of-war", name: "Tug of War", icon: "🔗", description: "Team strength competition requiring coordination" },
]

const FEMALE_SPORTS: Sport[] = [
  {
    id: "throwball",
    name: "Throwball",
    icon: "🎯",
    description: "Team sport combining throwing accuracy and strategy",
  },
  {
    id: "badminton-singles",
    name: "Badminton Singles",
    icon: "🏸",
    description: "Individual competition with speed and precision",
  },
  {
    id: "badminton-doubles",
    name: "Badminton Doubles",
    icon: "👥",
    description: "Doubles competition testing coordination and teamwork",
  },
  {
    id: "table-tennis-singles",
    name: "Table Tennis Singles",
    icon: "🏓",
    description: "Fast-paced individual sport requiring precision and reflexes",
  },
  {
    id: "relay-race",
    name: "Relay Race",
    icon: "🏃",
    description: "Team sprint race combining speed and coordination",
  },
  { id: "tug-of-war", name: "Tug of War", icon: "🔗", description: "Team strength competition requiring coordination" },
]

export default function Sports() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)

  const sports = gender === "male" ? MALE_SPORTS : FEMALE_SPORTS

  const handleRegister = (sport: Sport) => {
    setSelectedSport(sport)
    setShowRegisterModal(true)
  }

  const handleViewRules = (sport: Sport) => {
    setSelectedSport(sport)
    setShowRulesModal(true)
  }

  return (
    <section id="sports" className="relative py-20 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Featured <span className="text-cyan-400">Sports</span>
        </h2>

        <div className="flex justify-center mb-12">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="group p-6 rounded-lg border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:glow-cyan flex flex-col"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{sport.icon}</div>

              {/* Sport Name */}
              <h3 className="text-xl font-bold text-cyan-300 mb-2">{sport.name}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{sport.description}</p>

              {/* Animated underline */}
              <div className="mb-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-all duration-300" />

              {/* Action Buttons */}
              <div className="flex gap-3">
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
          ))}
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
