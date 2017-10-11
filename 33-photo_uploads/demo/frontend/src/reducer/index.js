import {combineReducers} from 'redux';
import auth from './auth.js';
import profile from './profile';

export default combineReducers({
  auth,
  profile,
})
