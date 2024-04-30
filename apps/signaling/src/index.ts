import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('message', (message) => {
    socket.broadcast.emit('message', message)
  })

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});