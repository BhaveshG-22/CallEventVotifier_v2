const express = require("express");
const io = require("socket.io-client");
require("dotenv").config();

const app = express();

const socket = io.connect(process.env.CALL_MONITORING_WEB_SOCKET_LINK);
const PRIVATE_WS_ROOM = process.env.PRIVATE_WS_ROOM;

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

const emitServerReady = () => {
  socket.emit("requestReceived", {
    room: PRIVATE_WS_ROOM,
    request: {
      Number: "904-111-111",
      Call_Received_ON: "647-XXX-XXX",
      CLient: "Popular Restauranat",
    },
  });
};

app.get("/", (req, res) => {
  !wsConnected
    ? res.status(503).send("Server Not Ready Yet")
    : res.send("Server Ready") && emitServerReady();
});

app.listen("3102", () => {
  console.log("Server Listening on PORT 3102");
});
