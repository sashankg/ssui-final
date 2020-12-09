import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';

import { removeConstraint } from '../actions/constraintActions.js';

function ConstraintItem({ id, constraint }) {
    const dispatch = useDispatch()
    const [deleteVisible, setDeleteVisible] = useState(false)

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

    return <ListGroup.Item
        onMouseEnter={() => setDeleteVisible(true)}
        onMouseLeave={() => setDeleteVisible(false)}
        >
        { formattedStr }
        <br />
        Offset: { constraint.offset }
        <Button
        className="constraint-delete-btn"
        onClick={() => dispatch(removeConstraint({id: id, ...constraint}))}
        variant="danger"
        size="sm"
        style={{ visibility: deleteVisible ? 'visible' : 'hidden' }}
        >X</Button>
    </ListGroup.Item>
}

export default function ConstraintList() {
    const selected = useSelector(state => state.selected);
    const constraints = useSelector(state => state.constraints)
    if (selected.type === 'page') { // Show all constraints
        return <div className="constraintlist-container">
            <ListGroup>
            {
                Object.keys(constraints.byId).map(key =>
                    <ConstraintItem key={ key } id={ key } constraint={ constraints.byId[key] } />
                )
                
            }
            </ListGroup>
        </div>
    } else { // Show only constraints involving selected object.
        const selectedId = selected.id;
        const filteredIDs = Object.entries(constraints.byId)
            .filter(c =>
                (c[1].first.type === 'element' && c[1].first.id === selectedId)
                ||
                (c[1].second.type === 'element' && c[1].second.id === selectedId)
            )
        
        return <div className="constraintlist-container">
            <ListGroup>
            {
                filteredIDs.map(key => 
                    <ConstraintItem key={ key[0] } id={ key[0] } constraint={ constraints.byId[key[0]] } />
                )
                
            }
            </ListGroup>
        </div>
    }
}