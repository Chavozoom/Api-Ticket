import bcrypt from "bcrypt";
import { loginService } from "../services/Auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);

    if (!user) {
      return res.status(400).send({ message: "User or password not found" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: "User or password not found" });
    }

    res.status(200).send("Login OK");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
