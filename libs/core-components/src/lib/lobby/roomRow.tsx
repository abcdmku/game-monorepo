import { Button, Stack } from 'react-bootstrap';
import { ImUser } from 'react-icons/im';
import { IoMdEye } from 'react-icons/io';

const randomInt = (max: number) => Math.floor(Math.random() * max);
const randomString = () => (Math.random() + 1).toString(36).substring(7);

export const RoomRow = () => (
  <div className="d-flex justify-content-between">
    <Button
      variant="link"
      size="sm"
      className="text-start font-monospace"
      style={{ width: '80px' }}
    >
      #{randomString()}
    </Button>
    <Stack direction="horizontal" gap={2}>
      <ImUser />
      {randomInt(4)} / 4
    </Stack>
    <Stack direction="horizontal" gap={2}>
      <IoMdEye />
      {randomInt(3)}
    </Stack>
    <Button variant="primary" size="sm">
      Join
    </Button>
  </div>
);
