import React, {Fragment} from 'react';

export default function Comp1(props){
   let age = props.age;
   return(
     <div>
       <span className="sp1">{props.name}</span>
       <span>{age}</span>
     </div>
   );
 }
 