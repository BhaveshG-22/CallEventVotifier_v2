const express = require("express");
const io = require("socket.io-client");
require("dotenv").config();

const app = express();

const socket = io.connect("https://callmonitoringwebsocket.onrender.com");
const PRIVATE_WS_ROOM = "123abc";
// console.log(process.env.CALL_MONITORING_WEB_SOCKET_LINK);

socket.emit("join", PRIVATE_WS_ROOM);
console.log("socket.emit(join, PRIVATE_WS_ROOM); ------> Executed");

let wsConnected = false;
socket.on("wsConnected", (boolean) => {
  wsConnected = boolean;
  console.log("Connection ESTABLISHED SUCCESSFULLY!!!!");
});

socket.on("requestResponse", (req) => {
  alert(req);
  console.log("line 22 ------> Executed", req);
});

const emitServerReady = (query) => {
  console.log(query);
  socket.emit("requestReceived", {
    room: PRIVATE_WS_ROOM,
    request: query,
  });
};

app.get("/", (req, res) => {
  !wsConnected
    ? res.status(503).send("Server Not Ready Yet")
    : res.send("Server Ready") && emitServerReady(req.query);
});

app.listen("3102", () => {
  console.log("Server Listening on PORT 3102");
});
