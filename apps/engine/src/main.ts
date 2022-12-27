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
  {name: '/', logic: null},
  {name: 'lobby', logic: LobbyLogic},
  {name: 'area', logic: null}
]

let users: User[] = [];

export const validUserName = (name) => /^([a-zA-Z0-9_-]){1,10}$/.test(name);
export const uniqueUserName = (name) => !users.some(u => u.name === name);

const isEqual = (...objects) => objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));


Games.map(gameInfo =>{
  const game = io.of(gameInfo.name);

  let messages: Message[] = [];
  let nsUsers: string[] = [];
  
  game.use((socket, next) => {
    const requestedUser = socket.handshake.auth;
    console.log('requestedUser', requestedUser);
    if(!validUserName(requestedUser.name)) return new Error("Username must be 1 to 10 alphanumeric characters long");
    if(!uniqueUserName(requestedUser.name)) return new Error("User already exists");

    const user = {name:requestedUser.name, id: socket.id, token:randomString(4)}
    users.push(user);
    game.emit('users',nsUsers)
    next();
  });
  
  
  game.on('connection', (socket) => {

    socket.on("login", (user:User, callback) => {

    });

    const user = socket.data.user;
    if(false){
    
      socket.on("disconnect", () => {
        users = users.filter(u => u.name !== user.name)
        nsUsers = nsUsers.filter(u => u !== user.name)
        game.emit('users',nsUsers)
      });
    
      socket.on("message", (incomingMsg) => {
        const message: Message = {name: user.name, message: incomingMsg}
        messages.unshift(message);
        game.emit('message', messages)
      });

      game.name !== 'lobby' && LobbyLogic(game, socket);

      gameInfo.logic && gameInfo.logic(game, socket); 
    }
  })
})
