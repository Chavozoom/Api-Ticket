import User from "../models/User.js";

export const createService = (body) => User.create(body);
export const findAllService = () => User.find();
export const findByIdService = (id) => User.findById(id);
export const updateService = (id, name, email, password, amount) =>
  User.findOneAndUpdate({ _id: id }, { name, email, password, amount });
export const addToUserTicket = (userId, amount, eventId) =>
  User.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { eventTicketsBought: { amount, event: eventId } },
    }
  ).populate("eventTicketsBought.event");
export const cancelBoughtService = (id, ticketId) =>
  User.findByIdAndUpdate(
    { _id: id },
    { $pull: { eventTicketsBought: { _id: ticketId } } }
  );
