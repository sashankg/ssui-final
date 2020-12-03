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
  return <Form>
    <Container>
      <Row>
        <Col>
          { first.type } (id: { firstData.id })
          <Form.Control as="select">
            <option value="equal">=</option>
            <option value="less">{ "<" }</option>
            <option value="greater">{ ">" }</option>
          </Form.Control>
        </Col>
        <Col>
          <Form.Control as="select">
            <option value="equal">=</option>
            <option value="less">{ "<" }</option>
            <option value="greater">{ ">" }</option>
          </Form.Control>
        </Col>
        <Col>
          { second.type } (id: { secondData.id })
          <Form.Control as="select">
            <option value="equal">=</option>
            <option value="less">{ "<" }</option>
            <option value="greater">{ ">" }</option>
          </Form.Control>
        </Col>
      </Row>
    </Container>
  </Form>
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
      <Modal.Body>
        <Content />
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={ () => dispatch(cancelLink()) }
        >
          Cancel
        </Button >
        <Button 
          variant="primary" 
          onClick={ () => dispatch(cancelLink()) }
        >
          Add Constraint
        </Button >
      </Modal.Footer>
    </Modal>
  }
  else {
    return null
  }
}
