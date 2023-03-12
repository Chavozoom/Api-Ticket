import mongoose from "mongoose";
import { findByIdService } from "../services/user.service.js";
import { findEventByIdService } from "../services/event.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findByIdService(id);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    req.id = id;
    req.user = user;

    return next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validEvent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const event = await findEventByIdService(id);

    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }

    req.eventId = id;
    req.event = event;

    return next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
