import {Router} from "express";
const router = Router();
import {create, findAll, findByID, update} from "../controllers/events.controller.js";

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findByID);
router.patch("/:id", update);

export default router;