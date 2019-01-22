let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  // console.log('user connected');
  
  socket.on('disconnect', function(){
    // console.log('user disconnected');
  });
  
  socket.on('position-taken', (positionData) => {
    io.emit('position-taken', { positionData: positionData });    
    // console.log(positionData);
  });

  socket.on('player-join', (playerId) => {
    console.log(`player join - Player ${playerId}`);
    io.emit('player-join', { playerId });    
  });

  socket.on('start-game', (playerId) => {
    console.log(`start game - Player ${playerId}`);
    io.emit('start-game', { playerId });    
  });

});

http.listen(5000, () => {
  console.log('started on port 5000');
});