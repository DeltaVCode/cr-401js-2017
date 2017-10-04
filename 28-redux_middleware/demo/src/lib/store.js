import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer';
import logger from './logger';
import promiseMiddleware from './promise-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(reducer,
  composeEnhancers(applyMiddleware(
    logger,
    promiseMiddleware)));
