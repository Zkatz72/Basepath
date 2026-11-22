import * as playerService from "../services/player.service.js";


export async function getPlayers(req, res, next) {

  try {
    const filters = {
      search: req.query.search,
    };

    const players = await playerService.getPlayers(filters);

    res.json(players);
  } catch (err) {
    next(err);
  }
}

export async function getPlayerById(req, res, next) {
  try {
    const player = await playerService.getPlayerById(req.params.id);

    if (!player) {
      return res.sendStatus(404);
    }

    res.json(player);
  } catch (err) {
    next(err);
  }
}

export async function areTeammates(req, res, next) {
  try {
    const { player1, player2 } = req.query;

    if (!player1 || !player2) {
      return res.status(400).json({
        message: "player1 and player2 are required."
      });
    }

    const areTeammates = await playerService.areTeammates(
      Number(player1),
      Number(player2)
    );

    res.json({
      areTeammates
    });
  } catch (err) {
    next(err);
  }
}

export async function getSharedTeams(req, res, next) {
  try {
    const { player1, player2 } = req.query;

    if (!player1 || !player2) {
      return res.status(400).json({
        message: "player1 and player2 are required.",
      });
    }

    const sharedTeams = await playerService.getSharedTeams(
      Number(player1),
      Number(player2)
    );

    res.json({
      areTeammates: sharedTeams.length > 0,
      sharedTeams,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPlayerByRegId(req, res, next) {
  try {
    const { regId } = req.params;

    const player = await playerService.getPlayerByRegId(regId);

    if (!player) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    res.json(player);
  } catch (err) {
    next(err);
  }
}