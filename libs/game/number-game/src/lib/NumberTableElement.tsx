import React, { useState } from 'react';

function NumberTableElement({number}:{number:number}) {
    const [style, setStyle] = useState('');
    const [colorInt, setColorInt] = useState(1);
  
    const intToColor = (number:number) => {
      switch(number%5) {
        case 1:
          return "bg-dark text-dark"
        case 2:
          return "bg-dark"
        case 3:
           return "text-success"
        case 4:
          return "bg-success"
        default:
          return ""
      }
    }
  
    const handleClick = () => {
      setColorInt(colorInt + 1);
      setStyle(intToColor(colorInt))
    }
    return (
        <td className={`border border-dark ${style}`} onClick={() => handleClick()} style={{"userSelect":"none"}}>{number}</td>
    )
}

export default NumberTableElement;
