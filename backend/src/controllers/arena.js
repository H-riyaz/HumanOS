// Socket.io arena controller (initialize with io)

function init(io){
  const nsp = io.of('/arena');
  nsp.on('connection', (socket)=>{
    console.log('Arena client connected', socket.id);
    socket.on('arena:join', (data)=>{
      socket.join('players');
      nsp.to('players').emit('arena:message', { type: 'join', id: socket.id, ts: Date.now() });
    });
    socket.on('disconnect', ()=>console.log('Arena disconnect', socket.id));
  });
}

module.exports = { init };