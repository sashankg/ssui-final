import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middlewareEnhancer = applyMiddleware(thunk);

export default createStore(reducers, middlewareEnhancer);
