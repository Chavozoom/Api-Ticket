import eventService from "../services/Event.service.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    const { title, description, details, address } = req.body;

    if (!title || !description || !details || !address) {
      res.status(400).send({ message: "Error" });
    }

    const event = await eventService.createService(req.body);

    if (!event) {
      return res.status(400).send({ message: "Error creating event" });
    }

    res.status(201).send({
      message: "OK!",
      event: {
        id: event._id,
        title,
        description,
        details,
        address,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const events = await eventService.findAllService();

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

    const event = await eventService.findByIdService(id);

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
    const { title, description, details, address } = req.body;
    if (!title && !description && !details && !address) {
      res.status(400).send({ message: "Submit at least one field to update" });
    }

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    const event = await eventService.findByIdService(id);

    if (!event) {
      return res.status(400).send({ message: "Event not found" });
    }

    await eventService.updateService(id, title, description, details, address);

    res.send({ message: "Event successfully updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

