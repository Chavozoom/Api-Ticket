import Event from "../models/Event.js";

export const createService = (body) => Event.create(body);

export const findAllService = (offset, limit) =>
  Event.find().sort({ _id: -1 }).skip(offset).limit(limit);

export const findEventByIdService = (id) => Event.findById(id);

export const countEvents = () => Event.countDocuments();

export const updateService = (
  id,
  title,
  description,
  address,
  date,
  image,
  ticketsAvailable,
  price
) =>
  Event.findOneAndUpdate(
    { _id: id },
    { title, description, address, date, image, ticketsAvailable, price }
  );

export const increaseTicketAvailible = (id, amount) =>
  Event.findByIdAndUpdate({ _id: id }, { $inc: { ticketsAvailable: amount } });

export const decreaseTicketAvailible = (id, ticketAmount) =>
  Event.findByIdAndUpdate({ _id: id }, { ticketsAvailable: ticketAmount });
