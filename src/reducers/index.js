import { combineReducers } from 'redux';

import pages from './pagesReducer.js';
import elements from './elementsReducer.js';

export default combineReducers({
  pages,
  elements,
});
