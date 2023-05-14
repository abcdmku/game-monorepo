import { ServerSocket, Game, User } from "@game-mr/helpers";
import { validGuess, roomDataProps, roomGuessProps, roomInitState, numcheck, dupeCheck, gameState } from "./helpers";

const serverState = {
  roomData: <{[x:string]:roomDataProps}> {},
  initRoom (room:string) {if(!this.roomData.hasOwnProperty(room)) this.roomData[room] = roomInitState},
  addUser (room:string, player: User) { for (let i = 1; i <= this.roomData[room].maxPlayers; i++) {if(!this.roomData[room].player.hasOwnProperty(i) && this.roomData[room].player[i - 1]?.id !== player.id) {this.roomData[room].player[i] = player; return i}}},
  deleteRoom (room:string) {delete this.roomData[room]},
  addGuess (room: string, guess:roomGuessProps) {this.roomData[room].guesses.push(guess)},
  getPlayerGuesses (room: string, player: User) {return this.roomData[room].guesses.filter(g => g.player.id = player.id).map(o => o['guess']['guess'])},
  setRoomState (room: string, state: gameState) { this.roomData[room].state = state}
}

export const ServerLogic = (game:Game, socket:ServerSocket) => {
  socket.on('joinedRoom', (data) => {
    serverState.initRoom(data.room);
    const playerAdded = serverState.addUser(data.room, data.player)
    playerAdded === serverState.roomData[data.room].maxPlayers && serverState.setRoomState(data.room, gameState.initalizing)
    playerAdded && game.to(data.room).emit('roomData', serverState.roomData[data.room]);
  });

  socket.on('guess', (data, callback) => {
    console.log('checking', data.guess, 'valid:', validGuess(data.guess))
    if(!validGuess(data.guess)) {game.to(socket.id).emit('guessError', 'Guess must be 5 unique numbers'); return}
    if(dupeCheck(data.guess, serverState.getPlayerGuesses(data.room, data.player))) {game.to(socket.id).emit('guessError', 'You guessed that already'); return}

    serverState.addGuess(data.room, {player: data.player, guess: numcheck('12345', data.guess)})
    console.log(serverState.roomData[data.room])

    game.to(data.room).emit('roomData', serverState.roomData[data.room]);
    callback(data);
  });

}
