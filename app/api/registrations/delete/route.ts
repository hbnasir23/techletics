import { createServerSupabase } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

interface DeleteRequest {
  registrationId: string
  sportId: string
  teamId?: string | null
}

export async function DELETE(request: NextRequest) {
  try {
    const body: DeleteRequest = await request.json()
    const supabase = await createServerSupabase()

    console.log("[v0] Delete registration attempt:", body)

    if (!body.registrationId || !body.sportId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Parse the registration ID to determine if it's a team or solo registration
    const isTeamRegistration = body.registrationId.startsWith('team-')
    
    if (isTeamRegistration) {
      // For team registrations, delete all registrations associated with this team
      // Use the teamId directly from the request body (it's already extracted correctly)
      const teamId = body.teamId
      
      if (!teamId) {
        return NextResponse.json({ error: "Team ID not found" }, { status: 400 })
      }

      // Delete all registrations for this team and sport
      const { error: deleteRegsError } = await supabase
        .from("registrations")
        .delete()
        .eq("team_id", teamId)
        .eq("sport_id", body.sportId)

      if (deleteRegsError) {
        console.error("[v0] Error deleting team registrations:", deleteRegsError)
        return NextResponse.json({ error: "Failed to delete registrations" }, { status: 500 })
      }

      // Check if this team has any other registrations in other sports
      const { data: remainingRegs } = await supabase
        .from("registrations")
        .select("id")
        .eq("team_id", teamId)

      // If no other registrations exist, delete the team
      if (!remainingRegs || remainingRegs.length === 0) {
        const { error: deleteTeamError } = await supabase
          .from("teams")
          .delete()
          .eq("id", teamId)

        if (deleteTeamError) {
          console.error("[v0] Error deleting team:", deleteTeamError)
          // Don't fail the request if team deletion fails
        }
      }

      console.log("[v0] Team registration deleted successfully")
      return NextResponse.json({
        success: true,
        message: "Team registration deleted successfully"
      })
    } else {
      // For solo registrations, extract player ID
      // Format: player-{uuid}-sport-{uuid}
      const playerIdMatch = body.registrationId.match(/player-([a-f0-9-]+)-sport/)
      const playerId = playerIdMatch ? playerIdMatch[1] : null
      
      if (!playerId) {
        return NextResponse.json({ error: "Player ID not found" }, { status: 400 })
      }

      // Delete the specific registration
      const { error: deleteRegError } = await supabase
        .from("registrations")
        .delete()
        .eq("player_id", playerId)
        .eq("sport_id", body.sportId)

      if (deleteRegError) {
        console.error("[v0] Error deleting registration:", deleteRegError)
        return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
      }

      console.log("[v0] Solo registration deleted successfully")
      return NextResponse.json({
        success: true,
        message: "Registration deleted successfully"
      })
    }
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}