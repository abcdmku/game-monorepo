import { User } from "@game-mr/helpers";
import { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl, Button, Stack, Form } from "react-bootstrap";
import GuessTable from "./GuessTable";
import NumberTable from "./NumberTable";
import { Socket } from 'socket.io-client';
import { dupeCheck, gameState, guess, roomDataProps, validGuess } from "./helpers";

interface gameProps {
  user: User;
  socket: Socket;
  room: string;
}

export const Game = ({user, socket, room}:gameProps) => {

  const [roomData, setRoomData] = useState<roomDataProps>({} as roomDataProps);
  const [guess, setGuess] = useState('');
  const [invalid, setInvalid] = useState(''); 

  useEffect(() => {
    socket.on('roomData', (d) => { setRoomData(d) });
    socket.on('guessError', (d) => { setInvalid(d) });
    socket.emit('joinedRoom', {room: room, player: user});
  }, []);

  useEffect(() => {
    console.log(roomData)
  }, [roomData]);

  const handleGuess = (guess:string, e: React.FormEvent<HTMLFormElement>) => {
    const valid = validGuess(guess);
    const duped = dupeCheck(guess, roomData.guesses.filter(g => g.player.id = user.id).map(o => o['guess']['guess']))
    if(!valid) { setInvalid('Guess must be 5 unique numberss'); return }
    if(duped) { setInvalid('You guessed that already'); return }

    setInvalid('')
    socket.emit('guess', {room: room, player: user, guess: guess}, (r) => console.log('guess res:', r))
    e.currentTarget.reset()
    setGuess('')
  };


  const handleSetNumber = (guess:string, e: React.FormEvent<HTMLFormElement>) => {
    const valid = validGuess(guess);
    if(!valid) { setInvalid('Number must be 5 unique digits'); return }

    setInvalid('')
    socket.emit('guess', {room: room, player: user, guess: guess}, (r) => console.log('guess res:', r))
    e.currentTarget.reset()
    setGuess('')
  };

  return (
    <>
    <Row className="ps-3"><h2 className="p-2">Status: {gameState[roomData.state]}</h2></Row>
      <div className="d-flex w-100 h-75">
      <Row className="m-auto" style={{maxWidth: '900px'}}>

        {(()=>{switch (roomData.state) {
          case gameState.open:
            return <h1 className='text-info loading'>Waiting for players to join</h1>      
          case gameState.initalizing:
            return (
              <Form onSubmit={e => (e.preventDefault(), guess && handleSetNumber(guess, e))}>
                <InputGroup>
                  <Form.Control placeholder="Your Number" onChange={e => (setGuess(e.currentTarget.value), setInvalid(''))}/>
                  <Button type='submit' variant="primary" id="button-addon2">Set</Button>
                </InputGroup>
                <div className="text-danger overflow-hidden d-flex align-items-end mt-1" style={{height: invalid ? '20px': '0', transition: 'all 200ms'}}>
                  {invalid}
                </div>
              </Form>
            )
          case gameState.playing || gameState.finished:
            return ( <>
              <Col style={{minWidth: '300px'}}><NumberTable className="mx-auto"/></Col>
              <Col style={{minWidth: '300px'}}>
                <Form onSubmit={e => (e.preventDefault(), guess && handleGuess(guess, e))}>
                  <InputGroup>
                    <Form.Control placeholder="Guess" onChange={e => (setGuess(e.currentTarget.value), setInvalid(''))} />
                    <Button type='submit' variant="primary" id="button-addon2">Send</Button>
                  </InputGroup>
                  <div className="text-danger overflow-hidden d-flex align-items-end mt-1" style={{height: invalid ? '20px': '0', transition: 'all 200ms'}}>
                    {invalid}
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
            </>)
        }})()}
      </Row>
    </div>
    </>
  );
}

export default Game;
