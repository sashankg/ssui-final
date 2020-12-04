import React from 'react';
import { useSelector } from 'react-redux';

import Workspace from './Workspace.js';
import Runspace from './Runspace.js'

export default function MainWindow() {
	const isRunning = useSelector(state => state.modes.active_mode) === 'run';
	return isRunning ? <Runspace /> : <Workspace />
}