import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ticketsAvailable: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
