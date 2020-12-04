import React from 'react';
import { useSelector } from 'react-redux';

import RunElement from './RunElement.js';

export default function Runspace() {
	const currentPage = useSelector(state => state.runspace.current_page);
	const elements = Object.values(useSelector(state => state.elements.byId)).filter(element => element.page === currentPage);

	return <div className="runspace">
		<div className="runpage">
			{elements.map((element) => {
				return <RunElement element={element}/>
			})}
		</div>
	</div>
}