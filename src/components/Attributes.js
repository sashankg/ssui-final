import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import elementTypes from '../data/elementTypes.js';
import AT from '../data/attributeTypes.js';
import { updateElement } from '../actions/elementActions.js';

let attributes = { };
for(const key in elementTypes) {
  attributes[key] = Object.keys(elementTypes[key]).filter(x => x !== 'name');
}

function AttributeInput({ type, value, onChange }) {
  switch(type) {
    case AT.string:
      return <Form.Control />
    case AT.number:
      return <Form.Control
        onChange={ e => onChange(parseInt(e.target.value) || 0) } 
        type="number" 
        value={ value }
      />
    default: 
      return <Form.Control />
  }
}

function ElementAttributes() {
  const selected = useSelector(state => state.selected);
  const element = useSelector(state => state.elements.byId[selected.id]);
  const dispatch = useDispatch();
  return <Form>
    <h4>{ `${ elementTypes[element.type].name } (id: ${ selected.id })` }</h4>
    { attributes[element.type].map(key => {
      return <Form.Group key={ key }>
        <Form.Label>{ key }</Form.Label>
        <AttributeInput 
          type={ elementTypes[element.type][key] } 
          value={ element[key]}
          onChange={ value => {
            dispatch(updateElement(selected.id, { [key]: value }))
          }}
        />
      </Form.Group>
    }) }
  </Form>
}

export default function Attributes() {
  const selected = useSelector(state => state.selected);
  return <div className="toolboxAttributes">
    { selected.type === 'element' ? <ElementAttributes /> : null }
  </div>
}
