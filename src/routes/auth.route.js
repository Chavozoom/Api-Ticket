import {login} from "../controllers/auth.controller.js"
import {Router} from "express";
const route = Router();

route.post("/", login);

export default route;