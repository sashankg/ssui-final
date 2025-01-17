import React from 'react';

import { Provider } from 'react-redux';
import store from '../store'

import { Container, Row, Col } from 'react-bootstrap';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Toolbox from './Toolbox.js';
import LinkModal from './LinkModal.js';

import '../actions/constraintActions.js';
import MainWindow from './MainWindow.js';
import ModeToggle from './ModeToggle.js';
import SaveLoad from './SaveLoad.js';

function App() {
  return <Provider store={ store }>
    <DndProvider backend={ HTML5Backend }>
      <LinkModal />
      <Container fluid>
        <Row>
          <Col xs="auto" lg="auto">
            <Toolbox />
          </Col>
            <Col style={{ padding: 0 }}>
            <MainWindow />
            <SaveLoad />
            <ModeToggle />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  </Provider>
}

export default App;
