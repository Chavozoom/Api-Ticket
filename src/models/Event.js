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
    details: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;