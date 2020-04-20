const mongoose = require("mongoose");
const general = require("../database").generalDB;

var chat = general.model("chat", {
  messages: [
    {
      message: {
        type: String,
      },
      user: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        username: {
          type: String,
        },
        posted_date: {
          type: String,
        },
      },
    },
  ],
  room_name: {
    type: String,
  },
});

module.exports = {
  chat,
};
