import { RefObject } from 'react';
import { ActionTypes } from './types';
import * as actions from '../actions';

export const mouseDown = (
	e: any,
	startRow: number,
	startCol: number,
	endRow: number,
	endCol: number,
	numRows: number,
	numCols: number,
	isAnimating: boolean
) => {
	return {
		type: ActionTypes.MOUSE_DOWN,
		e,
		startRow,
		startCol,
		endRow,
		endCol,
		numRows,
		numCols,
		isAnimating,
	};
};

export const onMouseDown = (e: any) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let startRow = graph.startRow;
		let startCol = graph.startCol;
		let endRow = graph.endRow;
		let endCol = graph.endCol;
		let numRows = graph.numRows;
		let numCols = graph.numCols;
		let isAnimating = graph.isAnimating;

		dispatch(
			mouseDown(
				e,
				startRow,
				startCol,
				endRow,
				endCol,
				numRows,
				numCols,
				isAnimating
			)
		);
	};
};

export const mouseOver = (
	e: any,
	verticesRef: RefObject<HTMLDivElement>,
	startRow: number,
	startCol: number,
	endRow: number,
	endCol: number,
	numRows: number,
	numCols: number
) => {
	return {
		type: ActionTypes.MOUSE_OVER,
		e,
		verticesRef,
		startRow,
		startCol,
		endRow,
		endCol,
		numRows,
		numCols,
	};
};

export const onMouseOver = (e: any, verticesRef: RefObject<HTMLDivElement>) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let startRow = graph.startRow;
		let startCol = graph.startCol;
		let endRow = graph.endRow;
		let endCol = graph.endCol;
		let numRows = graph.numRows;
		let numCols = graph.numCols;

		dispatch(
			mouseOver(
				e,
				verticesRef,
				startRow,
				startCol,
				endRow,
				endCol,
				numRows,
				numCols
			)
		);
	};
};

export const mouseOut = (
	e: any,
	verticesRef: RefObject<HTMLDivElement>,
	startRow: number,
	startCol: number,
	endRow: number,
	endCol: number,
	numRows: number,
	numCols: number
) => {
	return {
		type: ActionTypes.MOUSE_OUT,
		e,
		verticesRef,
		startRow,
		startCol,
		endRow,
		endCol,
		numRows,
		numCols,
	};
};

export const onMouseOut = (e: any, verticesRef: RefObject<HTMLDivElement>) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let startRow = graph.startRow;
		let startCol = graph.startCol;
		let endRow = graph.endRow;
		let endCol = graph.endCol;
		let numRows = graph.numRows;
		let numCols = graph.numCols;

		dispatch(
			mouseOut(
				e,
				verticesRef,
				startRow,
				startCol,
				endRow,
				endCol,
				numRows,
				numCols
			)
		);
	};
};

export const mouseUp = (e: any) => {
	return {
		type: ActionTypes.MOUSE_UP,
		e,
	};
};

export const onMouseUp = (e: any, verticesRef: RefObject<HTMLDivElement>) => {
	return (dispatch: any, getState: any) => {
		let vertex = e.target;
		let vertexRow = parseInt(vertex.getAttribute('row'));
		let vertexCol = parseInt(vertex.getAttribute('column'));
		let drag = getState().drag;

		if (drag.isStartMouseDown) {
			dispatch(actions.setStartRow(vertexRow));
			dispatch(actions.setStartCol(vertexCol));
		} else if (drag.isEndMouseDown) {
			dispatch(actions.setEndRow(vertexRow));
			dispatch(actions.setEndCol(vertexCol));
		} else if (drag.isMouseDown) {
			dispatch(actions.onSetWallIndices(drag.wallIndices, verticesRef));
		}
		dispatch(mouseUp(e));
	};
};

export const clearDragWalls = () => {
	return {
		type: ActionTypes.CLEAR_DRAG_WALLS,
	};
};

export const setIsDoneAnimating = (isDoneAnimating: boolean) => {
	return {
		type: ActionTypes.SET_IS_DONE_ANIMATING,
		isDoneAnimating,
	};
};
