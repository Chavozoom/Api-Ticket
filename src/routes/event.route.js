import {Router} from "express";
const router = Router();
import {create, findAll, findByID, update} from "../controllers/events.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js"

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/:id", findByID);
router.patch("/:id", authMiddleware, update);

export default router;