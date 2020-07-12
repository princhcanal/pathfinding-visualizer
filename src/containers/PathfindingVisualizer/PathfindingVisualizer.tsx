import React, { useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/reducers';

import Vertices from './Vertices/Vertices';
import WeightedGraph from '../../utils/pathfinding/algorithms/dijkstra';

import * as actions from '../../store/actions';

import { Vertex } from '../../store/reducers/graph';

import styles from './PathfindingVisualizer.module.css';
import * as colors from '../../utils/colors';
import * as position from '../../utils/position';

interface PathfindingVisualizerProps {}

// FIXME: mouse over / mouse out
// TODO: implement adding weighted walls (land weight 1, water weight 2, mountain weight 3)
// TODO: implement controls
// TODO: implement other pathfinding algorithms
// TODO: refactor refactor refactor refactor REFACTOR REFACTOR REFACTOR REFACTOR

const PathfindingVisualizer = (props: PathfindingVisualizerProps) => {
	const graph = useSelector<StoreState, WeightedGraph>(
		(state) => state.graph.graph
	);
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

	const dispatch = useDispatch();

	const verticesRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		dispatch(actions.setVerticesRef(verticesRef));
		dispatch(actions.initGraph(verticesRef));
	}, [dispatch]);

	const handleFindShortestPath = (start: number, end: number) => {
		dispatch(actions.clearPath(verticesRef, false));
		dispatch(actions.setIsAnimating(true));

		let animations = graph.dijkstra(start, end);

		for (let i = 0; i < animations.length; i++) {
			let animation = animations[i];
			let vertices = verticesRef.current;
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
							let prevRow = Math.floor(
								prevAnimation.index / numCols
							);
							let prevColumn = prevAnimation.index % numCols;
							let prevVertex: Vertex;
							if (vertices) {
								prevVertex = position.getVertex(
									prevRow,
									prevColumn,
									numRows,
									numCols,
									verticesRef
								);
								prevVertex.element.style.backgroundColor =
									colors.COLOR_VISITED;
							}
						}
					} else if (animation.state === 'PATH') {
						vertex.element.style.backgroundColor =
							colors.COLOR_PATH;
					} else if (animation.state === 'DONE') {
						dispatch(actions.setIsAnimating(false));
						dispatch(actions.setIsDoneAnimating(true));
					}
				}, 20 * i)
			);
		}
	};

	const handleClearPath = () => {
		dispatch(actions.setIsAnimating(false));
		dispatch(actions.setIsDoneAnimating(false));
		dispatch(actions.clearPath(verticesRef, false));
	};
	const handleClearWalls = () => dispatch(actions.onClearWalls(verticesRef));
	const handleReset = () => {
		dispatch(actions.setIsAnimating(false));
		dispatch(actions.setIsDoneAnimating(false));
		dispatch(actions.clearPath(verticesRef, false));
		dispatch(actions.onClearWalls(verticesRef));
	};

	return (
		<div className={styles.PathfindingVisualizer}>
			<Vertices ref={verticesRef} />
			<div className={styles.buttons}>
				<button
					onClick={() =>
						handleFindShortestPath(
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
		</div>
	);
};

export default PathfindingVisualizer;
