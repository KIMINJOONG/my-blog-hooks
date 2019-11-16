import { combineReducers } from 'redux';
import user from './user';
import board from './board';

const rootReducer = combineReducers({
  user,
  board,
});

export default rootReducer;
