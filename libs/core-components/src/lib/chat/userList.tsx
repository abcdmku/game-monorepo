import { User } from "@game-mr/helpers";
import { Stack } from "react-bootstrap";

export const UserList = ({ users }: { users: User[] }) => (
    <Stack>
      {users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </Stack>
  );