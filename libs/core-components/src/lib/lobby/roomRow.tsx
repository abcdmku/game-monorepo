import { Button, Stack } from 'react-bootstrap';
import { ImUser } from 'react-icons/im';
import { IoMdEye } from 'react-icons/io';
import { RoomData } from './serverLogic';

export const RoomRow = ({roomData, onJoin}:{roomData:RoomData, onJoin: (joinAsPlayer: boolean) => void}) => (
  <div className="d-flex justify-content-between">
    <Button
      variant="link"
      size="sm"
      className="text-start font-monospace"
      style={{ width: '80px' }}
      onClick={()=> onJoin(true)}
    >
      {roomData.name}
    </Button>
    <Stack direction="horizontal" gap={2}>
      <ImUser />
      {roomData.players.length}
    </Stack>
    <Stack direction="horizontal" gap={2}>
      <IoMdEye />
      {roomData.watchers.length}
    </Stack>
    <Button variant="primary" size="sm" onClick={()=> onJoin(true)}>
      Join
    </Button>
  </div>
);
