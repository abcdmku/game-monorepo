import { useSocket } from "@game-mr/helpers";
import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Socket } from "socket.io-client";

export const JoinLobby = ({ onLogin}: { onLogin: (x: string) => void }) => {
    const [userName, setUserName] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);
    
    const clientLogic = (socket:Socket) => {
      socket.on('joined', (u) => { onLogin(u); });
      socket.on('disconnect', () => { setIsConnected(false) });
      socket.on("connect_error", (err) => {
        console.log(err instanceof Error);
        console.log(err.message);
      });

    }

    const handleLogin = (e, userName) => {
      e.preventDefault();

      const socket = useSocket({
        user: {name: userName},
        nameSpace: '',
        logic: (socket) => clientLogic(socket)
      })
    }

    return (
      <div className='d-flex align-items-center' style={{ height: '100vh', overflow: 'hidden' }}>
        <Form className="m-auto" onSubmit={(e) => userName !== '' && handleLogin(e, userName)}>
          <h6 className={`ms-2 ${isConnected ? 'text-success' : 'text-danger'}`}>Connected: {String(isConnected)}</h6>
          <InputGroup onSubmit={(e) => console.log(e)}>
            <Form.Control
              style={{ maxWidth: '200px' }}
              placeholder="username"
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
            <Button
              type='submit'
              variant="primary"
              id="button-addon2"
            >
              Join Lobby
            </Button>
          </InputGroup>
        </Form>
      </div>
    );
  };
  
