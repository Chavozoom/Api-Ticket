import express from "express";
import * as dotenv from 'dotenv' 
dotenv.config()

import userRoute  from "./src/routes/user.route.js";
import eventRoute from "./src/routes/event.route.js";

import connectDatabase from "./src/database/db.js";

const app = express();
connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/events", eventRoute);

const port = 4000;

app.listen(port, console.log(`App is running at port ${port}`));
