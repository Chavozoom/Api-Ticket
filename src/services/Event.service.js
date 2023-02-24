const Event = require("../models/Event");

const createService = (body) => Event.create(body);
const findAllService = () => Event.find();
const findByIdService = (id) => Event.findById(id);

module.exports = {
    createService,
    findAllService,
    findByIdService,
}