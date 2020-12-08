import createListReducer from './createListReducer.js';

export default createListReducer({
  add: 'ADD_CONSTRAINT',
  remove: 'REMOVE_CONSTRAINT',
  update: 'UPDATE_CONSTRAINT',
  load: 'LOAD_CONSTRAINTS',
});
