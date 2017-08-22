'use strict';

const uuidv4 = require('uuid/v4');

const net = require('net');
const PORT = process.env.PORT || 3000;
const server = net.createServer();

const pool = [];

const EE = require('events');
const ee = new EE();

const { parser } = require('./lib/parser');

ee.on('@all', function (sender, message) {
  pool.forEach(receiver => {
    if (receiver.id === sender.id) return;

    console.log(`Client ${receiver.id} receiving message`)
    receiver.socket.write(`${sender.id}: ${message}`);
  });
})

server.on('connection', function(socket) {
  const client = {
    id: uuidv4(),
    socket
  };
  socket.write(`Welcome. Your ID is ${client.id}.\r\n`);
  pool.push(client);
  console.log(pool.map(c => c.id));

  socket.on('data', function (data) {
    console.log(data);

    parser(data.toString(), client, ee.emit.bind(ee));
  });

  socket.on('error', function (err) {
    console.warn(err);
  });

  socket.on('close', function () {
    console.log(`Client ${client.id} has left.`);
    pool.splice(pool.indexOf(client), 1);
    console.log(pool.map(c => c.id));
  });

});

server.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
