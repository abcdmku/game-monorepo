import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { CgShapeHexagon } from 'react-icons/cg';
import { TbNumbers } from 'react-icons/tb';
import { Chat } from '../chat/chat';
import { Socket } from 'socket.io-client';
import { useSocket } from '@game-mr/helpers';
import {GameTitle as AreaGameTitle, GameIcon as AreaGameIcon } from '@game-mr/game/area'
import { GameIcon } from './gameIcon';
import { JoinRoomModal } from './joinRoomModal';

export function Lobby({userName}:{userName:string}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [socket, setSocket] = useState<Socket>();
  const [rooms, setRooms] = useState();
  const [isConnected, setIsConnected] = useState(false);

  const clientLogic = (socket:Socket) => {
    socket.on('rooms', (r) => console.log(r));
    socket.on('connect', () => { setIsConnected(true); });
    socket.on('disconnect', () => { setIsConnected(false) });
  }

  useEffect(() => {
    const socket = useSocket({
      userName: userName,
      nameSpace: 'lobby',
      logic: (socket) => clientLogic(socket)
    })
    setSocket(socket)
  }, []);

  return !socket ? (
        <div> Joining room...</div>
      ) : (
    <div>
      <h1 className="text-center mt-3">Choose a game!</h1>
      <Container>
        <div className="d-flex flex-wrap justify-content-center">
          <GameIcon onClick={() => socket.emit('getRooms')} title={AreaGameTitle} icon={<AreaGameIcon/>}/>

          <GameIcon onClick={() => socket.emit('joinRoom', '333')} title="Stellcon">
            <CgShapeHexagon size="3em" className="mx-auto mt-3 mb-2 text-warning"/>
          </GameIcon>
          <GameIcon onClick={() => (setSelectedGame('Number Game'), setShowModal(true))} title='Number Game'>
            <TbNumbers size="3em" className="mx-auto mt-3 mb-2 text-success" />
          </GameIcon>
        </div>
      </Container>
      <div className='fixed-bottom'>
        <h6 className={`ms-2 ${isConnected ? 'text-success' : 'text-danger'}`}>Connected: {String(isConnected)}</h6>
        <Chat userName={userName} socket={socket}/>
      </div>
      <JoinRoomModal show={showModal} centered onHide={() => setShowModal(false)} gameTitle={selectedGame} roomData={{}}/>
    </div>
  )
}

export default Lobby;
