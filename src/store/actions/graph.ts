import { RefObject } from 'react';
import { ActionTypes } from './types';
import * as actions from '../actions';
import { pathfindingAlgorithms } from '../../utils/pathfinding/pathfindingAlgorithms';

export const initGraph = (
	verticesRef: RefObject<HTMLDivElement>,
	isSettingWalls: boolean = false
) => {
	return {
		type: ActionTypes.INIT_GRAPH,
		verticesRef,
		isSettingWalls,
	};
};

export const setVerticesRef = (verticesRef: RefObject<HTMLDivElement>) => {
	return {
		type: ActionTypes.SET_VERTICES_REF,
		verticesRef,
	};
};

export const setStartVertex = (
	startRow: number,
	startCol: number,
	verticesRef: RefObject<HTMLDivElement>
) => {
	return {
		type: ActionTypes.SET_START_VERTEX,
		startRow,
		startCol,
		verticesRef,
	};
};

export const setEndVertex = (
	endRow: number,
	endCol: number,
	verticesRef: RefObject<HTMLDivElement>
) => {
	return {
		type: ActionTypes.SET_END_VERTEX,
		endRow,
		endCol,
		verticesRef,
	};
};

export const clearTimeouts = () => {
	return {
		type: ActionTypes.CLEAR_TIMEOUTS,
	};
};

export const clearPath = (
	verticesRef: RefObject<HTMLDivElement>,
	isRecalculating: boolean = false,
	start: number = -1,
	end: number = -1
) => {
	return {
		type: ActionTypes.CLEAR_PATH,
		verticesRef,
		isRecalculating,
		start,
		end,
	};
};

export const setWallIndices = (
	wallIndices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return {
		type: ActionTypes.SET_WALL_INDICES,
		wallIndices,
		verticesRef,
	};
};

export const onSetWallIndices = (
	wallIndices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return (dispatch: any, getState: any) => {
		dispatch(setWallIndices(wallIndices, verticesRef));
		dispatch(initGraph(verticesRef, true));
		dispatch(
			onRecalculatePath(
				getState().graph.start,
				getState().graph.end,
				verticesRef,
				0,
				0,
				0
			)
		);
	};
};

export const setObstacle1Indices = (
	obstacle1Indices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return {
		type: ActionTypes.SET_OBSTACLE_1_INDICES,
		obstacle1Indices,
		verticesRef,
	};
};

export const onSetObstacle1Indices = (
	obstacle1Indices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return (dispatch: any, getState: any) => {
		dispatch(setObstacle1Indices(obstacle1Indices, verticesRef));
		dispatch(initGraph(verticesRef, true));
		dispatch(
			onRecalculatePath(
				getState().graph.start,
				getState().graph.end,
				verticesRef,
				0,
				0,
				0
			)
		);
	};
};

export const setObstacle2Indices = (
	obstacle2Indices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return {
		type: ActionTypes.SET_OBSTACLE_2_INDICES,
		obstacle2Indices,
		verticesRef,
	};
};

export const onSetObstacle2Indices = (
	obstacle2Indices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return (dispatch: any, getState: any) => {
		dispatch(setObstacle2Indices(obstacle2Indices, verticesRef));
		dispatch(initGraph(verticesRef, true));
		dispatch(
			onRecalculatePath(
				getState().graph.start,
				getState().graph.end,
				verticesRef,
				0,
				0,
				0
			)
		);
	};
};

export const setObstacle3Indices = (
	obstacle3Indices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return {
		type: ActionTypes.SET_OBSTACLE_3_INDICES,
		obstacle3Indices,
		verticesRef,
	};
};

export const onSetObstacle3Indices = (
	obstacle3Indices: number[],
	verticesRef: RefObject<HTMLDivElement>
) => {
	return (dispatch: any, getState: any) => {
		dispatch(setObstacle3Indices(obstacle3Indices, verticesRef));
		dispatch(initGraph(verticesRef, true));
		dispatch(
			onRecalculatePath(
				getState().graph.start,
				getState().graph.end,
				verticesRef,
				0,
				0,
				0
			)
		);
	};
};

export const clearWalls = (verticesRef: RefObject<HTMLDivElement>) => {
	return {
		type: ActionTypes.CLEAR_WALLS,
		verticesRef,
	};
};

export const onClearWalls = (verticesRef: RefObject<HTMLDivElement>) => {
	return (dispatch: any, getState: any) => {
		dispatch(actions.clearDragWalls());
		dispatch(clearWalls(verticesRef));
		dispatch(initGraph(verticesRef, true));
	};
};

export const setIsAnimating = (isAnimating: boolean) => {
	return {
		type: ActionTypes.SET_IS_ANIMATING,
		isAnimating,
	};
};

export const recalculatePath = (
	start: number,
	end: number,
	verticesRef: RefObject<HTMLDivElement>
) => {
	return {
		type: ActionTypes.RECALCULATE_PATH,
		start,
		end,
		verticesRef,
	};
};

export const onRecalculatePath = (
	start: number,
	end: number,
	verticesRef: RefObject<HTMLDivElement>,
	overEndIndex: number,
	overStartIndex: number,
	overObstacleIndex: number
) => {
	return (dispatch: any, getState: any) => {
		let drag = getState().drag;
		let isDoneAnimating = drag.isDoneAnimating;
		let isStartMouseDown = drag.isStartMouseDown;
		let isEndMouseDown = drag.isEndMouseDown;
		// TODO: add when new walls to condition
		if (isDoneAnimating && (isStartMouseDown || isEndMouseDown)) {
			dispatch(actions.setIsRecalculating(true));
			dispatch(clearPath(verticesRef, true, start, end));

			let startIndex = start;
			let endIndex = end;
			if (drag.isOverEnd) {
				startIndex = overEndIndex;
			} else if (
				drag.isOverObstacle &&
				!drag.isOverStart &&
				isStartMouseDown
			) {
				startIndex = overObstacleIndex;
			} else if (drag.isOverStart) {
				endIndex = overStartIndex;
			} else if (
				drag.isOverObstacle &&
				!drag.isOverEnd &&
				isEndMouseDown
			) {
				endIndex = overObstacleIndex;
			}

			dispatch(recalculatePath(startIndex, endIndex, verticesRef));
		}
	};
};

export const setCurrentAlgorithm = (algorithm: string) => {
	return {
		type: ActionTypes.SET_CURRENT_ALGORITHM,
		currentAlgorithm: pathfindingAlgorithms[algorithm],
	};
};

export const setNumRows = (numRows: number) => {
	return {
		type: ActionTypes.SET_NUM_ROWS,
		numRows,
	};
};

export const setNumCols = (numCols: number) => {
	return {
		type: ActionTypes.SET_NUM_COLS,
		numCols,
	};
};
