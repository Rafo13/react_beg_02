import './App.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import Error404 from './components/pages/Error404/Error404';
import SingleTask from './components/pages/SingleTask/SingleTask';
import Contact from './components/pages/Contact/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import NavMenu from './components/NavMenu/NavMenu';
import {connect} from 'react-redux';
import Spinner from './components/Spinner/Spinner'
// import Hooks from './try/lifeCircle/hooks';

function App(props) {
// console.log(props.error)
const {errorMessage, successMessage, loading} = props;
  if(errorMessage){
    toast.error(errorMessage)
  }

  if(successMessage){
    toast.success(successMessage)
  }

  return (
    <div className="App">
      <NavMenu/>

      <Switch>
        <Route exact path='/' component={ToDo} />
        <Route exact path='/task' component={ToDo} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        {/* <Route exact path='/hook' component={Hooks} /> */}
        <Route exact path='/task/:id' component={SingleTask} />
        <Route exact path='/404' component={Error404} />
        <Redirect to={'/404'}/>
      </Switch>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {loading && <Spinner />}
    </div>
  );
}

const mapStateToProps = (state)=>{
 return {
   errorMessage: state.errorMessage, 
   successMessage: state.successMessage, 
   loading: state.loading
 }
}
export default connect(mapStateToProps)(App);
