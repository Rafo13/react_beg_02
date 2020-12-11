import React, {Fragment} from 'react';
import './App.css';
// import './example';
import { Produt } from './components/Produt';


// 1. Ունենք նախկին տնայինի կոմպոնենտները։ Price կոմպոնենտի մեջ ստանալ props.price-ը, ավելացնել state-ում և ցույց տալ։ Price կոմպոնոնետը պետք է ցույց տա իր state-ում գրանցված price-ի արժեքը, որը սկզբից դոլարով է արտահայտված և նրա կողքին պետք է լինի button՝ “Change the currency” գրությամբ։ button-ի վրա սեղմելուց պետք է վերցնել state-ից price-ը, եթե այն արտահայտված է դոլարով, ապա փոխել այն դրամի (ընդունել 1$ = 487 ֏) և ցույց տալ այն դրամով արտահայտված։ Հաջորդ սեղմելուց, եթե վերջինս դրամով էր, ձևափոխել դոլարի և այդպես շարունակ։


function App() {
  return (
    <div className="cont">
      <Fragment>
        <Produt name="banabas" price="5$" description="Fresh bananas from Ecuador"/>
      </Fragment>    
    </div>
  );
}

export default App;
