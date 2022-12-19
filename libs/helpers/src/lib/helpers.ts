import { io, Socket } from 'socket.io-client';

interface useSocketProps {
  userName: string;
  nameSpace: string;
  logic: (x: Socket) => void;
}

export const useSocket = ({ userName, nameSpace, logic}: useSocketProps): Socket => {
  const socket = io('http://localhost:3000/' + nameSpace, {query: { userName: userName }});
  socket.on('connect_error', (err) => {
    console.log(err instanceof Error);
    console.log(err.message);
  });

  logic(socket);
  return socket;
};
