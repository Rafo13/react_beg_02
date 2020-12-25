import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer} from './reducer';


const  middleWare = applyMiddleware(logger, thunk);
export const store = createStore(reducer, middleWare);
