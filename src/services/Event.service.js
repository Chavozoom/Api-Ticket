import Event from "../models/Event.js";

export const createService = (body) => Event.create(body);
export const findAllService = (offset, limit) => Event.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");
export const findByIdService = (id) => Event.findById(id);
export const countEvents = () => Event.countDocuments();
export const updateService = (id, title, description, details, address) =>
  User.findOneAndUpdate({ _id: id }, { title, description, details, address });