import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';

function Load() {
	const dispatch = useDispatch();

  const load = (e) => {
  	const reader = new FileReader();
    reader.onload = () => {
    	const loadedState = JSON.parse(reader.result);
    	console.log(loadedState);
      dispatch({
      	type: 'LOAD_ELEMENTS',
      	data: loadedState.elements
      });
      dispatch({
      	type: 'LOAD_PAGES',
      	data: loadedState.pages
      });
      dispatch({
      	type: 'CHANGE_PAGE',
      	data: {
      		current_page: 0
      	}
      });
      dispatch({
      	type: 'DESELECT'
      });
    }

    try {
      reader.readAsText(e.target.files[0])
    } catch {
      alert("File could not be loaded");
    }
  }

  return <div className="file-button">
    <input
    	type="file"
    	id="selectedFile"
    	style={{ display: 'none' }}
    	onChange={load}/>
    <label htmlFor="selectedFile" className="btn btn-primary">
      Load
    </label>
  </div>
}

function Save() {
  const [show, setShow] = useState(false);
  const [filename, setFilename] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector(state => state);

  const save = () => {
    const file = new Blob([JSON.stringify(state)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    handleClose();
  }

  return <div>
    <Button className="file-button" varaint="primary" onClick={handleShow}>
      Save
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Save Layout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFileName">
            <Form.Label>Save File as:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter filename..."
              onChange={ (e) => (setFilename(e.target.value)) }/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={save} disabled={ filename.length <= 0 }>
            Save
          </Button>
        </Modal.Footer>
    </Modal>
  </div>
}

export default function SaveLoad() {
	return <div className="save-load">
		<Save />
		<Load />
	</div>
}