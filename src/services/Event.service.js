import Event from "../models/Event.js";

export const createService = (body) => Event.create(body);
export const findAllService = () => Event.find();
export const findByIdService = (id) => Event.findById(id);
export const updateService = (id, title, description, details, address) =>
  User.findOneAndUpdate({ _id: id }, { title, description, details, address });