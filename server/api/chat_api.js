const express = require("express");
const router = express.Router();
const { chat } = require("../db/models/chat");
const moment = require("moment");

router.get("/:room", async (req, res) => {
  let doc;
  try {
    doc = await chat.findOne({ room_name: req.params.room });
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

router.post("/:room", async (req, res) => {
  const io = req.app.locals.io;
  io.emit(req.params.room, { message: req.body.message, user: req.user });
  let doc;
  try {
    doc = await chat.findOneAndUpdate(
      {
        room_name: req.params.room,
      },
      {
        room_name: req.params.room,
        $push: {
          messages: {
            message: req.body.message,
            user: req.user,
            posted_date: moment(),
          },
        },
      },
      { upsert: true, new: true }
    );
  } catch (err) {
    throw err;
  }
  res.send(doc);
});

module.exports = router;
