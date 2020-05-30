const love_letterDB = require("../database").love_letterDB;
const mongoose = require("mongoose");

var game_love_letter = love_letterDB.model("game_love_letter", {
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
  max_players: { type: Number, default: 5 },
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
  game_love_letter,
};
