import { createServerSupabase } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

interface RegistrationRequest {
  sportName: string
  playerName: string
  email: string
  rollNumber: string
  year: string
  section: string
  batch: string
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

    if (!body.sportName || !body.playerName || !body.email || !body.rollNumber || !body.year) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: existingReg } = await supabase
      .from("registrations")
      .select("id")
      .eq("sport_id", (await supabase.from("sports").select("id").eq("name", body.sportName).single()).data?.id)
      .eq(
        "player_id",
        (await supabase.from("players").select("id").eq("roll_number", body.rollNumber).single()).data?.id,
      )

    if (existingReg && existingReg.length > 0) {
      return NextResponse.json({ error: "Player already registered for this sport" }, { status: 409 })
    }

    const { data: playerData, error: playerError } = await supabase
      .from("players")
      .select("id")
      .eq("roll_number", body.rollNumber)
      .single()

    let playerId = playerData?.id

    if (!playerData) {
      const { data: newPlayer, error: insertError } = await supabase
        .from("players")
        .insert({
          name: body.playerName,
          email: body.email,
          roll_number: body.rollNumber,
          year: body.year,
        })
        .select("id")
        .single()

      if (insertError) {
        console.error("[v0] Player insert error:", insertError)
        return NextResponse.json({ error: "Failed to create player record" }, { status: 500 })
      }

      playerId = newPlayer?.id
    }

    const { data: sportData, error: sportError } = await supabase
      .from("sports")
      .select("id, name")
      .eq("name", body.sportName)
      .single()

    if (!sportData) {
      return NextResponse.json({ error: "Sport not found" }, { status: 404 })
    }

    const { data: teamData } = await supabase
      .from("teams")
      .select("id")
      .eq("sport_id", sportData.id)
      .eq("section", body.section)
      .single()

    let teamId = teamData?.id

    if (!teamData) {
      const { data: newTeam, error: teamError } = await supabase
        .from("teams")
        .insert({
          sport_id: sportData.id,
          section: body.section,
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
      section: body.section,
      batch: body.batch,
      players: [{ name: body.playerName, rollNumber: body.rollNumber }],
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
