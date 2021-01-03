import React, { useState } from 'react';

export default function Hooks() {
   const [counter, setCounter] = useState(0)


   const increment = () =>{
      setCounter(counter + 1)
   }
   return (

      <div>
         <h4>Welcome to React Hooks</h4>
         <h3>{counter}</h3>
         <button
         onClick = {increment}
         >
            Click Me
      </button>
      </div>
   )
}
