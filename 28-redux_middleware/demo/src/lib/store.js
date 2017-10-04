import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer';
import logger from './logger';

export default () => createStore(reducer, applyMiddleware(logger));
