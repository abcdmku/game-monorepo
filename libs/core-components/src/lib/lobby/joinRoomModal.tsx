import { User, useSocket } from '@game-mr/helpers';
import { useState, useEffect } from 'react';
import { Modal, Stack, Button, ModalProps } from 'react-bootstrap';
import { Socket } from 'socket.io-client';
import { RoomRow } from './roomRow';
import { RoomData } from './serverLogic';

interface JoinRoomModalProps extends ModalProps {
  game: string;
  user: User;
}

export const JoinRoomModal = ({
  game,
  user,
  ...props
}: JoinRoomModalProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const clientLogic = (socket:Socket) => {
    socket.on('rooms', (r) => (setRooms(r), console.log(r)));
    socket.on('connect', () => { setIsConnected(true); });
    socket.on('disconnect', () => { setIsConnected(false) });
    
  }

  const joinRoom = (game, joinAsPlayer) => socket?.emit('joinRoom', {game: game, joinAsPlayer: joinAsPlayer})

  useEffect(() => {
    const socket = useSocket({
      user: user,
      nameSpace: game,
      logic: (socket) => clientLogic(socket)
    })
    setSocket(socket)
  }, []);

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton className="bg-dark" closeVariant="white">
        <Modal.Title>Join or create a room.</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Stack gap={1}>
          {rooms?.length ? 
          rooms.map(r => (
            <RoomRow roomData={r}/>
          )) :
          <div>Be the first to make a room!</div>
        }
        </Stack>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
      <h6 className={`ms-2 ${isConnected ? 'text-success' : 'text-danger'}`}>Connected: {String(isConnected)}</h6>
        <Button onClick={() => joinRoom(game,true)}>Make Room</Button>
      </Modal.Footer>
    </Modal>
  )
};
