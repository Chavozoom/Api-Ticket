import {Router} from "express";
const route = Router();
import {create, findAll, findByID, update} from "../controllers/events.controller.js";

route.post("/", create);
route.get("/", findAll);
route.get("/:id", findByID);
route.patch("/:id", update);

export default route;