import { RefObject } from 'react';
import { ActionTypes } from './types';
import * as actions from '../actions';
import { pathfindingAlgorithms } from '../../utils/pathfinding/pathfindingAlgorithms';

export const initGraph = (verticesRef: RefObject<HTMLDivElement>) => {
	return {
		type: ActionTypes.INIT_GRAPH,
		verticesRef,
	};
};

export const setVerticesRef = (verticesRef: RefObject<HTMLDivElement>) => {
	return {
		type: ActionTypes.SET_VERTICES_REF,
		verticesRef,
	};
};

export const setStartVertex = (startRow: number, startCol: number) => {
	return {
		type: ActionTypes.SET_START_VERTEX,
		startRow,
		startCol,
	};
};

export const setEndVertex = (endRow: number, endCol: number) => {
	return {
		type: ActionTypes.SET_END_VERTEX,
		endRow,
		endCol,
	};
};

export const clearTimeouts = () => {
	return {
		type: ActionTypes.CLEAR_TIMEOUTS,
	};
};

export const clearPath = (
	verticesRef: RefObject<HTMLDivElement>,
	isRecalculating: boolean = false
) => {
	return {
		type: ActionTypes.CLEAR_PATH,
		verticesRef,
		isRecalculating,
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
		dispatch(actions.initGraph(verticesRef));
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
		dispatch(initGraph(verticesRef));
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
	verticesRef: RefObject<HTMLDivElement>
) => {
	return (dispatch: any, getState: any) => {
		let drag = getState().drag;
		if (
			drag.isDoneAnimating &&
			(drag.isStartMouseDown || drag.isEndMouseDown)
		) {
			dispatch(actions.setIsRecalculating(true));
			dispatch(clearPath(verticesRef, drag.isRecalculating));
			dispatch(recalculatePath(start, end, verticesRef));
		}
	};
};

export const setCurrentAlgorithm = (algorithm: string) => {
	return {
		type: ActionTypes.SET_CURRENT_ALGORITHM,
		currentAlgorithm: pathfindingAlgorithms[algorithm],
	};
};
