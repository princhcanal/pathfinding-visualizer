import React, { useRef, useLayoutEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/reducers';

import Vertices from './Vertices/Vertices';
import Dropdown from '../../components/UI/Dropdown/Dropdown';

import { Graph } from '../../utils/pathfinding/algorithms/graph';

import * as actions from '../../store/actions';

import { Vertex } from '../../store/reducers/graph';

import styles from './PathfindingVisualizer.module.css';
import * as colors from '../../utils/colors';
import * as position from '../../utils/position';
import { pathfindingOptions } from '../../utils/pathfinding/pathfindingOptions';

interface PathfindingVisualizerProps {}

// FIXME: mouse over / mouse out
// TODO: implement pathfinding algorithms: dijkstra, a*, greedy best-first search, breadth-first-search, depth-first search
// TODO: implement adding weighted walls (land weight 1, water weight 2, mountain weight 3)
// TODO: implement mobile controls
// TODO: implement themes (Road, Avengers)
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor refactor REFACTOR REFACTOR

const PathfindingVisualizer = (props: PathfindingVisualizerProps) => {
	const graph = useSelector<StoreState, Graph>((state) => state.graph.graph);
	const numRows = useSelector<StoreState, number>(
		(state) => state.graph.numRows
	);
	const numCols = useSelector<StoreState, number>(
		(state) => state.graph.numCols
	);
	const startVertex = useSelector<StoreState, Vertex | null>(
		(state) => state.graph.startVertex
	);
	const endVertex = useSelector<StoreState, Vertex | null>(
		(state) => state.graph.endVertex
	);
	const setTimeouts = useSelector<StoreState, NodeJS.Timeout[]>(
		(state) => state.graph.setTimeouts
	);
	const currentAlgorithm = useSelector<StoreState, Function>(
		(state) => state.graph.currentAlgorithm
	);

	const dispatch = useDispatch();

	const verticesRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		dispatch(actions.setVerticesRef(verticesRef));
		dispatch(actions.initGraph(verticesRef));
	}, [dispatch]);

	const handleAnimation = (start: number, end: number) => {
		dispatch(actions.clearPath(verticesRef));
		dispatch(actions.setIsAnimating(true));

		let animations = currentAlgorithm(graph, start, end);

		for (let i = 0; i < animations.length; i++) {
			let animation = animations[i];
			let row = Math.floor(animation.index / numCols);
			let column = animation.index % numCols;
			let vertex: Vertex;

			vertex = position.getVertex(
				row,
				column,
				numRows,
				numCols,
				verticesRef
			);

			setTimeouts.push(
				setTimeout(() => {
					if (animation.state === 'VISITING') {
						vertex.element.style.backgroundColor =
							colors.COLOR_VISITING;
						if (i > 0) {
							let prevAnimation = animations[i - 1];
							let prevVertex = position.getVertexAbsolute(
								prevAnimation.index,
								numRows,
								numCols,
								verticesRef
							);
							prevVertex.element.style.backgroundColor =
								colors.COLOR_VISITED;
						}
					} else if (animation.state === 'PATH') {
						vertex.element.style.backgroundColor =
							colors.COLOR_PATH;
					} else if (animation.state === 'DONE') {
						dispatch(actions.setIsAnimating(false));
						dispatch(actions.setIsDoneAnimating(true));
					}
				}, 10 * i)
			);
		}
	};

	const handleClearPath = () => {
		dispatch(actions.setIsAnimating(false));
		dispatch(actions.setIsDoneAnimating(false));
		dispatch(actions.clearPath(verticesRef));
	};
	const handleClearWalls = () => dispatch(actions.onClearWalls(verticesRef));
	const handleReset = () => {
		dispatch(actions.setIsAnimating(false));
		dispatch(actions.setIsDoneAnimating(false));
		dispatch(actions.clearPath(verticesRef));
		dispatch(actions.onClearWalls(verticesRef));
	};

	const handleAlgorithmChanged = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(actions.setCurrentAlgorithm(e.target.value));
	};

	return (
		<div className={styles.PathfindingVisualizer}>
			<Vertices ref={verticesRef} />
			<div className={styles.buttons}>
				<button
					onClick={() =>
						handleAnimation(
							startVertex?.absoluteIndex
								? startVertex.absoluteIndex
								: 0,
							endVertex?.absoluteIndex
								? endVertex.absoluteIndex
								: 0
						)
					}
				>
					Find path
				</button>
				<button onClick={handleClearWalls}>Clear walls</button>
				<button onClick={handleClearPath}>Clear path</button>
				<button onClick={handleReset}>Reset</button>
				<button
					onClick={() => {
						console.log(startVertex?.absoluteIndex);
						console.log(endVertex?.absoluteIndex);
					}}
				>
					Test
				</button>
			</div>
			<Dropdown
				name='pathfinding-algorithms'
				options={pathfindingOptions}
				onChange={handleAlgorithmChanged}
			></Dropdown>
		</div>
	);
};

export default PathfindingVisualizer;
