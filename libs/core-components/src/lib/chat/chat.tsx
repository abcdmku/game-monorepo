import { useEffect, useState } from 'react';
import { Message, User } from '@game-mr/helpers';
import { Socket } from 'socket.io-client';
import { Social } from './social';

/* eslint-disable-next-line */
export interface ChatProps {
  messages: Message[];
  currentUserName: string;
  className?: string;
}

export const Chat = ({userName, socket, room}:{userName:string; socket: Socket, room: string;}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {room: room, name: 'System', message: 'No messages...' },
  ]);
  
  useEffect(() => {
      socket.on('users', (users:User[]) => (console.log(users), setUsers(users)));
      socket.on('message', (msgs) => setMessages(msgs));
      socket.on("connect_error", (err) => {
        console.log(err instanceof Error);
        console.log(err.message);
      });

      return () => {
        socket.off('users');
        socket.off('message');
        socket.off('connect_error');
        
      };
  }, []);

  return <Social
    users={users}
    currentUserName={`${userName}`}
    onSend={(msg) => socket?.emit('message', {room: room, message:msg})}
    messages={messages}
  />
}