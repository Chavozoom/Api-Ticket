import dotenv from "dotenv";
import { findByIdService } from "../services/user.service.js";
import jwt from "jsonwebtoken";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (!authorization || parts.length !== 2 || schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid!" });
      }

      const user = await findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token!" });
      }
      req.userId = user.id;
      req.user = user;

      return next();
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
