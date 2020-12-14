module.exports.onSocketConnect = (socket, io) => {
  console.log('Client connected :>> ', socket.id);

  socket.on('send_messages', (data) => {
    console.log('socket :>> on send_messages -> emit receive_messages');
    io.emit('receive_messages', new Date());
  });
};
