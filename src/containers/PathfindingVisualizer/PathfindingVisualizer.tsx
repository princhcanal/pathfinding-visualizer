import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/reducers';

import Vertices from './Vertices/Vertices';
import WeightedGraph from '../../utils/pathfinding/algorithms/dijkstra';

import * as actions from '../../store/actions';

import styles from './PathfindingVisualizer.module.css';
import * as colors from '../../utils/colors';
import * as position from '../../utils/position';
import { setIsAnimating } from '../../store/actions';

interface PathfindingVisualizerProps {}

interface Vertex {
	element: HTMLElement;
	row: number;
	column: number;
	absoluteIndex: number;
}

// FIXME: implement drag and drop start and end vertices
// TODO: implement adding walls (land weight 1, water weight 2, mountain weight 3)
// TODO: implement recalculating path
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
	const startRow = useSelector<StoreState, number>(
		(state) => state.graph.startRow
	);
	const startCol = useSelector<StoreState, number>(
		(state) => state.graph.startCol
	);
	const endRow = useSelector<StoreState, number>(
		(state) => state.graph.endRow
	);
	const endCol = useSelector<StoreState, number>(
		(state) => state.graph.endCol
	);
	const setTimeouts = useSelector<StoreState, NodeJS.Timeout[]>(
		(state) => state.graph.setTimeouts
	);
	const dispatch = useDispatch();

	const verticesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(actions.initGraph(verticesRef));
	}, [dispatch]);

	const handleFindShortestPath = (start: number, end: number) => {
		dispatch(actions.clearPath(verticesRef));
		dispatch(actions.setIsAnimating(true));

		let animations = graph.dijkstra(start, end);

		for (let i = 0; i < animations.length; i++) {
			let animation = animations[i];
			let vertices = verticesRef.current;
			let row = Math.floor(animation.index / numCols);
			let column = animation.index % numCols;
			let vertex: Vertex;

			if (vertices) {
				vertex = position.getVertex(
					row,
					column,
					numRows,
					numCols,
					verticesRef
				);
			}

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
					}
				}, 20 * i)
			);
		}
	};

	const graphWallIndices = useSelector<StoreState, number[]>(
		(state) => state.graph.wallIndices
	);
	const dragWallIndices = useSelector<StoreState, number[]>(
		(state) => state.drag.wallIndices
	);

	const handleClearPath = () => {
		dispatch(setIsAnimating(false));
		dispatch(actions.clearPath(verticesRef));
	};
	const handleClearWalls = () => dispatch(actions.onClearWalls(verticesRef));
	const handleReset = () => {
		dispatch(actions.setIsAnimating(false));
		dispatch(actions.clearPath(verticesRef));
		dispatch(actions.onClearWalls(verticesRef));
	};

	return (
		<div className={styles.PathfindingVisualizer}>
			<Vertices ref={verticesRef} />
			<div className={styles.buttons}>
				<button
					onClick={() =>
						handleFindShortestPath(
							position.indexToAbsolute(
								startRow,
								startCol,
								numRows,
								numCols
							),
							position.indexToAbsolute(
								endRow,
								endCol,
								numRows,
								numCols
							)
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
						console.log('Graph wall indices:', graphWallIndices);
						console.log('Drag wall indices:', dragWallIndices);
					}}
				>
					Test
				</button>
			</div>
		</div>
	);
};

export default PathfindingVisualizer;
