const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const router = require('./route');
const addUser = require('./users');

const app = express();

app.use(cors({ origin: '*' }));
app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  socket.on('join', ({ name, room }) => {
    socket.join(room);
    const user = addUser({ name, room });
    socket.emit('message', {
      data: {
        user: { name: 'Admin' },
        message: `Hello ${user.name}. You join to ${room}`,
      },
    });
  });

  io.on('disconnect', () => {
    console.log('disconnect');
  });
});

server.listen(5000, () => {
  console.log('Server is running');
});
