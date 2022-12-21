import { ServerSocket, Game } from "@game-mr/helpers";

const randomString = () => (Math.random() + 1).toString(36).substring(7);

export interface RoomData {
  name: string;
  players: string[];
  watchers: string[];
}

export const LobbyLogic = (game:Game, socket:ServerSocket) => {
  const getRooms = async (nameSpace) => {
    let rooms:RoomData[] = [];

    const gameRooms = await game.adapter.rooms;
    for await (const [roomName] of gameRooms) {
      if(roomName.split('/')[0] === nameSpace) {
        const players: string[] = [];
        const watchers: string[] = [];
        game.in(roomName).fetchSockets().then(async sockets => {
          sockets.forEach(async s => {
            const isPlayer = s.data.playing?.includes(roomName);
            isPlayer ? players.push(s.data.userName) : watchers.push(s.data.userName);
          })
        })
        rooms.push({ name: roomName, players: players, watchers: watchers });
      }
    }
    return rooms;
  }

  socket.on(('joinRoom'), async ({game: gameName, room, joinAsPlayer}) => {
    const name = `${gameName}/${ room ?  room : randomString() }`;
    if(joinAsPlayer) {
      const roomsAsPlayer = socket.data.playing?.length ? socket.data.playing : []
      socket.data.playing = [...roomsAsPlayer, name]
    }
    socket.join(name);
    console.log('join', await getRooms(gameName))
    game.emit('rooms', await getRooms(gameName));

  });

  socket.on('getRooms', async (game) => {
    console.log( await getRooms(game))
    socket.emit('rooms', await getRooms(game));
  });
}
