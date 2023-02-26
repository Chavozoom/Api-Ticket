import {Router} from "express";
const router = Router();

import {create, findAll, findByID, update} from "../controllers/user.controller.js"
import {validId, validUser} from "../middlewares/user.middlewares.js";

router.post("/", create);
router.get("/", findAll);
router.get("/:id", validId, validUser, findByID);
router.patch("/:id", validId, validUser, update);

export default router;