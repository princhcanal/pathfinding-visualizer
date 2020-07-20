import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Vertices from './Vertices/Vertices';
import Navbar from '../../components/UI/Navbar/Navbar';
import Controller from '../../components/Controller/Controller';

import * as Actions from '../../store/actions';

import styles from './PathfindingVisualizer.module.css';
import { StoreState } from '../../store/reducers';
// import { MobileController } from '../../components/MobileController/MobileController';

interface PathfindingVisualizerProps {}

// TODO: implement controls section
// TODO: implement adding weighted walls (land weight 1, water weight 2, mountain weight 3)
// TODO: implement mobile controls
// TODO: implement themes (Road, Avengers, Star Wars, Pokemon, The Office, Friends, One Piece)
// TODO: remove verticesRef on graph actions
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR

const PathfindingVisualizer = (props: PathfindingVisualizerProps) => {
	const dispatch = useDispatch();
	const numRows = useSelector<StoreState, number>(
		(state) => state.graph.numRows
	);
	const numCols = useSelector<StoreState, number>(
		(state) => state.graph.numCols
	);

	const verticesRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		dispatch(Actions.setVerticesRef(verticesRef));
	}, [dispatch]);

	useLayoutEffect(() => {
		dispatch(
			Actions.setStartVertex(
				Math.floor(numRows / 2),
				Math.floor(numCols / 4),
				verticesRef
			)
		);
		dispatch(
			Actions.setEndVertex(
				Math.floor(numRows / 2),
				Math.floor(numCols / 4) * 3,
				verticesRef
			)
		);
	}, [dispatch, verticesRef, numRows, numCols]);

	useEffect(() => {
		dispatch(Actions.initGraph(verticesRef));
		dispatch(Actions.clearPath(verticesRef));
		dispatch(Actions.clearWalls(verticesRef));
	}, [dispatch, numRows, numCols]);

	// const handleTest = () => {
	// 	console.log(startVertex?.element, endVertex?.element);
	// };

	return (
		<div className={styles.PathfindingVisualizer}>
			<Navbar verticesRef={verticesRef} />
			<Controller verticesRef={verticesRef} />
			<Vertices ref={verticesRef} />
			{/* <MobileController verticesRef={verticesRef} /> */}
			{/* <div className={styles.buttons}>
				<button onClick={handleTest}>Test</button>
			</div> */}
		</div>
	);
};

export default PathfindingVisualizer;
