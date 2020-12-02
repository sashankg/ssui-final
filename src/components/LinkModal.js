import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from 'react-modal';

const isOpenSelector = createSelector(
  state => state.link.state,
  linkState => linkState === 'linked'
);

Modal.setAppElement('#root');

export default function LinkModal() {
  const isOpen = useSelector(isOpenSelector);
  const { first, second } = useSelector(state => state.link);
  const dispatch = useDispatch();
  if(isOpen) {
    return <Modal 
      isOpen={ isOpen }
      onRequestClose={ () => dispatch({ type: 'CANCEL_LINK' }) }
      style={{
        width: 700,
        height: 200,
      }}
    >
      Trying to link elements id: { first.id } and id: { second.id } 
    </Modal>
  }
  else {
    return null
  }
}
