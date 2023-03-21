import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Chat } from '@game-mr/core-components';
import { User } from 'libs/helpers/src/types';
import { useLocation } from 'react-router-dom';
import { useSocket } from '@game-mr/helpers';

export const NumberGame = ({ user }: { user: User }) => {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);
  const { pathname } = useLocation()
  const [ room ] = useState<string>(`${pathname.split('/').pop()}`)

  useEffect(() => {
    if (!socket) {
      const socket = io('http://localhost:3000/number-game', {query: { user: user }});
      setSocket(socket);
    }
    console.log(room)
  }, []);

  const clientLogic = (socket:Socket) => {
    socket.on('connect', () => { setIsConnected(true); });
    socket.on('disconnect', () => { setIsConnected(false) });
    socket.emit('joinRoom', {room: room, joinAsPlayer: true}, (r) => console.log('joined', r));
  }

  useEffect(() => {
    const socket = useSocket({
      user: user,
      nameSpace: 'number-game',
      logic: (socket) => clientLogic(socket)
    })
    setSocket(socket)
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <h1 className="text-center mt-3">Welcome to Number Game!</h1>
      {!socket ? (
        <div> Joining room...</div>
      ) : (
        <div>
          <div className="fixed-bottom">
            <h6 className={`ms-2 ${isConnected ? 'text-success' : 'text-danger'}`}>Connected: {String(isConnected)}</h6>
            <Chat userName={user.name} socket={socket} room={room}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberGame;
