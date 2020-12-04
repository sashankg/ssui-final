import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import elementTypes from '../data/elementTypes.js'

import Attributes from './Attributes.js';

const tools = Object.keys(elementTypes);

function ToolboxItem({ tool, isDraggable }) {
    const [, drag] = useDrag({
        item: { 
            type: 'element',
            tool,
        },
        canDrag: isDraggable
    })
    return <ListGroup.Item ref={ drag }> 
        { elementTypes[tool].name }
    </ListGroup.Item>
}

export default function Toolbox() {
    const isDraggable = useSelector(state => state.modes.active_mode) === 'create';

    const [, pageDrag] = useDrag({
        item: {
            type: 'page',
        },
        canDrag: isDraggable
    })
    return <div className="toolbox">
      <h2>Elements</h2>
      <div className="toolboxElements">
        <ListGroup style={{ marginBottom: 12 }}>
            <ListGroup.Item ref={ pageDrag }>
                Page
            </ListGroup.Item>
        </ListGroup>
        <ListGroup>
            { tools.map(tool => {
                return <ToolboxItem key={ tool } tool={ tool } isDraggable={ isDraggable } />
            })}
        </ListGroup>
      </div>
      <h2>Attributes</h2>
      <Attributes />
    </div>
}
