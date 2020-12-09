import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

function ConstraintItem({ constraint }) {
    var formattedStr = constraint.first.type + ' ' + constraint.first.id + ' ' + constraint.first.value
    formattedStr += ' ' + constraint.relationship
    formattedStr += ' ' + constraint.second.type + ' ' + constraint.second.id + ' ' + constraint.second.value
    console.log('Constraint: ', formattedStr)
    return <ListGroup.Item> 
        { formattedStr }
    </ListGroup.Item>
}

export default function ConstraintList() {
    const constraints = useSelector(state => state.constraints)
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