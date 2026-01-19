import { createServerSupabase } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

interface TeamMember {
  name: string
  rollNo: string
}

interface RegistrationRequest {
  sportName: string
  sportType: 'solo' | 'doubles' | 'team'
  gender: 'male' | 'female'
  section: string
  teamName?: string
  captain: {
    name: string
    email: string
    rollNo: string
    phone: string
  }
  teamMembers?: TeamMember[]
  // Legacy fields for backward compatibility
  playerName?: string
  email?: string
  rollNumber?: string
  year?: string
  batch?: string
}

// Send email notification to admin via useBasin
async function sendAdminNotification(data: {
  sport: string
  section: string
  batch: string
  players: Array<{ name: string; rollNumber: string }>
}) {
  try {
    const basinEndpoint = process.env.NEXT_PUBLIC_USEBASIN_ENDPOINT
    if (!basinEndpoint) {
      console.warn("[v0] useBasin endpoint not configured")
      return
    }

    const formData = new FormData()
    formData.append("sport_name", data.sport)
    formData.append("section", data.section)
    formData.append("batch", data.batch)
    formData.append("players_list", data.players.map((p) => `${p.name} (${p.rollNumber})`).join(", "))
    formData.append("admin_email", process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@techletics.com")

    const response = await fetch(basinEndpoint, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      console.error("[v0] Failed to send admin notification")
    }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationRequest = await request.json()
    const supabase = await createServerSupabase()

    console.log("[v0] Registration attempt:", body)

    // Handle both new format and legacy format
    const isNewFormat = body.captain !== undefined
    
    if (isNewFormat) {
      // New team-based format
      if (!body.sportName || !body.section || !body.captain?.name || !body.captain?.email || !body.captain?.rollNo) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }
    } else {
      // Legacy format
      if (!body.sportName || !body.playerName || !body.email || !body.rollNumber || !body.year) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }
    }

    // Get sport data
    const { data: sportData, error: sportError } = await supabase
      .from("sports")
      .select("id, name")
      .eq("name", body.sportName)
      .single()

    if (!sportData) {
      return NextResponse.json({ error: "Sport not found" }, { status: 404 })
    }

    // Handle new format (team-based registration)
    if (isNewFormat) {
      const section = body.section
      const captain = body.captain!
      const teamMembers = body.teamMembers || []
      const allPlayers = [captain, ...teamMembers]

      // Check if ANY player (captain or team member) is already registered for this sport
      for (let i = 0; i < allPlayers.length; i++) {
        const player = allPlayers[i]
        const isCaptain = i === 0
        const playerRollNo = 'rollNo' in player ? player.rollNo : ''
        const playerName = 'name' in player ? player.name : ''

        const { data: existingPlayer } = await supabase
          .from("players")
          .select("id")
          .eq("roll_number", playerRollNo)
          .single()

        if (existingPlayer) {
          const { data: existingReg } = await supabase
            .from("registrations")
            .select("id")
            .eq("sport_id", sportData.id)
            .eq("player_id", existingPlayer.id)
            .single()

          if (existingReg) {
            const playerType = isCaptain ? "Captain" : "Team member"
            return NextResponse.json({ 
              error: `${playerName} (${playerRollNo}) is already registered for this sport` 
            }, { status: 409 })
          }
        }
      }

      // Extract year from roll number (SE-23086 -> 3rd year based on 23)
      const extractYear = (rollNo: string): string => {
        const match = rollNo.match(/SE-(\d{2})\d{3}/)
        if (!match) return "1st"
        const yearCode = parseInt(match[1])
        const currentYear = new Date().getFullYear() % 100
        const diff = currentYear - yearCode
        if (diff === 0) return "1st"
        if (diff === 1) return "2nd"
        if (diff === 2) return "3rd"
        if (diff === 3) return "4th"
        return "1st"
      }

      // For team/doubles sports, get or create team
      // For solo sports, team_id will be null
      let teamId: string | null = null
      
      if (body.sportType !== 'solo') {
        const { data: teamData } = await supabase
          .from("teams")
          .select("id")
          .eq("sport_id", sportData.id)
          .eq("section", section)
          .single()

        teamId = teamData?.id

        if (!teamData) {
          const { data: newTeam, error: teamError } = await supabase
            .from("teams")
            .insert({
              sport_id: sportData.id,
              section: section,
              team_name: body.teamName || `${section} ${sportData.name}`,
            })
            .select("id")
            .single()

          if (teamError) {
            console.error("[v0] Team insert error:", teamError)
            return NextResponse.json({ error: "Failed to create team record" }, { status: 500 })
          }

          teamId = newTeam?.id
        }
      }

      // Process all players (captain + team members)
      const registeredPlayers = []
      
      for (let i = 0; i < allPlayers.length; i++) {
        const player = allPlayers[i]
        const isCaptain = i === 0 // First player is always captain
        const playerName = 'name' in player ? player.name : ''
        const playerRollNo = 'rollNo' in player ? player.rollNo : ''
        const playerEmail = 'email' in player ? player.email : ''
        const playerPhone = 'phone' in player ? player.phone : ''
        const playerYear = extractYear(playerRollNo)

        // Check if player exists
        const { data: existingPlayer } = await supabase
          .from("players")
          .select("id, phone")
          .eq("roll_number", playerRollNo)
          .single()

        let playerId = existingPlayer?.id

        if (!existingPlayer) {
          // Create new player
          const playerInsertData: any = {
            name: playerName,
            email: playerEmail || `${playerRollNo}@cloud.neduet.edu.pk`,
            roll_number: playerRollNo,
            section: section,
            gender: body.gender,
          }

          // Only add phone if it exists (only captain has phone)
          if (playerPhone) {
            playerInsertData.phone = playerPhone
          }

          const { data: newPlayer, error: insertError } = await supabase
            .from("players")
            .insert(playerInsertData)
            .select("id")
            .single()

          if (insertError) {
            console.error("[v0] Player insert error:", insertError)
            return NextResponse.json({ error: `Failed to create player record for ${playerName}` }, { status: 500 })
          }

          playerId = newPlayer?.id
        } else if (playerPhone && !existingPlayer.phone) {
          // Update existing player with phone number if they don't have one
          const { error: updateError } = await supabase
            .from("players")
            .update({ phone: playerPhone })
            .eq("id", existingPlayer.id)

          if (updateError) {
            console.error("[v0] Player phone update error:", updateError)
            // Don't fail registration if phone update fails, just log it
          }
        }

        // Create registration
        const registrationData: any = {
          player_id: playerId,
          sport_id: sportData.id,
          is_captain: isCaptain,
          gender: body.gender,
        }

        // Only add team_id for team/doubles sports
        if (teamId !== null) {
          registrationData.team_id = teamId
        }

        const { data: registration, error: regError } = await supabase
          .from("registrations")
          .insert(registrationData)
          .select()
          .single()

        if (regError) {
          console.error("[v0] Registration error:", regError)
          return NextResponse.json({ error: `Failed to register player ${playerName}` }, { status: 500 })
        }

        registeredPlayers.push({ name: playerName, rollNumber: playerRollNo })
      }

      // Send admin notification
      await sendAdminNotification({
        sport: sportData.name,
        section: section,
        batch: extractYear(captain.rollNo),
        players: registeredPlayers,
      })

      console.log("[v0] Team registration successful")

      return NextResponse.json({
        success: true,
        message: `Successfully registered team for ${body.sportName}`,
        playersRegistered: registeredPlayers.length,
      })
    }

    // Legacy format handling
    const { data: existingReg } = await supabase
      .from("registrations")
      .select("id")
      .eq("sport_id", sportData.id)
      .eq(
        "player_id",
        (await supabase.from("players").select("id").eq("roll_number", body.rollNumber!).single()).data?.id,
      )

    if (existingReg && existingReg.length > 0) {
      return NextResponse.json({ error: "Player already registered for this sport" }, { status: 409 })
    }

    const { data: playerData, error: playerError } = await supabase
      .from("players")
      .select("id")
      .eq("roll_number", body.rollNumber!)
      .single()

    let playerId = playerData?.id

    if (!playerData) {
      const { data: newPlayer, error: insertError } = await supabase
        .from("players")
        .insert({
          name: body.playerName!,
          email: body.email!,
          roll_number: body.rollNumber!,
          year: body.year!,
        })
        .select("id")
        .single()

      if (insertError) {
        console.error("[v0] Player insert error:", insertError)
        return NextResponse.json({ error: "Failed to create player record" }, { status: 500 })
      }

      playerId = newPlayer?.id
    }

    const { data: teamData2 } = await supabase
      .from("teams")
      .select("id")
      .eq("sport_id", sportData.id)
      .eq("section", body.section!)
      .single()

    let teamId = teamData2?.id

    if (!teamData2) {
      const { data: newTeam, error: teamError } = await supabase
        .from("teams")
        .insert({
          sport_id: sportData.id,
          section: body.section!,
          team_name: `${body.section} ${sportData.name}`,
        })
        .select("id")
        .single()

      if (teamError) {
        console.error("[v0] Team insert error:", teamError)
        return NextResponse.json({ error: "Failed to create team record" }, { status: 500 })
      }

      teamId = newTeam?.id
    }

    const { data: registration, error: regError } = await supabase
      .from("registrations")
      .insert({
        player_id: playerId,
        team_id: teamId,
        sport_id: sportData.id,
      })
      .select()
      .single()

    if (regError) {
      console.error("[v0] Registration error:", regError)
      return NextResponse.json({ error: "Failed to register player" }, { status: 500 })
    }

    await sendAdminNotification({
      sport: sportData.name,
      section: body.section!,
      batch: body.batch!,
      players: [{ name: body.playerName!, rollNumber: body.rollNumber! }],
    })

    console.log("[v0] Registration successful:", registration)

    return NextResponse.json({
      success: true,
      message: `Successfully registered for ${body.sportName}`,
      registration,
    })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
