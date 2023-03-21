import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { CgShapeHexagon } from 'react-icons/cg';
import { TbNumbers } from 'react-icons/tb';
import { Chat } from '../chat/chat';
import { Socket } from 'socket.io-client';
import { User, useSocket } from '@game-mr/helpers';
import {GameTitle as AreaGameTitle, GameIcon as AreaGameIcon } from '@game-mr/game/area'
import { GameIcon } from './gameIcon';
import { RoomData } from './serverLogic';
import { useNavigate } from 'react-router-dom';

export function Lobby({user}:{user:User}) {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);

  const clientLogic = (socket:Socket) => {
    socket.on('connect', () => { setIsConnected(true); });
    socket.on('disconnect', () => { setIsConnected(false) });
  }

  useEffect(() => {
    const socket = useSocket({
      user: user,
      nameSpace: 'lobby',
      logic: (socket) => clientLogic(socket)
    })
    setSocket(socket)
    return () => {
      socket.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  return !socket ? (
        <div> Joining room...</div>
      ) : (
    <div>
      <h1 className="text-center mt-3">Choose a game!</h1>
      <Container>
        <div className="d-flex flex-wrap justify-content-center">
          <GameIcon onClick={() => navigate(`/area`)}  title={AreaGameTitle} icon={<AreaGameIcon/>}/>

          <GameIcon onClick={() => navigate(`/stellcon`)} title="Stellcon">
            <CgShapeHexagon size="3em" className="mx-auto mt-3 mb-2 text-warning"/>
          </GameIcon>
          <GameIcon onClick={() => navigate(`/number-game`)} title='Number Game'>
            <TbNumbers size="3em" className="mx-auto mt-3 mb-2 text-success" />
          </GameIcon>
        </div>
      </Container>
      <div className='fixed-bottom'>
        <h6 className={`ms-2 ${isConnected ? 'text-success' : 'text-danger'}`}>Connected: {String(isConnected)}</h6>
        <Chat userName={user?.name} socket={socket} room="lobby"/>
      </div>
    </div>
  )
}

export default Lobby;
