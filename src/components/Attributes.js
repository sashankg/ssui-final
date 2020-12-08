import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import elementTypes from '../data/elementTypes.js';
import AT from '../data/attributeTypes.js';
import { updateElement } from '../actions/elementActions.js';
import { 
    resizePageWidthConstraint, 
    resizePageHeightConstraint,
} from '../actions/constraintActions.js';

let attributes = { };
for(const key in elementTypes) {
  attributes[key] = Object.keys(elementTypes[key]).filter(x => x !== 'name');
}

function AttributeInput({ type, value, onChange, disabled }) {
  switch(type) {
    case AT.color:
    case AT.list:
    case AT.string:
      return <Form.Control 
        disabled={ disabled }
        onChange={ e => onChange(e.target.value || "") } 
        type="string"
        value={ value }
      />
    case AT.page:
    case AT.number:
      return <Form.Control
        disabled={ disabled }
        onChange={ e => onChange(parseInt(e.target.value) || 0) } 
        type="number" 
        value={ value }
      />
    case AT.boolean:
      return <Form.Check
        disabled={ disabled }
        onChange={ e => onChange(e.target.value) } 
        type="number" 
        value={ value }
      />
    case AT.file:
      return <Form.File
        disabled={ disabled }
        label="Image File"
        onChange={ e => onChange(e.target.files[0]) }
        feedbackTooltip
      />
    default: 
      return <Form.Control
        disabled={ disabled }
      />
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
            dispatch(updateElement(selected.id, { [key]: value }))
          }}
        />
      </Form.Group>
    }) }
  </Form>
}

function PageAttributes() {
  const { page_height, page_width } = useSelector(state => state.runspace);
  const dispatch = useDispatch();
  return <div>
    <Form>
      <h4>Page</h4>
      <Form.Group controlId="formBasicRangeCustom">
        <Form.Label>Width:</Form.Label>
        <Form.Control type="range"
          custom
          min="100"
          max="1500"
          defaultValue={page_width}
          onChange={(e) => {
            dispatch({
              type: 'RESIZE_PAGE_WIDTH',
              data: {
                page_width: e.target.valueAsNumber
              }
            })
          }}
          onMouseUp={ e => {
            console.log('hello');
            dispatch(resizePageWidthConstraint(e.target.valueAsNumber));
          }}
        />
      </Form.Group>
      <Form.Group controlId="formBasicRangeCustom">
        <Form.Label>Height:</Form.Label>
        <Form.Control type="range"
          custom
          min="100"
          max="1500"
          defaultValue={page_height}
          orient="vertical"
          onChange={(e) => {
            dispatch({
              type: 'RESIZE_PAGE_HEIGHT',
              data: {
                page_height: e.target.valueAsNumber
              }
            })
          }}
          onMouseUp={ e => {
            console.log('hello');
            dispatch(resizePageHeightConstraint(e.target.valueAsNumber));
          }}
        />
      </Form.Group>
    </Form>
  </div>
}

export default function Attributes() {
  const selected = useSelector(state => state.selected);
  const isInteractable = useSelector(state => state.modes.active_mode) === 'create'
  return <div className="toolboxAttributes">
    {
      isInteractable ?
        selected.type === 'element' ? <ElementAttributes isInteractable={isInteractable} /> : null
        : <PageAttributes />
    }
  </div>
}
