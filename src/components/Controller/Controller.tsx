import React, {
	RefObject,
	MouseEvent,
	ForwardRefExoticComponent,
	RefAttributes,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Controller.module.css';
import * as Actions from '../../store/actions';
import * as Position from '../../utils/position';
import { StoreState } from '../../store/reducers';
import { Graph } from '../../utils/pathfinding/algorithms/graph';
import { Vertex } from '../../store/reducers/graph';
import { GraphTheme } from '../../utils/themes';
import { PathfindingStates } from '../../utils/pathfinding/pathfindingStates';

import Dropdown, { DropdownProps, DropdownRef } from '../UI/Dropdown/Dropdown';
import { pathfindingOptions } from '../../utils/pathfinding/pathfindingOptions';
import { pathfindingAlgorithms } from '../../utils/pathfinding/pathfindingAlgorithms';
import { themes, themeOptions, obstacleOptions } from '../../utils/themes/';

interface ControllerProps {
	classNames?: string[];
	verticesRef: RefObject<HTMLDivElement>;
}

export type Handle<T> = T extends ForwardRefExoticComponent<
	DropdownProps & RefAttributes<infer T2>
>
	? T2
	: never;

const Controller = (props: ControllerProps) => {
	let classNames = [styles.Controller];
	if (props.classNames) {
		classNames.push(...props.classNames);
	}
	const dispatch = useDispatch();

	const [obstacles, setObstacles] = useState(obstacleOptions['car']);
	const [speed, setSpeed] = useState(25);
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
	let obstacleDropdown: Handle<typeof Dropdown>;

	const handleAnimation = (start: number, end: number) => {
		dispatch(Actions.clearPath(props.verticesRef));
		dispatch(Actions.setIsAnimating(true));

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
					} else if (
						animation.state === PathfindingStates.DONE ||
						animation.state === PathfindingStates.NO_PATH
					) {
						dispatch(Actions.setIsAnimating(false));
						dispatch(Actions.setIsDoneAnimating(true));
					}
				}, speed * i)
			);
		}
	};

	const handleFindPath = () =>
		handleAnimation(
			startVertex?.absoluteIndex ? startVertex.absoluteIndex : 0,
			endVertex?.absoluteIndex ? endVertex?.absoluteIndex : 0
		);

	const handleClearPath = () => {
		dispatch(Actions.setIsAnimating(false));
		dispatch(Actions.setIsDoneAnimating(false));
		dispatch(Actions.clearPath(props.verticesRef));
	};
	const handleClearObstacles = () => {
		dispatch(Actions.onClearWalls(props.verticesRef));
		if (obstacleDropdown.heading) {
			obstacleDropdown.heading.children[0].innerHTML = obstacles['wall'];
		}
	};
	const handleReset = () => {
		dispatch(Actions.setIsAnimating(false));
		dispatch(Actions.setIsDoneAnimating(false));
		dispatch(Actions.clearPath(props.verticesRef));
		handleClearObstacles();
		dispatch(
			Actions.setStartVertex(
				Math.floor(numRows / 2),
				Math.floor(numCols / 4),
				props.verticesRef
			)
		);
		dispatch(
			Actions.setEndVertex(
				Math.floor(numRows / 2),
				Math.floor(numCols / 4) * 3,
				props.verticesRef
			)
		);
		dispatch(Actions.initGraph(props.verticesRef));
		dispatch(Actions.clearPath(props.verticesRef));
	};

	const handleAlgorithmChanged = (e: MouseEvent<HTMLLIElement>) => {
		dispatch(
			Actions.setCurrentAlgorithm(
				pathfindingAlgorithms[
					e.currentTarget.getAttribute('value') as string
				]
			)
		);
	};

	const handleObstacleChanged = (e: MouseEvent<HTMLLIElement>) => {
		const obstacle = e.currentTarget.getAttribute('value') as string;
		dispatch(Actions.onSetObstacleRef(obstacle));

		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				let vertex = Position.getVertex(
					i,
					j,
					numRows,
					numCols,
					props.verticesRef
				);

				if (
					vertex.absoluteIndex !== startVertex?.absoluteIndex &&
					vertex.absoluteIndex !== endVertex?.absoluteIndex
				) {
					if (obstacle === 'wall') {
						theme.cursorWall(vertex.element);
					} else if (obstacle === 'obstacle1') {
						theme.cursorObstacle1(vertex.element);
					} else if (obstacle === 'obstacle2') {
						theme.cursorObstacle2(vertex.element);
					} else if (obstacle === 'obstacle3') {
						theme.cursorObstacle3(vertex.element);
					}
				}
			}
		}
	};

	const handleThemeChanged = (e: MouseEvent<HTMLLIElement>) => {
		const theme = e.currentTarget.getAttribute('value') as string;
		dispatch(Actions.setTheme(themes[theme]));
		setObstacles(obstacleOptions[theme]);
		themes[theme].bodyBackground(
			document.querySelector('body') as HTMLBodyElement
		);
		themes[theme].header(
			document.getElementById('Header') as HTMLDivElement
		);
		themes[theme].heading(
			document.getElementById('Heading') as HTMLHeadingElement
		);
		themes[theme].controller(
			document.getElementById('Controller') as HTMLDivElement
		);
		const buttons = document.querySelectorAll('.' + styles.Button);
		for (let i = 0; i < buttons.length; i++) {
			themes[theme].button(buttons[i] as HTMLButtonElement);
		}
		let dropdown: HTMLCollection;
		let dropdowns = document.querySelector('.' + styles.Dropdowns);
		if (dropdowns) {
			dropdown = dropdowns.children;
			for (let i = 0; i < dropdown.length; i++) {
				themes[theme].dropdown(
					dropdown[i].children[1].children[0] as HTMLHeadingElement
				);
				themes[theme].options(
					dropdown[i].children[1].children[1] as HTMLDivElement
				);
				let options = dropdown[i].children[1].children[1].children;
				for (let j = 0; j < options.length; j++) {
					themes[theme].option(
						options[j].children[0] as HTMLLIElement
					);
				}
			}
		}
		handleReset();
	};

	const handleSpeedChanged = (e: MouseEvent<HTMLLIElement>) => {
		setSpeed(parseInt(e.currentTarget.getAttribute('value') as string));
	};

	const speedOptions = {
		10: 'Very Fast',
		25: 'Fast',
		100: 'Medium',
		500: 'Slow',
		2000: 'Very Slow',
	};

	return (
		<div className={classNames.join(' ')} id='Controller'>
			<div className={styles.Dropdowns}>
				<Dropdown
					name='pathfinding-algorithms'
					default='Dijkstra'
					options={pathfindingOptions}
					onChange={handleAlgorithmChanged}
					classNames={[styles.Dropdown]}
					label='Algorithm:'
					width='21rem'
				></Dropdown>
				<Dropdown
					name='speed'
					default='Fast'
					options={speedOptions}
					onChange={handleSpeedChanged}
					classNames={[styles.Dropdown]}
					label='Speed:'
					width='21rem'
				></Dropdown>
				<Dropdown
					ref={(o) => (obstacleDropdown = o as DropdownRef)}
					name='obstacles'
					default={obstacles['wall']}
					options={obstacles}
					onChange={handleObstacleChanged}
					classNames={[styles.Dropdown]}
					label='Obstacle:'
					width='15rem'
				></Dropdown>
				<Dropdown
					name='themes'
					default='Car'
					options={themeOptions}
					onChange={handleThemeChanged}
					classNames={[styles.Dropdown]}
					label='Theme:'
					width='10rem'
				></Dropdown>
			</div>
			<div className={styles.Buttons}>
				<button className={styles.Button} onClick={handleFindPath}>
					Find path
				</button>
				<button className={styles.Button} onClick={handleClearPath}>
					Clear path
				</button>
				<button
					className={styles.Button}
					onClick={handleClearObstacles}
				>
					Clear Obstacles
				</button>
				<button className={styles.Button} onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Controller;
