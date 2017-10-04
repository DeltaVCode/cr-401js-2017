import { combineReducers } from 'redux';

import cards from './card';
import categories from './category';

export default combineReducers({
  cards,
  categories,
});
