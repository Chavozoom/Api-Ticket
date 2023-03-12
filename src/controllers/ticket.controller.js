import {
  addToUserTicket,
  cancelBoughtService,
} from "../services/user.service.js";

import {
  decreaseTicketAvailible,
  increaseTicketAvailible,
} from "../services/event.service.js";

export const purchase = async (req, res) => {
  try {
    const { amount } = req.body;
    const { userId } = req;

    if (!amount) {
      res.status(400).send({ message: "Error no amount" });
    }

    const { event, eventId } = req;

    if (amount > event.ticketsAvailable) {
      return res.status(400).send({ message: "Amount unvaliable" });
    }

    const ticketAmount = event.ticketsAvailable - amount;
    await decreaseTicketAvailible(eventId, ticketAmount);

    await addToUserTicket(userId, amount, eventId);

    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findAllTicketByUser = async (req, res) => {
  try {
    const { user } = req;

    const tickets = user.eventTicketsBought;

    if (!tickets) {
      res.status(400).send({ message: "No tickets found" });
    }

    res.send({
      results: tickets.map((ticket) => ({
        amount: ticket.amount,
        event: ticket.event,
        ticketId: ticket._id,
      })),
    });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findTicketById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const ticket = user.eventTicketsBought.filter((ticket) => ticket._id == id);

    if (!ticket) {
      return res.status(400).send({ message: "Ticket not found" });
    }

    res.status(200).send({ ticket });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const cancelBought = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const ticket = user.eventTicketsBought.filter((ticket) => ticket._id == id);

    console.log(ticket);

    if(ticket.length === 0){
      return res.status(400).send({message: "Ticket not found"});
    }

    const { event, amount } = ticket[0];

    await increaseTicketAvailible(event, amount);

    await cancelBoughtService(user._id, id);

    res.status(200).send({ message: "Purchased canceled" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
