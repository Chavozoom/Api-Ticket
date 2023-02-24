import express from "express";
const route = express.Router();

import {create, findAll, findByID, update} from "../controllers/user.controller.js"
import {validId, validUser} from "../middlewares/user.middlewares.js";

route.post("/", create);
route.get("/", findAll);
route.get("/:id", validId, validUser, findByID);
route.patch("/:id", validId, validUser, update);

export default route;