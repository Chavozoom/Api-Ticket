import {
  createService,
  findAllService,
  updateService,
  countEvents,
} from "../services/event.service.js";

export const create = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      date,
      image,
      ticketsAvailable,
      price,
    } = req.body;

    if (
      !title &&
      !description &&
      !address &&
      !date &&
      !image &&
      !ticketsAvailable &&
      !price
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
      price,
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
        title: event.title,
        description: event.description,
        date: event.date,
        address: event.address,
        image: event.image,
        ticketsAvailable: event.ticketsAvailable,
        price: event.price,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findByID = async (req, res) => {
  try {
    const event = req.event;

    res.send(event);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      date,
      image,
      ticketsAvailable,
      price,
    } = req.body;

    if (
      !title &&
      !description &&
      !address &&
      !date &&
      !image &&
      !ticketsAvailable &&
      !price
    ) {
      res.status(400).send({ message: "Submit at least one field to update" });
    }

    const {id} = req;

    await updateService(
      id,
      title,
      description,
      address,
      date,
      image,
      ticketsAvailable,
      price
    );

    res.send({ message: "Event successfully updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
