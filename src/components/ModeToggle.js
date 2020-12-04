import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

export default function ModeToggle() {
  const dispatch = useDispatch();

  const radioValue = useSelector(state => state.modes.active_mode);

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
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  )
}
