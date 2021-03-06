const express = require("express");
const router = express.Router();
const { game_love_letter } = require("../db/models/game_love_letter");
const cards = require("../cards");
const moment = require("moment");
var mongoose = require("mongoose");

const databases = { game_love_letter };

router.get("/:game/", async (req, res) => {
  let doc;
  try {
    doc = await databases[req.params.game].find({});
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.get("/:game/hosted", async (req, res) => {
  let doc;
  try {
    doc = await databases[req.params.game].find({
      "host._id": mongoose.Types.ObjectId(req.user._id),
    });
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.get("/:game/mine", async (req, res) => {
  let doc;
  try {
    doc = await databases[req.params.game].find({
      "players._id": mongoose.Types.ObjectId(req.user._id),
    });
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.get("/:game/open", async (req, res) => {
  let doc;
  try {
    doc = await databases[req.params.game].find({
      started: false,
      "players._id": { $nin: [mongoose.Types.ObjectId(req.user._id)] },
    });
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.get("/:game/active", async (req, res) => {
  let doc;
  try {
    doc = await databases[req.params.game].find({
      started: true,
      finished_date: null,
    });
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.get("/:game/:id", async (req, res) => {
  let doc;
  try {
    doc = await databases[req.params.game].findById(req.params.id);
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.post("/:game", async (req, res) => {
  let doc;
  const deck = cards.new_deck;
  const shuffled_deck = cards.shuffle(deck);
  const item = new databases[req.params.game]({
    game_name: req.body.game.game_name,
    host: req.user,
    players: [req.user],
    draw_deck: shuffled_deck,
    created_date: moment(),
    started: false,
  });
  try {
    doc = await item.save();
  } catch (err) {
    throw err;
  }
  res.send(doc);
  const io = req.app.locals.io;
  io.emit(`game_added`, { game_name: req.params.game, game: doc });
});

router.put("/:game/:id", async (req, res) => {
  let doc;
  const id = req.params;
  const update = req.body;
  try {
    doc = await databases[req.params.game].findByIdAndUpdate(id, update);
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.put("/:game/:id/join", async (req, res) => {
  let doc;
  const { id } = req.params;
  const { user } = req;
  try {
    doc = await databases[req.params.game].findByIdAndUpdate(
      id,
      { $push: { players: user } },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
  res.send(doc);
  const io = req.app.locals.io;
  io.emit(`game_updated`, { game_name: req.params.game, game: doc });
});

router.put("/:game/:id/leave", async (req, res) => {
  let doc;
  const { id } = req.params;
  const { user } = req;
  try {
    doc = await databases[req.params.game].findByIdAndUpdate(
      id,
      { $pull: { players: { _id: user._id } } },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
  res.send(doc);
  const io = req.app.locals.io;
  io.emit(`game_updated`, { game_name: req.params.game, game: doc });
});

router.delete("/:game/:id", async (req, res) => {
  let doc;
  try {
    doc = await databases[req.params.game].findByIdAndRemove(req.params.id);
  } catch (err) {
    res.send(err);
  }
  res.send(doc);
  const io = req.app.locals.io;
  io.emit(`game_deleted`, { game_name: req.params.game, game: doc });
});

module.exports = router;
