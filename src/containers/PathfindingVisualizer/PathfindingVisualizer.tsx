import React, { useRef, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

import Vertices from './Vertices/Vertices';
import Navbar from '../../components/UI/Navbar/Navbar';

import * as actions from '../../store/actions';

import styles from './PathfindingVisualizer.module.css';

interface PathfindingVisualizerProps {}

// TODO: implement controls section
// TODO: responsive design
// TODO: implement adding weighted walls (land weight 1, water weight 2, mountain weight 3)
// TODO: implement mobile controls
// TODO: implement themes (Road, Avengers, Star Wars, Pokemon, The Office, Friends, One Piece)
// TODO: implement image cursors
// TODO: remove verticesRef on graph actions
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR

const PathfindingVisualizer = (props: PathfindingVisualizerProps) => {
	const dispatch = useDispatch();

	const verticesRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		dispatch(actions.setVerticesRef(verticesRef));
		dispatch(actions.initGraph(verticesRef));
	}, [dispatch]);

	// const handleTest = () => {
	// 	console.log('TEST');
	// };

	return (
		<div className={styles.PathfindingVisualizer}>
			<Navbar verticesRef={verticesRef} />
			<Vertices ref={verticesRef} />
			{/* <div className={styles.buttons}>
				<button onClick={handleTest}>Test</button>
			</div> */}
		</div>
	);
};

export default PathfindingVisualizer;
