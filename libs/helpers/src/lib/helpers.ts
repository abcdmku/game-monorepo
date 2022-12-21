import { io, Socket } from 'socket.io-client';
import { User } from '../types';

interface useSocketProps {
  user: User;
  nameSpace: string;
  logic: (x: Socket) => void;
}

export const useSocket = ({ user, nameSpace, logic}: useSocketProps): Socket => {
  const socket = io('http://localhost:3000/' + nameSpace, {query: { user: user }});
  socket.on('connect_error', (err) => {
    console.log(err instanceof Error);
    console.log(err.message);
  });

  logic(socket);
  return socket;
};
