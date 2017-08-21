'use strict';

const net = require('net');
const PORT = process.env.PORT || 3000;
const server = net.createServer();

const pool = [];

server.on('connection', function(socket) {
  pool.push({
    socket
  });

  socket.on('data', function (data) {
    console.log(data);

    pool.forEach(client => {
      client.socket.write(`echo: ${data.toString()}`)
    })
  });

});

server.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
