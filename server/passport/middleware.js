const { mongoose } = require("../db/database");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const sessionMiddleWare = session({
  secret: "fraggle-rock",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
});

module.exports = (req, res, next) => {
  session({
    secret: "fraggle-rock",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  });
  next();
};
