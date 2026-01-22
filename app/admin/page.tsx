'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, LogOut, Phone, Mail, User, Hash, Calendar, Users, Filter, Search, Download, RefreshCw } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

// Supabase configuration - REPLACE WITH YOUR ACTUAL VALUES
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// const ADMIN_CREDENTIALS = [
//   {
//     email: process.env.NEXT_PUBLIC_ADMIN_EMAIL_1,
//     password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_1,
//   },
//   {
//     email: process.env.NEXT_PUBLIC_ADMIN_EMAIL_2,
//     password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_2,
//   },
//   {
//     email: process.env.NEXT_PUBLIC_ADMIN_EMAIL_3,
//     password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_3,
//   },
//   {
//     email: process.env.NEXT_PUBLIC_ADMIN_EMAIL_4,
//     password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_4,
//   },
// ]

const ADMIN_CREDENTIALS = [
  {
    email: "enayat@",
    password: "e86",
  },
  {
    email: "haris@",
    password: "e84",
  },
  {
    email: "affan@",
    password: "e58",
  },
  {
    email: "anas@",
    password: "e87",
  },
]
const getSectionFromRollNo = (rollNo?: string) => {
  if (!rollNo) return 'N/A'

  // Accept: "SE-23086" or "SE23086"
  const match = rollNo.match(/-(\d{5})$/) || rollNo.match(/(\d{5})$/)
  if (!match) return 'N/A'

  const digits = match[1] // e.g. "23086"
  const batch = digits.slice(0, 2) // "23"
  const serial = parseInt(digits.slice(2), 10) // "086" -> 86

  const programMap: Record<string, string> = {
    '22': 'BESE',
    '23': 'TESE',
    '24': 'SESE',
    '25': 'FESE',
  }

  const program = programMap[batch] ?? 'N/A'
  if (program === 'N/A' || Number.isNaN(serial)) return 'N/A'

  const sectionLetter = serial < 50 ? 'A' : 'B' // 50 and above => B
  return `${program}-${sectionLetter}`
}

interface Registration {
  id: string
  sport: {
    name: string
    type: 'solo' | 'doubles' | 'team'
    icon: string
    maxTeamSize: number
  }
  captain: {
    captainName: string
    captainEmail: string
    captainRollNo: string
    captainPhone: string
    section: string
    teamName?: string
  }
  teamMembers: Array<{
    name: string
    rollNo: string
  }>
  registeredAt: string
  gender: 'male' | 'female'
}


// Fetch registrations from Supabase
const fetchRegistrations = async (): Promise<Registration[]> => {
  try {
    // Check if Supabase credentials are configured
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      toast.error('Supabase configuration missing')
      return []
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/registrations?select=*,player:players(*),team:teams(*,sport:sports(*)),sport:sports(*)`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch registrations')
    }

    const data = await response.json()
    // console.log('Raw registration data:', data);

    // Transform the data to match our Registration interface
    const registrationsMap = new Map<string, Registration>()

data.forEach((reg: any) => {
  const teamKey = reg.team_id
    ? `team-${reg.team_id}-sport-${reg.sport_id}`
    : `player-${reg.player_id}-sport-${reg.sport_id}`

  if (!registrationsMap.has(teamKey)) {
    const sportType =
      reg.sport.max_team_size === 1 ? 'solo' :
      reg.sport.max_team_size === 2 ? 'doubles' : 'team'

    const gender = reg.gender || reg.player?.gender || 'male'

    if (reg.is_captain) {
      registrationsMap.set(teamKey, {
        id: teamKey,
sport: {
  name: reg.sport.name,
  type: sportType,
  icon: reg.sport.icon || '🏆',
  maxTeamSize: reg.sport.max_team_size
},

        captain: {
          captainName: reg.player.name,
          captainEmail: reg.player.email,
          captainRollNo: reg.player.roll_number,
          captainPhone: reg.player.phone || 'N/A',
          section: getSectionFromRollNo(reg.player?.roll_number),
          teamName: reg.team?.team_name
        },
        teamMembers: [],
        registeredAt: reg.registered_at,
        gender: gender
      })
    }
  } else if (!reg.is_captain) {
  const registration = registrationsMap.get(teamKey)!

  const allowedMembers = Math.max(0, registration.sport.maxTeamSize - 1) // excluding captain
  if (registration.teamMembers.length >= allowedMembers) return

  registration.teamMembers.push({
    name: reg.player.name,
    rollNo: reg.player.roll_number
  })
}

})


    return Array.from(registrationsMap.values())
  } catch (error) {
    console.error('Error fetching registrations:', error)
    toast.error('Failed to load registrations')
    return []
  }
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Filters
  const [filters, setFilters] = useState({
    gender: 'all' as 'all' | 'male' | 'female',
    sportType: 'all' as 'all' | 'solo' | 'doubles' | 'team',
    section: 'all',
    rollRange: 'all' as 'all' | '22-25',
    searchQuery: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      loadRegistrations()
    }
  }, [isAuthenticated])

  const loadRegistrations = async () => {
    setIsLoading(true)
    const data = await fetchRegistrations()
    setRegistrations(data)
    setIsLoading(false)
  }

  const handleLogin = () => {
    const isValid = ADMIN_CREDENTIALS.some(
      cred => cred.email === loginForm.email && cred.password === loginForm.password
    )

    if (isValid) {
      setIsAuthenticated(true)
      toast.success('Welcome to Admin Dashboard!')
    } else {
      toast.error('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginForm({ email: '', password: '' })
    toast.success('Logged out successfully')
  }

  const openWhatsApp = (phone: string, name: string, sport: string) => {
    const message = `Hello ${name}! This is regarding your ${sport} registration.`
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const filteredRegistrations = registrations.filter(reg => {
    if (filters.gender !== 'all' && reg.gender !== filters.gender) return false
    if (filters.sportType !== 'all' && reg.sport.type !== filters.sportType) return false
    if (filters.section !== 'all' && reg.captain.section !== filters.section) return false
    // Roll number range filter
    if (filters.rollRange === '22-25') {
      const roll = parseInt(reg.captain.captainRollNo.replace(/\D/g, ''))
      if (isNaN(roll) || roll < 22001 || roll > 25999) return false
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      return (
        reg.captain.captainName.toLowerCase().includes(query) ||
        reg.captain.captainRollNo.toLowerCase().includes(query) ||
        reg.captain.captainEmail.toLowerCase().includes(query) ||
        reg.sport.name.toLowerCase().includes(query)
      )
    }
    return true
  })

  const stats = {
    total: registrations.length,
    male: registrations.filter(r => r.gender === 'male').length,
    female: registrations.filter(r => r.gender === 'female').length,
    solo: registrations.filter(r => r.sport.type === 'solo').length,
    doubles: registrations.filter(r => r.sport.type === 'doubles').length,
    team: registrations.filter(r => r.sport.type === 'team').length,
  }

  const exportToCSV = () => {
    const headers = ['Sport', 'Type', 'Captain Name', 'Roll No', 'Email', 'Phone', 'Section', 'Team Members', 'Registered At']
    const rows = filteredRegistrations.map(reg => [
      reg.sport.name,
      reg.sport.type,
      reg.captain.captainName,
      reg.captain.captainRollNo,
      reg.captain.captainEmail,
      reg.captain.captainPhone,
      reg.captain.section,
      reg.teamMembers.map(m => `${m.name} (${m.rollNo})`).join('; '),
      new Date(reg.registeredAt).toLocaleDateString()
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('CSV exported successfully!')
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-cyan-400 mb-2">Admin Portal</h1>
            <p className="text-gray-400">Techletics 2025 Registration Dashboard</p>
          </div>

          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">Email Address</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="admin@cloud.neduet.edu.pk"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold py-3"
            >
              Sign In
            </Button>

            
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Techletics 2025 Registrations</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={loadRegistrations}
              variant="outline"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
            <div className="text-xs text-gray-400 mt-1">Total</div>
          </div>
          <div className="bg-slate-900 border border-blue-500/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-400">{stats.male}</div>
            <div className="text-xs text-gray-400 mt-1">Male</div>
          </div>
          <div className="bg-slate-900 border border-pink-500/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-pink-400">{stats.female}</div>
            <div className="text-xs text-gray-400 mt-1">Female</div>
          </div>
          <div className="bg-slate-900 border border-green-500/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-400">{stats.team}</div>
            <div className="text-xs text-gray-400 mt-1">Team</div>
          </div>
          <div className="bg-slate-900 border border-purple-500/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-400">{stats.doubles}</div>
            <div className="text-xs text-gray-400 mt-1">Doubles</div>
          </div>
          <div className="bg-slate-900 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-yellow-400">{stats.solo}</div>
            <div className="text-xs text-gray-400 mt-1">Solo</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-cyan-400">Filters</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value as any }))}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Sport Type Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Sport Type</label>
              <select
                value={filters.sportType}
                onChange={(e) => setFilters(prev => ({ ...prev, sportType: e.target.value as any }))}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="team">Team</option>
                <option value="doubles">Doubles</option>
                <option value="solo">Solo</option>
              </select>
            </div>

            {/* Section Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Section</label>
              <select
                value={filters.section}
                onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All Sections</option>
                <option value="FESE-A">FESE-A</option>
                <option value="FESE-B">FESE-B</option>
                <option value="SESE-A">SESE-A</option>
                <option value="SESE-B">SESE-B</option>
                <option value="TESE-A">TESE-A</option>
                <option value="TESE-B">TESE-B</option>
                <option value="BESE-A">BESE-A</option>
                <option value="BESE-B">BESE-B</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                Roll Number Range
              </label>
              <select
                value={filters.rollRange}
                onChange={(e) =>
                  setFilters(prev => ({ ...prev, rollRange: e.target.value as any }))
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="22-25">22001 – 25999</option>
              </select>
            </div>


            {/* Search */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Name, Roll No, Email..."
                  className="w-full px-3 py-2 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              onClick={() => setFilters({ gender: 'all', sportType: 'all', section: 'all', rollRange: 'all', searchQuery: '' })}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              Clear Filters
            </Button>
            <Button
              onClick={exportToCSV}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={filteredRegistrations.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV ({filteredRegistrations.length})
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-400">
          Showing <span className="text-cyan-400 font-bold">{filteredRegistrations.length}</span> of {registrations.length} registrations
        </div>

        {/* Registrations List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading registrations...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-12 text-center">
              <p className="text-gray-400">
                {registrations.length === 0 
                  ? 'No registrations found in database.' 
                  : 'No registrations found matching your filters.'}
              </p>
            </div>
          ) : (
            filteredRegistrations.map((reg) => (
              <div key={reg.id} className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-colors">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{reg.sport.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400">{reg.sport.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          reg.sport.type === 'solo' ? 'bg-blue-500/20 text-blue-400' :
                          reg.sport.type === 'doubles' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {reg.sport.type.toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          reg.gender === 'male' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'
                        }`}>
                          {reg.gender.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => openWhatsApp(reg.captain.captainPhone, reg.captain.captainName, reg.sport.name)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>

                {/* Captain Details */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">Captain:</span>
                    <span className="text-white font-semibold">{reg.captain.captainName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">Roll:</span>
                    <span className="text-white font-semibold">{reg.captain.captainRollNo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white font-semibold text-xs">{reg.captain.captainEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white font-semibold">{reg.captain.captainPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">Section:</span>
                    <span className="text-white font-semibold">{reg.captain.section}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">Registered:</span>
                    <span className="text-white font-semibold">{new Date(reg.registeredAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Team Name */}
                {reg.captain.teamName && (
                  <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-sm text-gray-400">Team Name: </span>
                    <span className="text-magenta-400 font-bold">{reg.captain.teamName}</span>
                  </div>
                )}

                {/* Team Members */}
                {reg.teamMembers.length > 0 && (
                  <div className="border-t border-slate-700 pt-4">
                    <h4 className="text-sm font-bold text-magenta-400 mb-3">
                      {reg.sport.type === 'doubles' ? 'Partner' : 'Team Members'} ({reg.teamMembers.length})
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {reg.teamMembers.map((member, idx) => (
                        <div key={idx} className="bg-slate-800/30 rounded p-3 border border-slate-700">
                          <div className="text-sm text-white font-semibold">{member.name}</div>
                          <div className="text-xs text-gray-400">{member.rollNo}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}