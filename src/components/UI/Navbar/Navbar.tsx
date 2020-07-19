import React, { RefObject, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';

import styles from './Navbar.module.css';
import Dropdown from '../Dropdown/Dropdown';
import { pathfindingOptions } from '../../../utils/pathfinding/pathfindingOptions';
import { StoreState } from '../../../store/reducers';
import { Graph } from '../../../utils/pathfinding/algorithms/graph';
import { Vertex } from '../../../store/reducers/graph';
import * as Position from '../../../utils/position';
import { GraphTheme } from '../../../utils/themes';
import { PathfindingStates } from '../../../utils/pathfinding/pathfindingStates';

interface NavbarProps {
	classNames?: string[];
	verticesRef: RefObject<HTMLDivElement>;
}

const Navbar = (props: NavbarProps) => {
	let classNames = [styles.Navbar];
	if (props.classNames) {
		classNames.push(...props.classNames);
	}
	const dispatch = useDispatch();

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
	const theme = useSelector<StoreState, GraphTheme>(
		(state) => state.graph.theme
	);

	const handleAnimation = (start: number, end: number) => {
		dispatch(actions.clearPath(props.verticesRef));
		dispatch(actions.setIsAnimating(true));

		let animations = currentAlgorithm(graph, start, end);

		for (let i = 0; i < animations.length; i++) {
			let animation = animations[i];
			let row = Math.floor(animation.index / numCols);
			let column = animation.index % numCols;
			let vertex: Vertex;

			vertex = Position.getVertex(
				row,
				column,
				numRows,
				numCols,
				props.verticesRef
			);

			setTimeouts.push(
				setTimeout(() => {
					if (animation.state === PathfindingStates.VISITING) {
						theme.visiting(vertex.element);
						if (i > 0) {
							let prevAnimation = animations[i - 1];
							let prevVertex = Position.getVertexAbsolute(
								prevAnimation.index,
								numRows,
								numCols,
								props.verticesRef
							);
							theme.visited(prevVertex.element);
						}
					} else if (
						animation.state ===
						PathfindingStates.PATH_HORIZONTAL_START
					) {
						theme.pathHorizontalStart(vertex.element);
					} else if (
						animation.state ===
						PathfindingStates.PATH_VERTICAL_START
					) {
						theme.pathVerticalStart(vertex.element);
					} else if (
						animation.state ===
						PathfindingStates.PATH_HORIZONTAL_END
					) {
						theme.pathHorizontalEnd(vertex.element);
					} else if (
						animation.state === PathfindingStates.PATH_VERTICAL_END
					) {
						theme.pathVerticalEnd(vertex.element);
					} else if (
						animation.state === PathfindingStates.PATH_HORIZONTAL
					) {
						theme.pathHorizontal(vertex.element);
					} else if (
						animation.state === PathfindingStates.PATH_VERTICAL
					) {
						theme.pathVertical(vertex.element);
					} else if (animation.state === PathfindingStates.DONE) {
						dispatch(actions.setIsAnimating(false));
						dispatch(actions.setIsDoneAnimating(true));
					}
				}, 10 * i)
			);
		}
	};

	const handleFindPath = () =>
		handleAnimation(
			startVertex?.absoluteIndex ? startVertex.absoluteIndex : 0,
			endVertex?.absoluteIndex ? endVertex?.absoluteIndex : 0
		);

	const handleClearPath = () => {
		dispatch(actions.setIsAnimating(false));
		dispatch(actions.setIsDoneAnimating(false));
		dispatch(actions.clearPath(props.verticesRef));
	};
	const handleClearWalls = () =>
		dispatch(actions.onClearWalls(props.verticesRef));
	const handleReset = () => {
		dispatch(actions.setIsAnimating(false));
		dispatch(actions.setIsDoneAnimating(false));
		dispatch(actions.clearPath(props.verticesRef));
		dispatch(actions.onClearWalls(props.verticesRef));
	};

	const handleAlgorithmChanged = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(actions.setCurrentAlgorithm(e.target.value));
	};

	return (
		<header className={classNames.join(' ')}>
			<h1>Pathfinding Visualizer</h1>
			<nav>
				<button onClick={handleFindPath}>Find path</button>
				<button onClick={handleClearPath}>Clear path</button>
				<button onClick={handleClearWalls}>Clear walls</button>
				<button onClick={handleReset}>Reset</button>
				<Dropdown
					name='pathfinding-algorithms'
					options={pathfindingOptions}
					onChange={handleAlgorithmChanged}
					classNames={[styles.Dropdown]}
				></Dropdown>
			</nav>
		</header>
	);
};

export default Navbar;
