import React, {Fragment} from 'react';
import './App.css';
// import './example';
import { Produt } from './components/Produt';


// 1. Ստեղծել Product անունով class component, որի մեջ` Price, Name և Description class component-ներ։
// Product-ը կիրառել App.js-ում և props-ով նրան փոխանցել price, name, description պարամետրերը, որոնք պետք է օգտագործվեն համապատասխանաբար Price, Name և Description կոմպոնենտների մեջ։ Օրինակ՝ <Product name=”banabas” price=”1$” description=”Fresh bananas from Ecuador” />
// Բոլոր կոմպոնենտները պետք է լինեն առանձին մոդուլներում։ state օգտագործելու կարիք չկա։


function App() {
  return (
    <div className="cont">
      <Fragment>
        <Produt name="banabas" price="1$" description="Fresh bananas from Ecuador"/>
      </Fragment>    
    </div>
  );
}

export default App;
