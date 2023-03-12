import express from "express";
import userRoute from "./src/routes/user.route.js";
import eventRoute from "./src/routes/event.route.js";
import authRoute from "./src/routes/auth.route.js";

import connectDatabase from "./src/database/db.js";

import * as dotenv from "dotenv";
dotenv.config();

connectDatabase();
const app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/event", eventRoute);
app.use("/auth", authRoute);

const port = process.env.PORT || 4000;

app.listen(port, console.log(`App is running at port ${port}`));
