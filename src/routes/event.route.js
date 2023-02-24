import express from "express";
const route = express.Router();
import {create, findAll, findByID, update} from "../controllers/events.controller.js";

route.post("/", create);
route.get("/", findAll);
route.get("/:id", findByID);
route.patch("/:id", update);

export default route;