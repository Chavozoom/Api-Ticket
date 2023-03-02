import {
  createService,
  findAllService,
  updateService,
} from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).send({ message: "Error" });
    }

    const user = await createService(req.body);

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
        userPhoto,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "No registred users" });
    }

    res.send({ users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findByID = (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, email, password, userPhoto } = req.body;
    if (!name && !email && !password && !userPhoto) {
      res.status(400).send({ message: "Submit at least one field to update" });
    }

    const { id } = req;

    await updateService(id, name, email, password, userPhoto);

    res.send({ message: "User successfully updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
