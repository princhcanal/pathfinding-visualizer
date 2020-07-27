import React, { useLayoutEffect, useEffect, useCallback } from 'react';
import './App.css';

import PathfindingVisualizer from './containers/PathfindingVisualizer/PathfindingVisualizer';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';

const App = () => {
	const dispatch = useDispatch();

	const updateSize = useCallback(() => {
		if (window.innerWidth <= 500) {
			dispatch(Actions.setNumRows(11));
			dispatch(Actions.setNumCols(9));
		} else if (window.innerWidth <= 600) {
			dispatch(Actions.setNumRows(13));
			dispatch(Actions.setNumCols(13));
		} else if (window.innerWidth <= 820) {
			dispatch(Actions.setNumRows(13));
			dispatch(Actions.setNumCols(17));
		} else if (window.innerWidth <= 960) {
			dispatch(Actions.setNumRows(13));
			dispatch(Actions.setNumCols(21));
		} else if (window.innerWidth <= 1040) {
			dispatch(Actions.setNumRows(15));
			dispatch(Actions.setNumCols(25));
		} else {
			dispatch(Actions.setNumRows(17));
			dispatch(Actions.setNumCols(33));
		}
	}, [dispatch]);

	useLayoutEffect(() => {
		window.addEventListener('resize', updateSize);

		return () => window.removeEventListener('resize', updateSize);
	}, [updateSize]);

	useEffect(() => {
		updateSize();
	}, [updateSize]);

	return (
		<div className='App'>
			<PathfindingVisualizer />
		</div>
	);
};

export default App;
