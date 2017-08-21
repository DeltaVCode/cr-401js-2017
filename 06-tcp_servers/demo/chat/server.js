'use strict';

const net = require('net');
const PORT = process.env.PORT || 3000;
const server = net.createServer();

const pool = [];

const EE = require('events');
const ee = new EE();

ee.on('@all', function (sender, message) {
  pool.forEach(receiver => {
    if (receiver.id === sender.id) return;

    console.log(`Client ${receiver.id} receiving message`)
    receiver.socket.write(`${sender.id}: ${message}`);
  });
})

let id = 1;
server.on('connection', function(socket) {
  const client = {
    id: id++,
    socket
  };
  socket.write(`Welcome. Your ID is ${client.id}.\r\n`);
  pool.push(client);

  socket.on('data', function (data) {
    console.log(data);

    ee.emit('@all', client, data.toString());
  });

  socket.on('error', function (err) {
    console.warn(err);
  })
});

server.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
