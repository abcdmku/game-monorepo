import { ServerSocket, Game } from "@game-mr/helpers";
import { validGuess, roomDataProps, roomGuessProps, roomInitState, numcheck } from "./helpers";


const serverState = {
  roomData: <{[x:string]:roomDataProps}> {},
  initRoom (room:string) {if(!this.roomData.hasOwnProperty(room)) this.roomData[room] = roomInitState},
  deleteRoom (room:string) {delete this.roomData[room]},
  addGuess (room: string, guess:roomGuessProps) {this.roomData[room].guesses.push(guess)}
}

export const ServerLogic = (game:Game, socket:ServerSocket) => {
  socket.on('joinedRoom', (data) => {
    serverState.initRoom(data.room)
    socket.emit('roomData', serverState.roomData[data.room]);
  });


  socket.on('guess', (data, callback) => {
    console.log('checking', data.guess, 'valid:', validGuess(data.guess))
    if(!validGuess(data.guess)) return new Error("Invalid Guess");

    serverState.addGuess(data.room, {player: data.player, guess: numcheck('12345', data.guess)})
    console.log(serverState.roomData[data.room])

    game.to(data.room).emit('roomData', serverState.roomData[data.room]);
    callback(data);
  });

}
