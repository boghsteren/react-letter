const express = require("express");
const router = express.Router();
const { game } = require("../db/models/game");
const cards = require("../cards");
const moment = require("moment");
var mongoose = require("mongoose");

router.get("/", async (req, res) => {
  let doc;
  try {
    doc = await game.findById(req.body.game);
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.get("/mine", async (req, res) => {
  let doc;
  try {
    doc = await game.find({
      "host._id": mongoose.Types.ObjectId(req.user._id),
    });
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.get("/open", async (req, res) => {
  let doc;
  try {
    doc = await game.find({
      started: false,
    });
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.post("/", async (req, res) => {
  let doc;
  const deck = cards.new_deck;
  const shuffled_deck = cards.shuffle(deck);
  const item = new game({
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
});

router.put("/", async (req, res) => {
  let doc;
  try {
    doc = await game.findByIdAndUpdate(req.body.game, req.body.update);
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.delete("/:id", async (req, res) => {
  let doc;
  try {
    doc = await game.findByIdAndRemove(req.params.id);
  } catch (err) {
    res.send(err);
  }
  res.send(doc);
});

module.exports = router;
