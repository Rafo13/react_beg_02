import React, {Fragment} from 'react';
import './App.css';
import Comp2 from './Comp2'; 
import Comp1 from './Comp1';

function App() {
  let a1 = 23;
  let a2 = 32;
  let info = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus in alias atque quas obcaecati eaque placeat dolor veniam possimus inventore itaque fugit, enim nobis! Quae ipsum suscipit animi, perspiciatis natus tempora nihil eligendi esse totam eos quaerat id dolorum dolore perferendis quibusdam assumenda libero eum.';
  return (
    <>
      <h3 className="h3">Data</h3>
      <Fragment>
        <div className="App">
          <Comp1 name="Aro" age = {a1} />
        </div>
      </Fragment>
      <Fragment>
        <div className="App">
          <Comp1 name="Vlad" age = {a2} />
        </div>
      </Fragment>
      <div>
        <Comp2 info1="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti aspernatur voluptatibus esse dolorem cumque quo! Accusantium ut quibusdam exercitationem suscipit cumque quae aut autem quasi deleniti, perspiciatis impedit error nostrum libero, voluptatem distinctio facere cupiditate eveniet non doloremque ipsa! Magni possimus labore ullam voluptates, recusandae deserunt sed odit a eum id cumque earum, officia ad. Rerum et sit neque sapiente, quibusdam ab ducimus numquam non dolorum inventore, est, expedita incidunt voluptatem dolores facere labore sint deserunt fugiat vel totam velit. Ea fugit iste voluptas voluptates velit repellendus praesentium unde eius!" info2={info}/>
      </div>

    </>
  );
}

export default App;
