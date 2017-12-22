import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import loggerMiddleware from '../lib/loggerMiddleware';

export default function configureStore() {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, applyMiddleware(loggerMiddleware));
};
