import { User } from "@game-mr/helpers";
import { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl, Button, Stack, Form } from "react-bootstrap";
import GuessTable from "./GuessTable";
import NumberTable from "./NumberTable";
import { Socket } from 'socket.io-client';
import { guess, roomDataProps, validGuess } from "./helpers";

interface gameProps {
  user: User;
  socket: Socket;
  room: string;
}

export const Game = ({user, socket, room}:gameProps) => {

  const [roomData, setRoomData] = useState<roomDataProps>({} as roomDataProps);
  const [guess, setGuess] = useState('');
  const [isValid, setValid] = useState(true); 

  useEffect(() => {
    socket.on('roomData', (d) => { setRoomData(d) });
    socket.emit('joinedRoom', {room: room, player: user});
  }, []);

  const handleGuess = (guess:string, e: React.FormEvent<HTMLFormElement>) => {
    const valid = validGuess(guess)
    if(valid) {
      setValid(valid)
      socket.emit('guess', {room: room, player: user, guess: guess}, (r) => console.log('guess res:', r))
      e.currentTarget.reset()
      setGuess('')
    } else {
      setValid(valid)
    }
  };

  return (
    <div className="d-flex w-100 h-75">
    <Row className="m-auto" style={{maxWidth: '900px'}}>
      <Col style={{minWidth: '300px'}}><NumberTable className="mx-auto"/></Col>
      <Col style={{minWidth: '300px'}}>
        <Form onSubmit={(e) => (e.preventDefault(), guess && handleGuess(guess, e))}>
          <InputGroup>
            <Form.Control
              placeholder="Guess"
              onChange={(e) => (setGuess(e.currentTarget.value), setValid(true))}
            />
            <Button type='submit' variant="primary" id="button-addon2">
              Send
            </Button>
          </InputGroup>
          <div className="text-danger overflow-hidden d-flex align-items-end mt-1" style={{height: isValid ? '0': '20px', transition: 'all 200ms'}}>
              Invalid number
            </div>
        </Form>
      <GuessTable guesses={roomData.guesses?.reduce((acc, g) => g.player.name === user.name ? [...acc,  g.guess] : acc, [] as guess[])}/>
      </Col>
      <Col style={{minWidth: '300px'}}>  
        <Stack direction="horizontal">
          <h4>Your number:</h4>
          <h4 className="ms-auto">12345</h4>
        </Stack>
        <GuessTable guesses={roomData.guesses?.reduce((acc, g) => g.player.name !== user.name ? [...acc,  g.guess] : acc, [] as guess[])}/>
      </Col>
    </Row>
    </div>
  );
}

export default Game;
