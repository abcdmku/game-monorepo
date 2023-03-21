import { ServerSocket, Game } from "@game-mr/helpers";

export const ServerLogic = (game:Game, socket:ServerSocket) => {
  socket.on('message', () => {
    console.log('hello from server logic file!');
  });
}
