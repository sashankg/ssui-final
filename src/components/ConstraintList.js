import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';

function ConstraintItem({ constraint }) {
    console.log('constraint: ', constraint)

    function getRelationshipSymbol(rel) {
        switch (rel) {
            case 'equal':
                return '='
            case 'less':
                return '<'
            case 'greater':
                return '>'
            default:
                return ''
        }
    }

    const first = useSelector(state => constraint.first.type === 'page' ? 
    state.pages.byId[constraint.first.id] : 
    state.elements.byId[constraint.first.id]
    )

    const second = useSelector(state => constraint.second.type === 'page' ? 
        state.pages.byId[constraint.second.id] : 
        state.elements.byId[constraint.second.id]
    );

    var leftDescription = first.type ?? 'Page'
    leftDescription += ' ' + first.id + ' ' + constraint.first.value
    var rightDescription = second.type ?? 'Page' 
    rightDescription += ' ' + second.id + ' ' + constraint.second.value
    
    var formattedStr = leftDescription
    formattedStr += ' ' + getRelationshipSymbol(constraint.relationship)
    formattedStr += ' ' + rightDescription

    return <ListGroup.Item> 
        { formattedStr }
        <Button variant="danger" size="sm">X</Button>
    </ListGroup.Item>
}

export default function ConstraintList() {
    const constraints = useSelector(state => state.constraints)
    console.log('ConstraintList: ', constraints)
    return <div className="constraintlist-container">
        <ListGroup>
        {
            Object.keys(constraints.byId).map(key =>
                <ConstraintItem key={ key } constraint={ constraints.byId[key] } />
            )
        }
        </ListGroup>
    </div>
}