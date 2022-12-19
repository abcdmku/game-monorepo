import { ServerSocket, Game } from "@game-mr/helpers";

export const serverLogic = (game:Game, socket:ServerSocket) => {
    socket.on(('joinRoom'), (roomName) => {
      console.log('joining')
      socket.join(roomName ? roomName : '12345');
    });
  
    socket.on('getRooms', (nameSpace) => {
      let rooms:any[] = [];
      console.log('rooms', game.adapter.rooms);
      game.adapter.rooms.forEach(r => {
        console.log('room', r)
        rooms.push(r.forEach(s => console.log(s)))
      })
      socket.emit('rooms', rooms)
    });
  }
  