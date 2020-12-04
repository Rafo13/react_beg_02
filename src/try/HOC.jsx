import React from 'react'

export default function HOC(props) {
   console.log(props)
   return (
      <div>
         <p> Hello Im HOC!!!</p>
         <div>{props.children}</div>
      </div>
   )
}
