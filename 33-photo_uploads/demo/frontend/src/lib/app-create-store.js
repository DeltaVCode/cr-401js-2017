import reducer from '../reducer';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';
import {createStore, applyMiddleware, compose} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let appStoreCreate = () =>
  createStore(reducer,
     composeEnhancers(applyMiddleware(thunk, reporter)));

export default appStoreCreate;
