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

const randomString = (int) => (Math.random() + 1).toString(36).substring(7);

const Games = [
  {name: '', logic: null},
  {name: 'lobby', logic: LobbyLogic},
  {name: 'area', logic: null}
]

let users: User[] = [];

export const validUserName = (name) => /^([a-zA-Z0-9_-]){1,10}$/.test(name);
export const uniqueUserName = (name) => !users.some(u => u.name === name);


Games.map(gameInfo =>{
  const game = io.of(gameInfo.name);

  let messages: Message[] = [];
  let nsUsers: string[] = [];
  
  game.use((socket, next) => {
    const userName = socket.handshake.query.userName as string;

    if(!validUserName(userName)) return next(new Error("Username must be 1 to 10 alphanumeric characters long"));
    if(!uniqueUserName(userName)) return next(new Error("User already exists"));

    socket.data.userName = userName;
    const user = {name: userName, id:socket.id, token: randomString(3)}
    users.push(user);
    next();
  });
  
  
  game.on('connection', (socket) => {
      const userName = socket.data.userName
      const user = {name: userName, id:socket.id, token: randomString(3)}
      nsUsers.push(user.name);
      game.emit('users',nsUsers)
      game.emit('message', messages)

  
    socket.on("disconnect", () => {
      users = users.filter(user => user.name !== userName)
      nsUsers = nsUsers.filter(user => user !== userName)
      game.emit('users',nsUsers)
    });
  
    socket.on("message", (incomingMsg) => {
      const message: Message = {name: userName, message: incomingMsg}
      messages.unshift(message);
      game.emit('message', messages)
    });

    game.name !== 'lobby' && LobbyLogic(game, socket);

    gameInfo.logic && gameInfo.logic(game, socket); 
  })
})
