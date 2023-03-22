import { User } from "@game-mr/helpers";
import { useState } from "react";
import { Row, Col, InputGroup, FormControl, Button, Stack, Form } from "react-bootstrap";
import GuessTable from "./GuessTable";
import NumberTable from "./NumberTable";
import { Socket } from 'socket.io-client';

interface Guess {
  guess: string;
  n: number;
  p: number;
}

interface playerDataProps {
  player: User;
  guesses: Guess[];
}

interface roomDataProps {
  playerData: playerDataProps[];
  turn: User;
}

interface gameProps {
  user: User;
  socket: Socket;
  room: string;
}

export const Game = ({user, socket, room}:gameProps) => {

  const [roomData, setRoomData] = useState<roomDataProps>({} as roomDataProps);
  const [guess, setGuess] = useState('');

  const handleGuess = (guess:string) => socket.emit('guess', {room: room, player: user, guess: guess}, (r) => console.log('guess res:', r));


  return (
    <div className="d-flex w-100 h-75">
    <Row className="m-auto" style={{maxWidth: '900px'}}>
      <Col style={{minWidth: '300px'}}><NumberTable className="mx-auto"/></Col>
      <Col style={{minWidth: '300px'}}>
        <Form 
            onSubmit={(e) => (e.preventDefault(), guess && handleGuess(guess), e.currentTarget.reset(), setGuess(''))}
          >
          <InputGroup>
            <Form.Control
              placeholder="12345"
              onChange={(e) => setGuess(e.currentTarget.value)}
            />
            <Button type='submit' variant="primary" id="button-addon2">
              Send
            </Button>
          </InputGroup>
        </Form>
      <GuessTable guesses={roomData.playerData?.filter(p => p.player.name === user.name)[0].guesses}/>
      </Col>
      <Col style={{minWidth: '300px'}}>  
        <Stack direction="horizontal">
          <h4>Your number:</h4>
          <h4 className="ms-auto">12345</h4>
        </Stack>
        <GuessTable guesses={roomData.playerData?.filter(p => p.player.name !== user.name)[0].guesses}/>
      </Col>
    </Row>
    </div>
  );
}

export default Game;
