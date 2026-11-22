import { Router } from "express";
import * as playerController from "../controllers/player.controller.js";

const router = Router();

router.get("/", playerController.getPlayers);
router.get("/teammates", playerController.getSharedTeams);
router.get("/reg/:regId", playerController.getPlayerByRegId);
router.get("/:id", playerController.getPlayerById);

export default router;