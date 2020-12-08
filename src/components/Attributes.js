import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import elementTypes from '../data/elementTypes.js';
import AT from '../data/attributeTypes.js';

let attributes = { };
for(const key in elementTypes) {
  attributes[key] = Object.keys(elementTypes[key]).filter(x => x !== 'name');
}

function AttributeInput({ type, value, onChange, disabled }) {
  switch(type) {
    case AT.string:
      return <Form.Control 
        disabled={ disabled }
      />
    case AT.number:
      return <Form.Control
        disabled={ disabled }
        onChange={ e => onChange(parseInt(e.target.value) || 0) } 
        type="number" 
        value={ value }
      />
    default: 
      return <Form.Control />
  }
}

function ElementAttributes({ isInteractable }) {
  const selected = useSelector(state => state.selected);
  const element = useSelector(state => state.elements.byId[selected.id]);
  const dispatch = useDispatch();
  return <Form>
    <h4>{ `${ elementTypes[element.type].name } (id: ${ selected.id })` }</h4>
    { attributes[element.type].map(key => {
      return <Form.Group key={ key }>
        <Form.Label>{ key }</Form.Label>
        <AttributeInput 
          disabled = { !isInteractable }
          type={ elementTypes[element.type][key] } 
          value={ element[key]}
          onChange={ value => {
            dispatch({
              type: 'UPDATE_ELEMENT',
              data: {
                id: selected.id,
                [key]: value,
              }
            })
          }}
        />
      </Form.Group>
    }) }
  </Form>
}

export default function Attributes() {
  const selected = useSelector(state => state.selected);
  const isInteractable = useSelector(state => state.modes.active_mode) === 'create'
  return <div className="toolboxAttributes">
    { selected.type === 'element' ? <ElementAttributes isInteractable={isInteractable} /> : null }
  </div>
}
