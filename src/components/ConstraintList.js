import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

function ConstraintItem({ constraint }) {
    console.log('constraint: ', constraint)
    var firstElement = useSelector(state => state.elements.byId[constraint.first.id])
    var secondElement = useSelector(state => state.elements.byId[constraint.second.id])

    var leftDescription = ''
    if (constraint.first.type === 'element') {
        leftDescription += firstElement.type + ' ' + firstElement.id
    } else {
        leftDescription += 'Page ' + firstElement.id
    }

    var rightDescription = ''
    if (constraint.second.type === 'element') {
        rightDescription += secondElement.type + ' ' + secondElement.id
    } else {
        rightDescription += 'Page ' + secondElement.id
    }
    
    var formattedStr = leftDescription
    formattedStr += ' ' + constraint.relationship
    formattedStr += ' ' + rightDescription

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