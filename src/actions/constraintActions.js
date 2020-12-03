import * as kiwi from 'kiwi.js';

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

function getVariable(id, value) {
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

function toExpression({ value, type, id }) {
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
      case 'left':
        return E(getVariable(id, 'x'));
      case 'top':
        return E(getVariable(id, 'y'));
      case 'width':
        return E(getVariable(id, 'w'));
      case 'right':
        return E(getVariable(id, 'x').plus(getVariable(id, 'w')));
      case 'height':
        return E(getVariable(id, 'h'));
      case 'bottom':
        return E(getVariable(id, 'y').plus(getVariable(id, 'h')));
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

export function addConstraint(first, second, relationship, offset) {
  console.log(first, second, relationship, offset);
  return (dispatch, getState) => {
    const constraint = { first, second, relationship, offset }
    const id = getState().constraints.nextId;
    dispatch({ type: 'ADD_CONSTRAINT', data: constraint });
    const fe = toExpression(first);
    const se = toExpression(second);
    console.log(fe, se);
    const c = new kiwi.Constraint(fe, toOp(relationship), se, kiwi.Strength.required);
    solver.addConstraint(c);
    solver.updateVariables();
    console.log(variables);
  }
}
