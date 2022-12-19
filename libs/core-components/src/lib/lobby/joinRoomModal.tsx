import { Modal, Stack, Button, ModalProps } from 'react-bootstrap';
import { RoomRow } from './roomRow';

const randomInt = (max: number) => Math.floor(Math.random() * max);

interface JoinRoomModalProps extends ModalProps {
  gameTitle: string;
  roomData: object;
}

export const JoinRoomModal = ({
  gameTitle,
  roomData,
  ...props
}: JoinRoomModalProps) => (
  <Modal {...props}>
    <Modal.Header closeButton className="bg-dark" closeVariant="white">
      <Modal.Title>Join or create a room for {gameTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-dark">
      <Stack gap={1}>
        {[...Array(randomInt(8) + 2)].map(() => (
          <RoomRow />
        ))}
      </Stack>
    </Modal.Body>
    <Modal.Footer className="bg-dark">
      <Button>Make Room</Button>
    </Modal.Footer>
  </Modal>
);
