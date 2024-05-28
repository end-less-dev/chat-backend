const http = require("http");
const app = require("./app");
const { Server } = require('socket.io');
const attachIO = require('./middleware/attachIo');

const server = http.createServer(app);

const io = new Server(server);

app.use(attachIO(io)); // Attach IO instance to request

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (message) => {
    console.log("message", message);
    socket.emit("chat message", message);
  });
});

server.listen(8080, () => {
  console.log("server listening on 8080");
});
