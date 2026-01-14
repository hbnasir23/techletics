"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Sport {
  id: string
  name: string
  icon: string
  description: string
}

interface SportRegistrationModalProps {
  sport: Sport
  isOpen: boolean
  onClose: () => void
}

export default function SportRegistrationModal({ sport, isOpen, onClose }: SportRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    year: "",
    section: "",
    batch: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const submitInProgress = useRef(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent duplicate submissions
    if (submitInProgress.current || loading) {
      return
    }

    submitInProgress.current = true
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Submitting registration:", formData)

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sportName: sport.name,
          playerName: formData.name,
          email: formData.email,
          rollNumber: formData.rollNumber,
          year: formData.year,
          section: formData.section,
          batch: formData.batch,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        console.error("[v0] Registration error:", data)
        return
      }

      console.log("[v0] Registration successful:", data)
      setSubmitted(true)

      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          rollNumber: "",
          year: "",
          section: "",
          batch: "",
        })
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      console.error("[v0] Request error:", err)
    } finally {
      setLoading(false)
      submitInProgress.current = false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-cyan-500/30 bg-slate-900/95 backdrop-blur-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{sport.icon}</span>
            <DialogTitle className="text-cyan-300">Register for {sport.name}</DialogTitle>
          </div>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mb-4 text-5xl">✓</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-2">Registration Successful!</h3>
            <p className="text-gray-400">
              We've received your registration for <span className="font-semibold">{sport.name}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">{error}</div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-400 disabled:opacity-50"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-400 disabled:opacity-50"
              />
            </div>

            {/* Roll Number Field */}
            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="text-gray-300">
                Roll Number
              </Label>
              <Input
                id="rollNumber"
                name="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-400 disabled:opacity-50"
              />
            </div>

            {/* Year Field */}
            <div className="space-y-2">
              <Label htmlFor="year" className="text-gray-300">
                Year of Study
              </Label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 text-white rounded-md focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 disabled:opacity-50"
              >
                <option value="">Select year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>

            {/* Section Field */}
            <div className="space-y-2">
              <Label htmlFor="section" className="text-gray-300">
                Section
              </Label>
              <Input
                id="section"
                name="section"
                type="text"
                placeholder="e.g., A, B, CSE-1"
                value={formData.section}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-400 disabled:opacity-50"
              />
            </div>

            {/* Batch Field */}
            <div className="space-y-2">
              <Label htmlFor="batch" className="text-gray-300">
                Batch
              </Label>
              <Input
                id="batch"
                name="batch"
                type="text"
                placeholder="e.g., 2024, 2025"
                value={formData.batch}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-400 disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-800/50 bg-transparent disabled:opacity-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold glow-cyan disabled:opacity-50"
              >
                {loading ? "Registering..." : "Confirm Registration"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
