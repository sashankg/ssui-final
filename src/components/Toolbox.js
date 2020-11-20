import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDrag } from 'react-dnd';

const tools = [
    "Label",
    "Button",
    "Textbox",
    "Slider",
    "Dropdown",
];

function ToolboxItem({ tool }) {
    const [collectedProps, drag] = useDrag({
        item: { 
            type: 'element',
            tool: tool
        }
    })
    return <ListGroup.Item key={ tool } ref={ drag }> 
        { tool }
    </ListGroup.Item>
}

export default function Toolbox() {
    const [_, drag] = useDrag({
        item: {
            type: 'page',
        }
    })
    return <div className="toolbox">
        <ListGroup style={{ marginBottom: 12 }}>
            <ListGroup.Item ref={ drag }>
                Page
            </ListGroup.Item>
        </ListGroup>
        <ListGroup>
            { tools.map(tool => {
                return <ToolboxItem 
                    key={ tool } 
                    tool={ tool }
                />
            })}
        </ListGroup>
    </div>
}
