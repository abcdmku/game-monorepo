import { ServerSocket, Game } from "@game-mr/helpers";
import { validGuess, roomDataProps } from "./helpers";


const serverState = {
  room: <{[x:string]:roomDataProps}> {},
  addRoom(room:string) {if(!this.room.hasOwnProperty(room)) this.room[room] = {} as roomDataProps}
}

export const ServerLogic = (game:Game, socket:ServerSocket) => {
  socket.on('guess', (data, callback) => {
    console.log('checking', data.guess, 'valid:', validGuess(data.guess))
    if(!validGuess(data.guess)) return new Error("Invalid Guess");

    console.log(data);
    callback(data);
  });

}
