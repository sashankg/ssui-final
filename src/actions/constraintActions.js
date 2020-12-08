import * as kiwi from 'kiwi.js';
import { updateElement } from './elementActions.js';

const solver = new kiwi.Solver();

var variables = { }
var constraints = { }

variables['pageWidth'] = new kiwi.Variable('width');
variables['pageHeight'] = new kiwi.Variable('height');
solver.addEditVariable(variables['pageWidth'], kiwi.Strength.strong);
solver.addEditVariable(variables['pageHeight'], kiwi.Strength.strong);

solver.suggestValue(variables['pageWidth'], 500);
solver.suggestValue(variables['pageHeight'], 500);

function toVarKey(id, value) {
  return id + value;
}

function fromVarKey(key) {
  return {
    id: key.slice(0, -1),
    value: key.slice(-1),
  }
}

function getVariable(id, value, state) {
  const key = toVarKey(id, value)
  if(variables[key]) {
    return variables[key];
  }
  else{
    var v = new kiwi.Variable(key);
    solver.addEditVariable(v, kiwi.Strength.medium);
    variables[key] = v;
    return v;
  }
}

function toExpression({ value, type, id }, state) {
  function E(x) {
    return new kiwi.Expression(x);
  }
  if(type === 'page') {
    switch(value) {
      case 'left':
        return E(0);
      case 'top':
        return E(0);
      case 'width':
      case 'right':
        return E(variables['pageWidth']);
      case 'height':
      case 'bottom':
        return E(variables['pageHeight']);
    }
  }
  else {
    switch(value) {
      case 'left': {
        const v = getVariable(id, 'x')
        solver.suggestValue(v, state.elements.byId[id].x);
        return E(v);
      }
      case 'top': {
        const v = getVariable(id, 'y')
        solver.suggestValue(v, state.elements.byId[id].y);
        return E(v);
      }
      case 'width': {
        const v = getVariable(id, 'w')
        solver.suggestValue(v, state.elements.byId[id].width);
        return E(v);
      }
      case 'right': {
        const v = getVariable(id, 'x')
        solver.suggestValue(v, state.elements.byId[id].x);
        return v.plus(getVariable(id, 'w'));
      }
      case 'height': {
        const v = getVariable(id, 'h')
        solver.suggestValue(v, state.elements.byId[id].height);
        return E(v);
      }
      case 'bottom': {
        const v = getVariable(id, 'y')
        solver.suggestValue(v, state.elements.byId[id].y);
        return v.plus(getVariable(id, 'h'));
      }
    }
  }
}

function toOp(relationship) {
  switch(relationship) {
    case 'equal':
      return kiwi.Operator.Eq;
    case 'less':
      return kiwi.Operator.Le;
    case 'greater':
      return kiwi.Operator.Ge;
  }
}

const key2value = {
  'x': 'x',
  'y': 'y',
  'w': 'width',
  'h': 'height',
}

const value2key = {
  'x': 'x',
  'y': 'y',
  'width': 'w',
  'height': 'h',
}

export function addConstraint(first, second, relationship, offset) {
  console.log(first, second, relationship, offset);
  return (dispatch, getState) => {
    const state = getState();

    const fe = toExpression(first, state).plus(parseFloat(offset));
    const se = toExpression(second, state);

    console.log(fe, se);

    const c = new kiwi.Constraint(fe, toOp(relationship), se, kiwi.Strength.required);

    const constraintData = { 
      first, 
      second, 
      relationship, 
      offset,
      kiwi: c,
    }
    dispatch({ type: 'ADD_CONSTRAINT', data: constraintData });

    solver.addConstraint(c);
    recalculate(dispatch);
  }
}

function recalculate(dispatch) {
  solver.updateVariables();
  for(var key in variables) {
    if(key !== 'pageHeight' && key !== 'pageWidth') {
      const variable = fromVarKey(key);
      console.log(variables[key]);
      dispatch({
        type: 'UPDATE_ELEMENT',
        data: {
          id: variable.id,
          [key2value[variable.value]]: variables[key].value()
        }
      })
    }
  }
}

export function onUpdateElement(id, data, dispatch) {
  for(var key in data) {
    const variableKey = id + value2key[key]
    console.log(variableKey);
    if(variables[variableKey]) {
      solver.suggestValue(variables[variableKey], data[key]);
    }
  }
  recalculate(dispatch);
}

export function resizePageWidthConstraint(width) {
  return dispatch => {
    solver.suggestValue(variables['pageWidth'], width);
    recalculate(dispatch);
  }
}

export function resizePageHeightConstraint(height) {
  return dispatch => {
    solver.suggestValue(variables['pageHeight'], height);
    recalculate(dispatch);
  }
}