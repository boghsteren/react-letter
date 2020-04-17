const mongoose = require("mongoose");

var chat = mongoose.model("chat", {
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
