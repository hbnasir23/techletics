"use client"

import type React from "react"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    events: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    toast.success("Form Submitted Successfully")
    // Handle form submission
  }

  const eventOptions = ["100m Sprint", "Long Jump", "Relay Race", "High Jump", "Shot Put", "Hurdles"]

  const toggleEvent = (event: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(event) ? prev.events.filter((e) => e !== event) : [...prev.events, event],
    }))
  }

  return (
    <section
      id="registration"
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-slate-900/50 to-background"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-cyan-400">Register</span> Today
        </h2>

        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-lg border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm"
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                placeholder="your.@cloud.neduet.edu.pk"
                required
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">Student ID</label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData((prev) => ({ ...prev, studentId: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                placeholder="SE-23086"
                required
              />
            </div>

            {/* Event Selection */}
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-4">Select Events</label>
              <div className="grid md:grid-cols-2 gap-3">
                {eventOptions.map((event) => (
                  <label
                    key={event}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-magenta-400/50 cursor-pointer transition-colors duration-300"
                  >
                    <input
                      type="checkbox"
                      checked={formData.events.includes(event)}
                      onChange={() => toggleEvent(event)}
                      className="w-4 h-4 accent-cyan-400 cursor-pointer"
                    />
                    <span className="text-gray-300">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-3 rounded-lg glow-cyan transition-all duration-300"
            >
              Register Now
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
