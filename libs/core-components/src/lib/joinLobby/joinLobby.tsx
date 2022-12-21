import { useSocket } from "@game-mr/helpers";
import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Socket } from "socket.io-client";

export const JoinLobby = ({ onSubmit}: { onSubmit: (x: string) => void }) => {
    const [userName, setUserName] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);
    
    const clientLogic = (socket:Socket) => {
      socket.on('connect', () => { setIsConnected(true); });
      socket.on('disconnect', () => { setIsConnected(false) });
    }

    
    const handleLogin = (userName) => {
      const socket = useSocket({
        user: {name: userName},
        nameSpace: 'lobby',
        logic: (socket) => clientLogic(socket)
      })
    }

    return (
      <div className='d-flex align-items-center' style={{ height: '100vh', overflow: 'hidden' }}>
        <Form className="m-auto" onSubmit={() => userName !== '' && onSubmit(userName)}>
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
              onClick={() => handleLogin(userName)}
            >
              Join Lobby
            </Button>
          </InputGroup>
        </Form>
      </div>
    );
  };
  
