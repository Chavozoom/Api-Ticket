const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("Wait database connection");

  mongoose.connect(
    process.env.DATABASE,
    { useNewURLParser: true, useUnifiedTopology: true }
  ).then(() => console.log("Database connected")).catch((error) => console.log(error))
};

module.exports = connectDatabase;
