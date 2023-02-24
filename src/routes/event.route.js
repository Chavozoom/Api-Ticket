const route = require("express").Router();
const eventsController = require("../controllers/events.controller")

route.post("/", eventsController.create);
route.get("/", eventsController.findAll);
route.get("/:id", eventsController.findByID);

module.exports = route;