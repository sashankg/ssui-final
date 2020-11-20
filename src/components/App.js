import React from 'react';

import { Provider } from 'react-redux';
import store from '../store'

import { Container, Row, Col } from 'react-bootstrap';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Toolbox from './Toolbox.js';
import Workspace from './Workspace.js';

function App() {
  return <Provider store={ store }>
    <DndProvider backend={ HTML5Backend }>
      <Container fluid>
        <Row>
          <Col xs="auto" lg="auto">
            <Toolbox />
          </Col>
          <Col>
            <Workspace />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  </Provider>
}

export default App;
