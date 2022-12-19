import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Modal,
  ModalProps,
  Stack,
} from 'react-bootstrap';
import { CgShapeHexagon } from 'react-icons/cg';
import { TbNumbers } from 'react-icons/tb';
import { ImUser } from 'react-icons/im';
import { IoMdEye } from 'react-icons/io';
import areaIcon from './areaIcon.svg';
import { Chat } from '../chat/chat';
import { io, Socket } from 'socket.io-client';
import { useSocket } from '@game-mr/helpers';
import { Namespace, Server, Socket as SocketType } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
export type Game = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketProps = SocketType<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
const randomInt = (max:number) => Math.floor(Math.random() * max);
const randomString = () => (Math.random() + 1).toString(36).substring(7);

const GameIcon = ({ children, onClick }: { children: JSX.Element | JSX.Element[], onClick: Function }) => {
  return (
    <Card
      role='button'
      className="game-card border-dark rounded-3 text-center m-4"
      style={{ width: '120px', height: '120px' }}
      onClick={()=>onClick()}
    >
      {children}
    </Card>
  );
};

const RoomRow = () =>
  <div className='d-flex justify-content-between'>
    <Button variant='link' size='sm' className='text-start font-monospace' style={{width:'80px'}}>#{randomString()}</Button>
    <Stack direction='horizontal' gap={2}>
        <ImUser/>
        {randomInt(4)} / 4
      </Stack>
      <Stack direction='horizontal' gap={2}>
        <IoMdEye/>
        {randomInt(3)}
    </Stack>
    <Button variant='primary' size='sm'>Join</Button>
  </div>

interface JoinRoomModal extends ModalProps {
  gameTitle: string;
  roomData: object;
}

const JoinRoomModal = ({gameTitle, roomData, ...props}:JoinRoomModal) =>
  <Modal {...props}>
    <Modal.Header closeButton className='bg-dark' closeVariant='white'>
      <Modal.Title >
        Join or create a room for {gameTitle}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='bg-dark'>
      <Stack gap={1}>
        {[...Array(randomInt(8)+2)].map(()=><RoomRow/>)}
      </Stack>
    </Modal.Body>
    <Modal.Footer className='bg-dark'>
      <Button>Make Room</Button>
    </Modal.Footer>
  </Modal>


export const serverLogic = (game:Game, socket:SocketProps) => {
  socket.on(('joinRoom'), (roomName) => {
    console.log('joining')
    socket.join(roomName ? roomName : '12345');
  });

  socket.on('getRooms', (nameSpace) => {
    let rooms:any[] = [];
    console.log('rooms', game.adapter.rooms);
    game.adapter.rooms.forEach(r => {
      console.log('room', r)
      rooms.push(r.forEach(s => console.log(s)))
    })
    socket.emit('rooms', rooms)
  });
}

export const clientLogic = (socket:Socket) => {
  socket.on('rooms', (r) => console.log(r));
  socket.on('connect', () => { setIsConnected(true); });
  socket.on('disconnect', () => { setIsConnected(false) });
}

export function Lobby({userName}:{userName:string}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [socket, setSocket] = useState<Socket>();
  const [rooms, setRooms] = useState();


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
          <GameIcon onClick={() => socket.emit('getRooms')}>
            <img width="36px" src={areaIcon} className="mx-auto mt-3 mb-2 py-1 text-secondary"/>
            <div className="text-white">Area</div>
          </GameIcon>
          <GameIcon onClick={() => socket.emit('joinRoom', '333')}>
            <CgShapeHexagon size="3em" className="mx-auto mt-3 mb-2 text-warning"/>
            <div className="text-white">Stellcon</div>
          </GameIcon>
          <GameIcon onClick={() => (setSelectedGame('Number Game'), setShowModal(true))}>
            <TbNumbers size="3em" className="mx-auto mt-3 mb-2 text-success" />
            <div className="text-white">Number Game</div>
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
