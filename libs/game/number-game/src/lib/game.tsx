import { Row, Col, InputGroup, FormControl, Button, Stack } from "react-bootstrap";
import GuessTable from "./GuessTable";
import NumberTable from "./NumberTable";

export const Game = () => {
  const guesses = [
    {guess: "12345", p:4, n:1},
    {guess: "23456", p:2, n:1},
    {guess: "15486", p:3, n:0},
    {guess: "95014", p:0, n:3},
    {guess: "07845", p:0, n:2},
  ]

  return (
    <div className="d-flex w-100 h-75">
    <Row className="m-auto" style={{maxWidth: '900px'}}>
      <Col style={{minWidth: '300px'}}><NumberTable className="mx-auto"/></Col>
      <Col style={{minWidth: '300px'}}>
        <InputGroup className="mb-3">
        <FormControl placeholder="12345" type="number"/>
        <Button variant="outline-light" id="button-addon2">
          Guess
        </Button>
        </InputGroup>
      <GuessTable guesses={guesses}/>
      </Col>
      <Col style={{minWidth: '300px'}}>  
        <Stack direction="horizontal">
          <h4>Your number:</h4>
          <h4 className="ms-auto">12345</h4>
        </Stack>
        <GuessTable guesses={guesses}/>
      </Col>
    </Row>
    </div>
  );
}

export default Game;
