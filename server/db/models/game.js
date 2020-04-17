const mongoose = require("mongoose");

var game = mongoose.model("game", {
  host: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
  },
  players: [],
  started: {
    type: Boolean,
  },
  game_name: {
    type: String,
  },
  created_date: {
    type: String,
  },
  started_date: {
    type: String,
  },
  finished_date: {
    type: String,
  },
  draw_deck: [],
  hands: {
    type: Boolean,
  },
});

module.exports = {
  game,
};
