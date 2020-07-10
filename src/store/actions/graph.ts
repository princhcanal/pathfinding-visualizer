import { RefObject } from 'react';
import { ActionTypes } from './types';
import * as actions from '../actions';

export const initGraph = (verticesRef: RefObject<HTMLDivElement>) => {
	return {
		type: ActionTypes.INIT_GRAPH,
		verticesRef,
	};
};

export const setStartRow = (row: number) => {
	return {
		type: ActionTypes.SET_START_ROW,
		row,
	};
};

export const setStartCol = (col: number) => {
	return {
		type: ActionTypes.SET_START_COL,
		col,
	};
};

export const setEndRow = (row: number) => {
	return {
		type: ActionTypes.SET_END_ROW,
		row,
	};
};

export const setEndCol = (col: number) => {
	return {
		type: ActionTypes.SET_END_COL,
		col,
	};
};

export const clearTimeouts = () => {
	return {
		type: ActionTypes.CLEAR_TIMEOUTS,
	};
};

export const clearPath = (verticesRef: RefObject<HTMLDivElement>) => {
	return {
		type: ActionTypes.CLEAR_PATH,
		verticesRef,
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
