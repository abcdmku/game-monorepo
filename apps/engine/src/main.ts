import { Message, User } from '@game-mr/helpers';
import { instrument } from '@socket.io/admin-ui';
import { Namespace, Server, Socket as SocketType } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
const io = new Server(3000, {
  cors: {
    origin: [/(localhost)./, /(minerva.us)/, "https://admin.socket.io"],
    credentials: true
  },
});

instrument(io, {
  auth: false
});

export type Game = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type Socket = SocketType<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

const LobbyLogic = (game:Game, socket:Socket) => {
  socket.on(('joinRoom'), (roomName) => {
    console.log('joining')
    socket.join(roomName ? roomName : '12345');
  });

  socket.on('getRooms', (nameSpace) => {
    let rooms = [];
    console.log('rooms', game.adapter.rooms);
    game.adapter.rooms.forEach(r => {
      console.log('room', r)
      rooms.push(r.forEach(s => console.log(s)))
    })
    socket.emit('rooms', rooms)
  });
}

const Games = [
  {name: 'lobby', logic: LobbyLogic},
  {name: 'area', logic: null}
]

let users: User[] = [];

export const validUserName = (name) => /^([a-zA-Z0-9_-]){1,10}$/.test(name);
export const uniqueUserName = (name) => !users.some(u => u.name === name)

Games.map(gameInfo =>{
  const game = io.of(gameInfo.name);

  let messages: Message[] = [];
  let nsUsers: User[] = [];
  
  game.use((socket, next) => {
    const userName = socket.handshake.query.userName as string;

    if(!/^([a-zA-Z0-9]){1,10}$/.test(userName)) return next(new Error("Username must be 1 to 10 alphanumeric characters long"));
    if(users.some(u => u.name === userName)) return next(new Error("User already exists"));

    socket.data.userName = userName;
    users.push({name: userName});
    next();
  });
  
  
  game.on('connection', (socket) => {
      const userName = socket.data.userName
      nsUsers.push({name: userName});
      game.emit('users',nsUsers)
      game.emit('message', messages)

  
    socket.on("disconnect", () => {
      users = users.filter(user => user.name !== userName)
      nsUsers = nsUsers.filter(user => user.name !== userName)
      game.emit('users',nsUsers)
    });
  
    socket.on("message", (incomingMsg) => {
      const message: Message = {name: userName, message: incomingMsg}
      messages.unshift(message);
      game.emit('message', messages)
    });

    gameInfo.logic && gameInfo.logic(game, socket); 
  })
})
