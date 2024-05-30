const http = require("http");
const app = require("./app");
const { Server } = require('socket.io');
const attachIO = require('./middleware/attachIo');
const models = require("./models")
const { uuid } = require('uuidv4');

const server = http.createServer(app);

// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(attachIO(io)); // Attach IO instance to request

io.on("connection",async (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on('previous message', async (userId) => {
    try {
      const prevMsgs = await models.Message.findAll({ where: { userId } });
      socket.emit('previous messages', prevMsgs); // Send the messages back to the client
      console.log("previous messages", prevMsgs);
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  });

  // socket.emit('previous messages', prevMsg);
  socket.on("chat message", async (message) => {
    const createMessageData = {
      messageId: uuid(),
      message: message.message,
      userId: message.userId
  }
    const result = await models.Message.create(createMessageData);
    console.log("message", result, message);
    socket.emit("chat message", message);
  });
});

server.listen(8080, () => {
  console.log("server listening on 8080");
});
