import { RefObject } from 'react';
import { ActionTypes } from './types';

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
