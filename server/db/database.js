const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection to database successful"))
  .catch((err) => console.error(err));

module.exports = {
  mongoose,
};
