import { ServerSocket, Game, ServerIO } from "@game-mr/helpers";

const randomString = (int) => Array.from(Array(int), () => Math.floor(Math.random() * 36).toString(36)).join('');

export interface RoomData {
  name: string;
  players: string[];
  watchers: string[];
}

export const LobbyLogic = (lobby:Game, socket:ServerSocket, io: ServerIO) => {
  const getRoomData = async (gameName:string) => {
    const rooms:RoomData[] = [];
    const gameNameSpace = io.of(gameName);

    const gameRooms = await gameNameSpace.adapter.rooms;
    for await (const [roomName] of gameRooms) {
      const players: string[] = [];
      const watchers: string[] = [];
      lobby.in(roomName).fetchSockets().then(async sockets => {
        sockets.forEach(async s => {
          const isPlayer = s.data.playing?.includes(roomName);
          isPlayer ? players.push(s.data.userName) : watchers.push(s.data.userName);
        })
      })
      rooms.push({ name: roomName, players: players, watchers: watchers });
    }
    return rooms;
  }

  socket.on(('joinRoom'), async ({game: gameName, room, joinAsPlayer}) => {

    const name = room ?  room : randomString(4);
    if(joinAsPlayer) {
      const roomsAsPlayer = socket.data.playing?.length ? socket.data.playing : []
      socket.data.playing = [...roomsAsPlayer, name]
    }
    socket.emit('joinRoom', `/${gameName}/${name}`);
    console.log('join', `/${gameName}/${name}`)
    lobby.emit(socket.id, " joining room ", `/${gameName}/${name}`);

  });

  socket.on('getRooms', async (game) => {
    socket.emit('rooms', await getRoomData(game));
  });
}
