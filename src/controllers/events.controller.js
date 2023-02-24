const eventService = require("../services/Event.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
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
};

const findAll = async (req, res) => {
  const events = await eventService.findAllService();

  if (events.length === 0) {
    return res.status(400).send({ message: "No registred events" });
  }

  res.send({ events });
};

const findByID = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Id" });
  }

  const event = await eventService.findByIdService(id);

  if (!event) {
    return res.status(400).send({ message: "User not found" });
  }

  res.send(event);
};

module.exports = { create, findAll, findByID };
