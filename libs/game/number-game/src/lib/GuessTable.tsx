import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { guess } from './helpers';



export interface guessTableProps {
  guesses:guess[];
}

function GuessTable({guesses}: guessTableProps ) {
  useEffect(() => {
    console.log(guesses)
  }, []);
  
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
    {guesses?.map((data, i) => (
      <tr key={i}>
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
