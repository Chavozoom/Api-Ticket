const express = require("express");
require('dotenv').config()

const userRoute = require("./src/routes/user.route");
const eventRoute = require("./src/routes/event.route");

const connectDatabase = require("./src/database/db");

const app = express();
connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/events", eventRoute);

const port = 4000;


app.listen(port, console.log("App is running at port " + port))