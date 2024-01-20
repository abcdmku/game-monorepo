import { ServerSocket, Game, User } from "@game-mr/helpers";
import { validGuess, roomDataProps, roomInitState, numcheck, dupeCheck, gameState, playerNumber, guess, playerInitState } from "./helpers";

export const serverState = {
  roomData: <{[x:string]:roomDataProps}> {},
  initRoom (room:string) {if(!this.roomData.hasOwnProperty(room)) this.roomData[room] = JSON.parse(JSON.stringify(roomInitState))},
  addUser (room:string, player: User) { for (let i = 1; i <= this.roomData[room].maxPlayers; i++) { if(!this.roomData[room].players.hasOwnProperty(i) && this.roomData[room].players[i - 1]?.user.id !== player.id) {this.roomData[room].players[i] = JSON.parse(JSON.stringify({...playerInitState, user: player}));return i}}},
  deleteRoom (room:string) {delete this.roomData[room]},
  addGuess (room: string, player: User, guess:guess) {this.roomData[room].players[this.getPlayerNumber(room, player)].guesses.push(guess)},
  getPlayerGuesses (room: string, player: User) {return this.roomData[room].players[this.getPlayerNumber(room, player)].guesses.map(o => o['guess'])},
  setRoomState (room: string, state: gameState) { this.roomData[room].state = state},
  getPlayerNumber (room: string, player: User) { return playerNumber(this.roomData[room].players, player)},
  setPlayerNumber (room: string, player: User, number: string) {this.roomData[room].players[this.getPlayerNumber(room, player)].number = number}, 
  playersAddedNumbers (room: string) { let numbersAdded = 0; Object.values(this.roomData[room].players).map((v:any) => v.number !== '' && numbersAdded++); return numbersAdded === this.roomData[room].maxPlayers},
  switchTurns (room: string) { this.roomData[room].turn = ((this.roomData[room].turn) % this.roomData[room].maxPlayers) + 1}
}

export const ServerLogic = (game:Game, socket:ServerSocket) => {
  socket.on('getServerState', () => {
    socket.emit('serverState', serverState);
  })

  socket.on('joinedRoom', (data) => {
    serverState.initRoom(data.room);
    const playerAdded = serverState.addUser(data.room, data.player)
    playerAdded === serverState.roomData[data.room].maxPlayers && serverState.setRoomState(data.room, gameState.initalizing)
    playerAdded 
      ? game.to(data.room).emit('roomData', serverState.roomData[data.room])
      : socket.emit('roomData', serverState.roomData[data.room]);
  });

  socket.on('setNumber', (data, callback) => {
    if(!validGuess(data.number)) {game.to(socket.id).emit('guessError', 'Number must be 5 unique digits'); return}
    serverState.setPlayerNumber(data.room, data.player, data.number)
    if(serverState.playersAddedNumbers(data.room)) {
      serverState.setRoomState(data.room, gameState.playing);
      game.to(data.room).emit('roomData', serverState.roomData[data.room]);
    } else callback('waiting')
  });

  socket.on('guess', (data, callback) => {
    if(!validGuess(data.guess)) {game.to(socket.id).emit('guessError', 'Guess must be 5 unique numbers'); return}
    if(dupeCheck(data.guess, serverState.getPlayerGuesses(data.room, data.player))) {game.to(socket.id).emit('guessError', 'You guessed that already'); return}
    serverState.addGuess(data.room, data.player, numcheck('12345', data.guess))
    game.to(data.room).emit('roomData', serverState.roomData[data.room]);
    callback(data);
    socket.emit('serverState', serverState);
  });
}