import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Dropdown } from 'react-bootstrap';

function LabelElement({ height, width, text, fontSize, destination }) {
  return <div style={ { height: height, width: width } }>
    <div
      style={ { fontSize: fontSize, textAlign: 'center' } }>
      { text }
    </div>
  </div>
}

function ButtonElement({ height, width, text, destination }) {
  const dispatch = useDispatch();
  return <div>
    <Button
      variant="primary"
      style={ { minHeight: height, minWidth: width } }
      onClick={ () => {
        dispatch({
          type: 'CHANGE_PAGE',
          data: {
            'current_page': destination
          }
        })
      }}>
      { text }
    </Button>
  </div>
}

function TextBoxElement({ height, width, text }) {
  return <Form>
        <Form.Group controlId="formBasicText" style={ { minHeight: height, minWidth: width } }>
          <Form.Label>{ text }</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
  </Form>
}

function SliderElement({ height, width, text}) {
  return <Form>
        <Form.Group controlId="formBasicRange" style={ { minHeight: height, minWidth: width } }>
          <Form.Label>{ text }</Form.Label>
          <Form.Control type="range"/>
        </Form.Group>
  </Form>
}

function DropdownElement({ height, width, text, items }) {
  return <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          style={ { minHeight: height, minWidth: width } }
          block>
            { text }
        </Dropdown.Toggle>
        <Dropdown.Menu>
          { items.map((item) => {
            return <Dropdown.Item>item</Dropdown.Item>
          }) }
        </Dropdown.Menu>
  </Dropdown>
}

function renderElement(element) {
  switch(element.type) {
        case 'button':
          return <ButtonElement
            width={ element.width }
            height={ element.height }
            text={ element.text }
            destination={ element.destination }
          />
        case 'label':
          return <LabelElement
            width={ element.width }
            height={ element.height }
            text={ element.text }
            fontSize={ element.fontSize || 18 }
          />
        case 'dropdown':
          return <DropdownElement
            width={ element.width }
            height={ element.height }
            text={ element.text }
            items={ element.values ? element.values.split(',') : [] }
          />
        case 'slider':
          return <SliderElement
            width={ element.width }
            height={ element.height }
            text={ element.text }
          />
        case 'textbox':
          return <TextBoxElement
            width={ element.width }
            height={ element.height }
            text={ element.text }
          />
        default:
          return <div>Placeholder</div>
      }
}

export default function RunElement({ element }) {
  return <div style={ {position: 'absolute', top: element.y, left: element.x} }>
    {renderElement(element)}
  </div>
}