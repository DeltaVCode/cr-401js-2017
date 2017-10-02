import { createStore } from 'redux';
import categoryReducer from '../reducer/category';

export default () => createStore(categoryReducer);
