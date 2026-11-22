import * as playerRepository from "../repositories/player.repository.js";

export async function getPlayers(filters) {
  return playerRepository.findAll(filters);
}

export async function getPlayerById(id) {
  return playerRepository.findById(id);
}

export async function areTeammates(player1Id, player2Id) {
  return playerRepository.areTeammates(player1Id, player2Id);
}

export async function getSharedTeams(player1Id, player2Id) {
  return playerRepository.getSharedTeams(player1Id, player2Id);
}

export async function getPlayerByRegId(regId) {
  return playerRepository.findByRegId(regId);
}