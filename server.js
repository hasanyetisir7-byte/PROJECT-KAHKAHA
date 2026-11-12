const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_, res) => res.json({ ok: true, game: "PROJECT KAHKAHA" }));

const players = new Map();
const COLORS = [0xff5d73,0x58b7ff,0xffc857,0x79df9b,0xb28cff,0xff914d,0x62e0d5,0xff8fc7,0xb8d86b,0xaaaaaa];

io.on("connection", socket => {
  if (players.size >= 10) {
    socket.emit("full");
    socket.disconnect(true);
    return;
  }
  const n = players.size;
  const p = {
    id: socket.id,
    name: "Oyuncu " + (n + 1),
    x: (Math.random() - .5) * 5,
    y: 2,
    z: (Math.random() - .5) * 5,
    rot: 0,
    color: COLORS[n % COLORS.length],
    score: 0
  };
  players.set(socket.id, p);
  socket.emit("welcome", { self: p, players: [...players.values()] });
  socket.broadcast.emit("playerJoined", p);

  socket.on("setName", name => { const me = players.get(socket.id); if (me && typeof name === "string") { me.name = name.slice(0,16); io.emit("playerRenamed", me); } });
  socket.on("move", data => {
    const me = players.get(socket.id);
    if (!me || !data || !Number.isFinite(data.x) || !Number.isFinite(data.y) || !Number.isFinite(data.z)) return;
    me.x = Math.max(-17, Math.min(17, data.x));
    me.y = Math.max(-2, Math.min(12, data.y));
    me.z = Math.max(-17, Math.min(17, data.z));
    me.rot = Number.isFinite(data.rot) ? data.rot : 0;
    socket.broadcast.volatile.emit("playerMoved", me);
  });
  socket.on("bonk", targetId => {
    const target = players.get(targetId);
    if (!target || targetId === socket.id) return;
    io.emit("bonk", { from: socket.id, target: targetId });
  });
  socket.on("disconnect", () => {
    players.delete(socket.id);
    io.emit("playerLeft", socket.id);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => console.log("PROJECT KAHKAHA server listening on " + port));