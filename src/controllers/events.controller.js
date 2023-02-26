import {
  createService,
  findAllService,
  findByIdService,
  updateService,
} from "../services/event.service.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    const { title, description, address, date, image, ticketsAvaliable } =
      req.body;

    if (
      !title ||
      !description ||
      !address ||
      !date ||
      !image ||
      !ticketsAvaliable
    ) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createService({
      title,
      description,
      address,
      date,
      image,
      ticketsAvaliable,
      userId: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const events = await findAllService();

    if (events.length === 0) {
      return res.status(400).send({ message: "No registred events" });
    }

    res.send({ events });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findByID = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    const event = await findByIdService(id);

    if (!event) {
      return res.status(400).send({ message: "User not found" });
    }

    res.send(event);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, description, address, date, image, ticketsAvaliable } =
      req.body;
    if (
      !title &&
      !description &&
      !address &&
      !date &&
      !image &&
      !ticketsAvaliable
    ) {
      res.status(400).send({ message: "Submit at least one field to update" });
    }

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    const event = await findByIdService(id);

    if (!event) {
      return res.status(400).send({ message: "Event not found" });
    }

    await updateService(
      id,
      title,
      description,
      address,
      date,
      image,
      ticketsAvaliable
    );

    res.send({ message: "Event successfully updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
