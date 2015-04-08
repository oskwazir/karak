'use strict';

const net = require('net');
const server = net.createServer();

const handleConnection = function handleConnection(conn){
  const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
  const onConnectionData = function onConnectionData(data){
    console.log(`connection data from ${remoteAddress}: ${data}`);
    conn.write(data);
  };

  const onConnectionClose = function onConnectionClose(){
    console.log(`connection from ${remoteAddress} closed`);
  };

  const onConnectionError = function onConnectionError(err){
    console.error(`connection ${remoteAddress} error ${err}`);
  };

  console.log(`new client connection from ${remoteAddress}`);

  conn.on('data', onConnectionData);
  conn.on('close', onConnectionClose);
  conn.on('error', onConnectionError);


}


server.on('connection', handleConnection);

server.listen(9000, function(){
  console.log('server listening to %j', server.address());
})