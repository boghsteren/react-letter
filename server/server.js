const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const bodyParser = require("body-parser");
const passport = require("./passport");

const gameAPI = require("./api/game_api");
const userApi = require("./api/users_api");
const chatAPI = require("./api/chat_api");

const { mongoose } = require("./db/database");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const sessionMiddleWare = session({
  secret: "fraggle-rock",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
});

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(sessionMiddleWare);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/game", gameAPI);
app.use("/api/users", userApi);
app.use("/api/chats", chatAPI);
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

server.listen(process.env.PORT || 8080);
app.locals.io = io;
