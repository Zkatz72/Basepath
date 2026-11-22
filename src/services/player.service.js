import { supabase } from "./supabaseClient";

export async function getPlayers(search = "") {
  const { data, error } = await supabase.rpc("search_players", {
    search: search.trim(),
  });

  if (error) {
    throw new Error("Failed to fetch players");
  }

  return data;
}

export async function getTeammates(player1, player2) {
  const { data, error } = await supabase.rpc("get_shared_teams", {
    player1_id: player1,
    player2_id: player2,
  });

  if (error) {
    throw new Error("Failed to fetch teammates");
  }

  return {
    areTeammates: data.length > 0,
    sharedTeams: data,
  };
}

export async function getPlayerByRegId(regId) {
  const { data, error } = await supabase
    .from("player")
    .select(
      "id, reg_id, first_name, last_name, suffix, start_year, end_year, games_batted, games_pitched"
    )
    .eq("reg_id", regId)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to fetch player");
  }

  return data;
}
