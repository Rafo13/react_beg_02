import React, {Fragment} from 'react';

export default function Comp2(props){
   return(
     <Fragment>
       <div>
         {props.info1}
       </div>
       <p>{props.info2}</p>
     </Fragment>
   )
 }
 