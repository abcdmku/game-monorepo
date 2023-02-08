import { Message, User } from '@game-mr/helpers';
import { instrument } from '@socket.io/admin-ui';
import { Namespace, Server, Socket as SocketType } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { LobbyLogic } from 'libs/core-components/src/lib/lobby/serverLogic';

const io = new Server(3000, {
  cors: {
    origin: [/(localhost)./, /(minerva.us)/, "https://admin.socket.io"],
    credentials: true
  },
});

instrument(io, {
  auth: false
});
export type ServerIO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type Game = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type Socket = SocketType<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

const randomString = (int) => Array.from(Array(int), () => Math.floor(Math.random() * 36).toString(36)).join('');

type gameLogicProps = (game: Game, socket: Socket, io?: ServerIO) => void

interface gameMapProps { 
  name: string;
  logic: null | gameLogicProps;
}

const Games: gameMapProps[] = [
  {name: '/', logic: null},
  {name: 'lobby', logic: LobbyLogic},
  {name: 'area', logic: null},
  {name: 'stellcon', logic: null},
  {name: 'number-game', logic: null},
]

let users: User[] = [];

export const validUserName = (name) => /^([a-zA-Z0-9_-]){1,10}$/.test(name);
export const uniqueUserName = (name) => !users.some(u => u.name === name);
const userLoggedIn = (user:User) => users.filter(u => isEqual(u,user));

const isEqual = (...objects) => objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

export interface RoomData {
  name: string;
  players: string[];
  watchers: string[];
}

const getRoomData = async (game:Game) => {
  const rooms:RoomData[] = [];

  const gameRooms = await game.adapter.rooms;
  for await (const [roomName] of gameRooms) {
    if(true) {
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

Games.map(gameInfo =>{
  const game = io.of(gameInfo.name);

  let messages: Message[] = [];
  let nsUsers: string[] = [];
  
  game.use((socket, next) => {
    const requestedUser = socket.handshake.auth as User;
    if(requestedUser?.token) {
      const loggedin = userLoggedIn(requestedUser);
      if(loggedin) socket.data.user = requestedUser
    } else {
      if(!validUserName(requestedUser.name)) return new Error("Username must be 1 to 10 alphanumeric characters long");
      if(!uniqueUserName(requestedUser.name)) return new Error("User already exists");
      const user = {name:requestedUser.name, id: socket.id, token:randomString(20)}
      socket.data.user = user
      users.push(user);
    }
    game.emit('users', nsUsers)
    next();
  });

  game.on('connection', async (socket) => {
    const user = socket.data.user as User;
      game.emit('joined', user)
      game.emit('rooms', await getRoomData(game));

      socket.on("disconnect", () => {
        users = users.filter(u => u.name !== user.name)
      });

      socket.on(('joinRoom'), async ({room = randomString(4), joinAsPlayer}) => {
        if(joinAsPlayer) {
          const roomsAsPlayer = socket.data.playing?.length ? socket.data.playing : []
          socket.data.playing = [...roomsAsPlayer, room]
        }

        socket.join(room);

        const message: Message = {room: room, name: 'System', message: `${user.name} joining room ${room} for ${game.name}`}
        messages.unshift(message);
        console.log(message)

        game.to(room).emit('message', messages);

      });

      socket.on("message", ({room = '', message: incomingMsg}) => {
        const message: Message = {room: room, name:user.name, message: incomingMsg}
        messages.unshift(message);
        game.to(room).emit('message', messages.filter(m => m.room === room))
      });

      if (gameInfo.logic) game.name === 'lobby' ? gameInfo.logic(game, socket, io) : gameInfo.logic(game, socket); 
  })
})
