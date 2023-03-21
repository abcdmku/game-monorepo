import React from 'react';
import { Table } from 'react-bootstrap';
import NumberTableElement from './NumberTableElement';

interface numberTableProps {
  className?:string;
}

function NumberTable({className}:numberTableProps) {
  return (
    <Table style={{"width":"210px"}} className={`${className}`}>
    <tbody>
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <tr key={i}>
          {[0,1,2,3,4].map((f) => (
            <NumberTableElement number={i} key={f}/>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
  );
}

export default NumberTable;
