import React from 'react';
import logo from './logo.svg';
import './App.css';
import f1 from './demo/mod'
import   {f2} from './demo/mod'
import * as obj from './demo/mod'




f1()
f2()
console.log(obj.f2())
console.log(obj.a)
console.log(obj.b)
console.log(obj.c)
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
