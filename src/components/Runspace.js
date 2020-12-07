import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import RunElement from './RunElement.js';

export default function Runspace() {
	const currentPage = useSelector(state => state.runspace.current_page);
	const pages = useSelector(state => state.pages.allIds);
	const elements = Object.values(useSelector(state => state.elements.byId)).filter(element => element.page === currentPage);

	const dispatch = useDispatch();

	return <div className="runspace">
		<Form.Control
			className="page-select"
			as="select"
			defaultValue={currentPage}
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
		<div className="runpage">
			{elements.map((element) => {
				return <RunElement element={element}/>
			})}
		</div>
	</div>
}