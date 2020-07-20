import React, { useRef, RefObject } from 'react';

import styles from './MobileController.module.css';
import {
	getNeighbors,
	getVertexAbsolute,
	Neighbors,
} from '../../utils/position';
import { StoreState } from '../../store/reducers';
import { Vertex } from '../../store/reducers/graph';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../store/actions';
import { GraphTheme } from '../../utils/themes';

interface MobileControllerProps {
	classNames?: string[];
	verticesRef: RefObject<HTMLDivElement>;
}

export const MobileController = (props: MobileControllerProps) => {
	let classNames = [styles.MobileController];
	if (props.classNames) {
		classNames.push(...props.classNames);
	}

	const startVertex = useSelector<StoreState, Vertex | null>(
		(state) => state.graph.startVertex
	);
	const endVertex = useSelector<StoreState, Vertex | null>(
		(state) => state.graph.endVertex
	);
	const numRows = useSelector<StoreState, number>(
		(state) => state.graph.numRows
	);
	const numCols = useSelector<StoreState, number>(
		(state) => state.graph.numCols
	);
	const theme = useSelector<StoreState, GraphTheme>(
		(state) => state.graph.theme
	);
	const startEndRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();
	let start: Element;
	let startNeighbors: Neighbors;
	let startNeighborsTopVertex: Vertex;
	let startNeighborsBottomVertex: Vertex;
	let startNeighborsLeftVertex: Vertex;
	let startNeighborsRightVertex: Vertex;

	let end: Element;
	let endNeighbors: Neighbors;
	let endNeighborsTopVertex: Vertex;
	let endNeighborsBottomVertex: Vertex;
	let endNeighborsLeftVertex: Vertex;
	let endNeighborsRightVertex: Vertex;

	if (startEndRef.current) {
		start = startEndRef.current.children[0];
		end = startEndRef.current.children[1];
		startNeighbors = getNeighbors(
			startVertex?.absoluteIndex as number,
			startVertex?.row as number,
			numRows,
			numCols
		);
		console.log(startNeighbors.top);
		endNeighbors = getNeighbors(
			endVertex?.absoluteIndex as number,
			endVertex?.row as number,
			numRows,
			numCols
		);
		startNeighborsTopVertex = getVertexAbsolute(
			startNeighbors.top,
			numRows,
			numCols,
			props.verticesRef
		);
	}

	const handleStart = () => {
		if (startEndRef.current) {
			const start = startEndRef.current.children[0];
			const end = startEndRef.current.children[1];
			if (end.classList.contains(styles.Selected)) {
				end.classList.remove(styles.Selected);
				start.classList.add(styles.Selected);
			}
		}
	};

	const handleEnd = () => {
		if (startEndRef.current) {
			const start = startEndRef.current.children[0];
			const end = startEndRef.current.children[1];
			if (start.classList.contains(styles.Selected)) {
				start.classList.remove(styles.Selected);
				end.classList.add(styles.Selected);
			}
		}
	};

	const handleUp = () => {
		if (startEndRef.current && startVertex) {
			if (start.classList.contains(styles.Selected)) {
				const top = startNeighborsTopVertex;
				console.log(startNeighbors.top);
				if (startNeighbors.top !== -1) {
					theme.start(top.element);
					theme.unvisited(startVertex?.element);
					dispatch(
						Actions.setStartVertex(
							top.row,
							top.column,
							props.verticesRef
						)
					);
				}
			}
		}
	};
	const handleDown = () => {};
	const handleLeft = () => {};
	const handleRight = () => {};

	return (
		<div className={classNames.join(' ')}>
			<div className={styles.StartEndContainer}>
				<div ref={startEndRef} className={styles.StartEnd}>
					<button className={styles.Selected} onClick={handleStart}>
						Start
					</button>
					<button onClick={handleEnd}>End</button>
				</div>
			</div>
			<div className={styles.ShowControlsContainer}>
				<div className={styles.ShowControls}>
					<button>Hide Controls</button>
				</div>
			</div>
			<div className={styles.DPadContainer}>
				<div className={styles.DPad}>
					<div className={styles.Row_1}>
						<button onClick={handleUp}>&uarr;</button>
					</div>
					<div className={styles.Row_2}>
						<button onClick={handleLeft}>&larr;</button>
						<button onClick={handleRight}>&rarr;</button>
					</div>
					<div className={styles.Row_3}>
						<button onClick={handleDown}>&darr;</button>
					</div>
				</div>
			</div>
		</div>
	);
};
