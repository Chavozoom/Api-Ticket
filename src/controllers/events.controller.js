import {
  createService,
  findAllService,
  findByIdService,
  updateService,
  countEvents,
} from "../services/event.service.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    const { title, description, address, date, image, ticketsAvailable } =
      req.body;
    if (
      !title ||
      !description ||
      !address ||
      !date ||
      !image ||
      !ticketsAvailable
    ) {
      return res.status(400).send({
        message: "Missing required fields",
      });
    }

    await createService({
      title,
      description,
      address,
      date,
      image,
      ticketsAvailable,
      user: req.userId,
    });

    res.status(201).send({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const events = await findAllService({ offset, limit });
    const total = await countEvents();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (events.length === 0) {
      return res.status(404).send({ message: "No registered events" });
    }

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: events.map((event) => ({
        id: event._id,
        title: event.description,
        date: event.date,
        address: event.address,
        image: event.image,
        ticketsAvailable: event.ticketsAvailable,
        username: event.user.name,
        userPhoto: event.user.userPhoto,
      })),
    });
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
      return res.status(404).send({ message: "Event not found" });
    }

    res.send(event);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, description, address, date, image, ticketsAvailable } =
      req.body;

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    const event = await findByIdService(id);

    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }

    await updateService(
      id,
      title,
      description,
      address,
      date,
      image,
      ticketsAvailable
    );

    res.send({ message: "Event successfully updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
