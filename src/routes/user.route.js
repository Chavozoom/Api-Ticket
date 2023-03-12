import {Router} from "express";
import {create, findAll, findByID, update} from "../controllers/user.controller.js"
import {validId, validUser} from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", validId, validUser, findByID);
router.patch("/:id", validId, validUser, update);

export default router;