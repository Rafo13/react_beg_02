import './App.css';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import Error404 from './components/pages/Error404/Error404';
import SingleTask from './components/pages/SingleTask/SingleTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import NavMenu from './components/NavMenu/NavMenu';
import Hooks from './try/lifeCircle/hooks';

function App() {
  return (
    <div className="App">
      
      <NavMenu/>

      <Switch>
        <Route exact path='/' component={ToDo} />
        <Route exact path='/task' component={ToDo} />
        <Route exact path='/about' component={About} />
        <Route exact path='/hook' component={Hooks} />
        <Route exact path='/task/:id' component={SingleTask} />
        <Route exact path='/404' component={Error404} />
        <Redirect to={'/404'}/>
      </Switch>
    </div>
  );
}

export default App;
