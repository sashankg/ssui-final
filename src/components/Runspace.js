import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import RunElement from './RunElement.js';

export default function Runspace() {
    const { current_page, page_height, page_width } = useSelector(state => state.runspace);
    const pages = useSelector(state => state.pages.allIds);
    const elements = Object.values(useSelector(state => state.elements.byId)).filter(element => element.page === current_page);

    const dispatch = useDispatch();

    return <div className="runspace">
        <div className="runarea">
            <div style={ { height: page_height, width: page_width } } className="runpage">
                {elements.map((element) => {
                    return <RunElement key={ element.id } element={ element }/>
                })}
            </div>
        </div>
        <Form.Control
            className="page-select"
            as="select"
            defaultValue={current_page}
            onChange={(e) => {
                dispatch({
                    type: 'CHANGE_PAGE',
                    data: {
                        'current_page': parseInt(e.target.value)
                    }
                });
            }}>
            {pages.map((pageId) => {
                return <option key={ pageId } value={ pageId }>Current Page: { pageId }</option>
            })}
        </Form.Control>
    </div>
}
