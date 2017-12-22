import { combineReducers } from 'redux';
import counter from './counter';
import extra from './extra';
import posts from './posts';

const reducers = combineReducers({
  //counter, extra
  posts
});

export default reducers;
