import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import loggerMiddleware from '../lib/loggerMiddleware';

export default function configureStore() {
  const finalCreateStore = compose(
    applyMiddleware(loggerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
