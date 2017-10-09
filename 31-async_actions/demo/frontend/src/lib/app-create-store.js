import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer';
import reporter from './redux-reporter';
import thunk from './redux-thunk';

export const appStoreCreate = () =>
  createStore(reducer,
    applyMiddleware(thunk, reporter));

export default appStoreCreate;
