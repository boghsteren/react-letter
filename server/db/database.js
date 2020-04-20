const mongoose = require("mongoose");
require("dotenv").config();

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports.generalDB = mongoose.createConnection(
  `${process.env.MONGO}/general`,
  config
);

module.exports.love_letterDB = mongoose.createConnection(
  `${process.env.MONGO}/love_letter`,
  config
);
