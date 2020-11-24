import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import elementTypes from '../data/elementTypes.js'

import Attributes from './Attributes.js';

const tools = Object.keys(elementTypes);

function ToolboxItem({ tool }) {
    const [collectedProps, drag] = useDrag({
        item: { 
            type: 'element',
            tool,
        }
    })
    return <ListGroup.Item ref={ drag }> 
        { elementTypes[tool].name }
    </ListGroup.Item>
}

export default function Toolbox() {
    const [_, pageDrag] = useDrag({
        item: {
            type: 'page',
        }
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
                return <ToolboxItem key={ tool } tool={ tool } />
            })}
        </ListGroup>
      </div>
      <h2>Attributes</h2>
      <Attributes />
    </div>
}
