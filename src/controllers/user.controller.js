const userService = require("../services/User.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({ message: "Error" });
  }

  const user = await userService.createService(req.body);

  if (!user) {
    return res.status(400).send({ message: "Error creating user" });
  }

  res.status(201).send({
    message: "OK!",
    user: {
      id: user._id,
      name,
      email,
      password,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();

  if (users.length === 0) {
    return res.status(400).send({ message: "No registred users" });
  }

  res.send({ users });
};

const findByID = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Id" });
  }

  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  res.send(user);
};

const update = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    res.status(400).send({ message: "Submit at least one field to update" });
  }

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Id" });
  }

  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  await userService.updateService(id, name, email, password);

  res.send({message:"User successfully updated"});
};

module.exports = { create, findAll, findByID, update };
