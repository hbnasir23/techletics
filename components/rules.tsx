"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function Rules() {
  const sportsRules = [
    {
      sport: "Cricket",
      rules: ["One team per section", "One player cannot register twice", "Standard college cricket rules apply"],
    },
    {
      sport: "Badminton Singles",
      rules: ["Single player only", "Knockout matches format", "Standard badminton court dimensions"],
    },
    {
      sport: "Badminton Doubles",
      rules: ["Two players per team", "Same section required for both players", "Knockout matches format"],
    },
    {
      sport: "Volleyball",
      rules: ["Exactly 6 players per team", "Standard volleyball rules", "Best of 3 sets format"],
    },
    {
      sport: "Football Pickup",
      rules: [
        "8 total players (5 playing + 3 substitutes)",
        "One team per section",
        "Standard football rules with modifications for safety",
      ],
    },
  ]

  return (
    <section id="rules" className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Rules & <span className="text-cyan-400">Regulations</span>
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {sportsRules.map((sport) => (
            <AccordionItem
              key={sport.sport}
              value={sport.sport}
              className="border border-slate-700 bg-slate-900/50 backdrop-blur-sm rounded-lg overflow-hidden hover:border-magenta-400/50 transition-colors duration-300"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/50 transition-colors">
                <span className="text-lg font-semibold text-cyan-400">{sport.sport}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 border-t border-slate-700 text-gray-300">
                <ul className="space-y-3">
                  {sport.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-magenta-400 font-bold mt-1">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
