import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Chat } from '@game-mr/core-components';
import { User } from 'libs/helpers/src/types';

export function Area({ user }: { user: User }) {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      const socket = io('http://localhost:3000/area', {query: { user: user }});
      setSocket(socket);

    }
  }, []);

  useEffect(() => {
    if(socket && !isConnected) {
      socket.on('connect', () => { setIsConnected(true); });
      socket.on('disconnect', () => { setIsConnected(false) });
      socket.on("connect_error", (err) => {
        console.log(err instanceof Error);
        console.log(err.message);
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
      };
    }
  }, [socket]);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <h1 className="text-center mt-3">Welcome to Area!</h1>
      {!socket ? (
        <div> Joining room...</div>
      ) : (
        <div>
          <div className="fixed-bottom">
            <Chat userName={user.name} socket={socket} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Area;
