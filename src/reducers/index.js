import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import counter from './counter';
import extra from './extra';
import posts from './posts';

const reducers = combineReducers({
  //counter, extra
  posts: posts,
  form: formReducer
});

export default reducers;
