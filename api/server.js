const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const photosRouter = require("../photos/photos-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/photos", photosRouter);

server.get("/", (req, res) => {
  res.send(`It's alive!`);
});

module.exports = server;
