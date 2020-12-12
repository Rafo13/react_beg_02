import React, { useState } from 'react';

export default function Hooks() {
   // const state = useState(0);
   const [counter, setCounter] = useState(0)

   // console.log("🚀 state", state)

   const increment = () =>{
      
      // let prevCount = state[0];
      // state[1](prevCount + 1)
      setCounter(counter + 1)
   }
   return (

      <div>
         <h4>Welcome to React Hooks</h4>
         {/* <h3>{state[0]}</h3> */}
         <h3>{counter}</h3>
         <button
         onClick = {increment}
         >
            Click Me
      </button>
      </div>
   )
}
