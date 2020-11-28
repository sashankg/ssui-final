import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middlewareEnhancer = applyMiddleware(thunk);

export default createStore(reducers, 
  compose(
    middlewareEnhancer, 
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
  )
);
