import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findByID,
  update,
} from "../controllers/events.controller.js";
import {
  purchase,
  findAllTicketByUser,
  cancelBought,
  findTicketById,
} from "../controllers/ticket.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId, validEvent } from "../middlewares/global.middlewares.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/:id", validId, validEvent, findByID);
router.patch("/:id", validId, validEvent, authMiddleware, update);
router.get("/ticket", authMiddleware, findAllTicketByUser);
router.get("/ticket/:id", validId, authMiddleware, findTicketById);
router.post("/ticket/:id/", authMiddleware, validEvent, purchase);
router.delete("/ticket/:id", validId, authMiddleware, cancelBought);

export default router;
