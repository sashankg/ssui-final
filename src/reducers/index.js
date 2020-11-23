import { combineReducers } from 'redux';

import workspace from './workspaceReducer.js';
import pages from './pagesReducer.js';
import elements from './elementsReducer.js';

export default combineReducers({
  pages,
  elements,
  workspace,
});
