import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export const JoinLobby = ({ onSubmit}: { onSubmit: (x: string) => void }) => {
    const [userName, setUserName] = useState<string>('');
    return (
      <div className='d-flex align-items-center' style={{ height: '100vh', overflow: 'hidden' }}>
        <Form className="m-auto" onSubmit={() => userName !== '' && onSubmit(userName)}>
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
  
