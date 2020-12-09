import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { 
    resizePageWidthConstraint, 
    resizePageHeightConstraint,
} from '../actions/constraintActions.js';

export default function ModeToggle() {
  const dispatch = useDispatch();

  const radioValue = useSelector(state => state.modes.active_mode);
  const { page_height, page_width } = useSelector(state => state.runspace);

  const radios = [
    { name: 'Run', value: 'run' },
    { name: 'Create', value: 'create' }
  ];

  return (
    <div className="toggle-mode">
      <ButtonGroup toggle>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              dispatch({
                type: 'CHANGE_MODE',
                data: {
                  active_mode: e.currentTarget.value
                }
              })
              if(e.currentTarget.value === 'run') {
                dispatch(resizePageWidthConstraint(page_width))
                dispatch(resizePageHeightConstraint(page_height))
              }
              else {
                dispatch(resizePageWidthConstraint(500))
                dispatch(resizePageHeightConstraint(500))
              }
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  )
}
