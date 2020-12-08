import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { 
  Modal, 
  Button, 
  Container, 
  Row, 
  Col,
  Form,
} from 'react-bootstrap';
import { cancelLink } from '../actions/linkActions.js';
import { addConstraint } from '../actions/constraintActions.js';

const isOpenSelector = createSelector(
  state => state.link.state,
  linkState => linkState === 'linked'
);

function Content() {
  const { first: firstData, second: secondData } = useSelector(state => state.link);
  const first = useSelector(state => firstData.type === 'page' ? 
    state.pages.byId[firstData.id] : 
    state.elements.byId[firstData.id]
  );
  const second = useSelector(state => secondData.type === 'page' ? 
    state.pages.byId[secondData.id] : 
    state.elements.byId[secondData.id]
  );

  const dispatch = useDispatch();
  const [data, setData] = React.useState({ 
    firstValue: 'left',
    secondValue: 'left',
    relationship: 'equal',
    offset: 0,
  })

  return <>
  <Modal.Body>
    <Form>
      <Container>
        <Row>
          <Col>
            <Form.Label>
              { firstData.type === 'page' ? "Screen" : `${ first.type } (id: ${ firstData.id })` }
            </Form.Label>
            <Form.Control as="select" onChange={ e => setData({ ...data, firstValue: e.target.value }) }>
              <option value="left">left</option>
              <option value="right">right</option>
              <option value="bottom">bottom</option>
              <option value="top">top</option>
              <option value="width">width</option>
              <option value="height">height</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Label>
              Relationship
            </Form.Label>
            <Form.Control as="select" onChange={ e => setData({ ...data, relationship: e.target.value }) }>
              <option value="equal">=</option>
              <option value="less">{ "<" }</option>
              <option value="greater">{ ">" }</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Label>
              { secondData.type === 'page' ? "Screen" : `${ second.type } (id: ${ secondData.id })` }
            </Form.Label>
            <Form.Control as="select" onChange={ e => setData({ ...data, secondValue: e.target.value }) }>
              <option value="left">left</option>
              <option value="right">right</option>
              <option value="bottom">bottom</option>
              <option value="top">top</option>
              <option value="width">width</option>
              <option value="height">height</option>
            </Form.Control>
          </Col>
        </Row>
        <Form.Label style={{ marginTop: 24 }}>
          Offset
        </Form.Label>
        <Form.Control 
          type="number"
          value={ data.offset } 
          onChange={ e => setData({ ...data, offset: e.target.value }) }
        />
      </Container>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button 
      variant="secondary" 
      onClick={ () => dispatch(cancelLink()) }
    >
      Cancel
    </Button>
    <Button 
      variant="primary" 
      onClick={ () => { 
        dispatch(addConstraint(
          { type: firstData.type, id: firstData.id, value: data.firstValue },
          { type: secondData.type, id: secondData.id, value: data.secondValue },
          data.relationship,
          data.offset,
        ))
        dispatch(cancelLink()) 
      }}
    >
      Add Constraint
    </Button>
  </Modal.Footer>
    </>
}

export default function LinkModal() {
  const isOpen = useSelector(isOpenSelector);
  const dispatch = useDispatch();
  if(isOpen) {
    return <Modal 
      show={ true }
      onHide={ () => dispatch(cancelLink()) }
    >
      <Modal.Header>
        New Constraint
      </Modal.Header>
      <Content />
    </Modal>
  }
  else {
    return null
  }
}
