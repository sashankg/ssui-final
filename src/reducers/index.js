import { combineReducers } from 'redux';

import workspace from './workspaceReducer.js';
import pages from './pagesReducer.js';
import elements from './elementsReducer.js';
import selected from './selectedReducer.js';
import link from './linkReducer.js';
import modes from './modesReducer.js';
import constraints from './constraintsReducer.js';
import modes from './modesReducer.js';
import runspace from './runspaceReducer.js';

export default combineReducers({
  pages,
  elements,
  workspace,
  selected,
  link,
  modes
  constraints,
  modes,
  runspace
});
