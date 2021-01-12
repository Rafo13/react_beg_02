import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer} from './reducer';

let middleWareArray = [thunk];
if(process.env.NODE_ENV === 'development'){
   middleWareArray.push(logger);
}
const  middleWare = applyMiddleware(...middleWareArray);
export const store = createStore(reducer, composeWithDevTools(middleWare));
