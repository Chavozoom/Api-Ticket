import Event from "../models/Event.js";

const createService = (body) => Event.create(body);
const findAllService = () => Event.find();
const findByIdService = (id) => Event.findById(id);
const updateService = (id, title, description, details, address) =>
  User.findOneAndUpdate({ _id: id }, { title, description, details, address });

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
};
