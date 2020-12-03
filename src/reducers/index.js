import { combineReducers } from 'redux';

import workspace from './workspaceReducer.js';
import pages from './pagesReducer.js';
import elements from './elementsReducer.js';
import selected from './selectedReducer.js';
import link from './linkReducer.js';
import constraints from './constraintsReducer.js';

export default combineReducers({
  pages,
  elements,
  workspace,
  selected,
  link,
  constraints,
});
