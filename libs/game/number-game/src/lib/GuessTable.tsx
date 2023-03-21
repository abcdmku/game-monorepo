import React from 'react';
import { Table } from 'react-bootstrap';


export interface guessProps {
  guess:string;
  p: number;
  n: number;
}

export interface guessTableProps {
  guesses:guessProps[];
}

function GuessTable({guesses}: guessTableProps ) {
  return (
    <Table striped bordered hover className="mt-3">
    <thead>
      <tr>
        <th className="col">Number</th>
        <th className="col">P</th>
        <th className="col">N</th>
      </tr>
    </thead>
    <tbody>
    {guesses.map(data => (
      <tr key={data.guess}>
        <td>{data.guess}</td>
        <td>{data.p}</td>
        <td>{data.n}</td>
      </tr>
    ))}
    </tbody>
    </Table>
  )
}

export default GuessTable;
