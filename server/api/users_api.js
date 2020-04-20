const express = require("express");
const router = express.Router();
const User = require("../db/models/user");
const passport = require("../passport");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
    } else {
      const newUser = new User({
        username: username,
        password: password,
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post(
  "/login",
  function (req, res, next) {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    var userInfo = {
      username: req.user.username,
      _id: req.user._id,
    };
    res.send(userInfo);
  }
);

router.get("/me", (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
