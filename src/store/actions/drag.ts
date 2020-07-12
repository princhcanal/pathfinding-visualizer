import { RefObject } from 'react';
import { ActionTypes } from './types';
import * as actions from '../actions';
import * as position from '../../utils/position';
import { Vertex } from '../reducers/graph';

export const mouseDown = (
	e: any,
	isAnimating: boolean,
	startVertex: Vertex,
	endVertex: Vertex
) => {
	return {
		type: ActionTypes.MOUSE_DOWN,
		e,
		isAnimating,
		startVertex,
		endVertex,
	};
};

export const onMouseDown = (e: any) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let isAnimating = graph.isAnimating;
		let startVertex = graph.startVertex;
		let endVertex = graph.endVertex;

		dispatch(mouseDown(e, isAnimating, startVertex, endVertex));
	};
};

export const mouseOver = (
	e: any,
	verticesRef: RefObject<HTMLDivElement>,
	startVertex: Vertex,
	endVertex: Vertex,
	numRows: number,
	numCols: number,
	startNeighbors: number[],
	startNeighborsVertices: Vertex[],
	endNeighbors: number[],
	endNeighborsVertices: Vertex[]
) => {
	return {
		type: ActionTypes.MOUSE_OVER,
		e,
		verticesRef,
		startVertex,
		endVertex,
		numRows,
		numCols,
		startNeighbors,
		startNeighborsVertices,
		endNeighbors,
		endNeighborsVertices,
	};
};

export const onMouseOver = (e: any, verticesRef: RefObject<HTMLDivElement>) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let drag = getState().drag;
		let vertex = e.target;
		let startVertex = graph.startVertex;
		let endVertex = graph.endVertex;
		let numRows = graph.numRows;
		let numCols = graph.numCols;
		let startNeighbors = getNeighbors(
			startVertex.absoluteIndex,
			startVertex.row,
			numRows,
			numCols
		);
		let endNeighbors = getNeighbors(
			endVertex.absoluteIndex,
			endVertex.row,
			numRows,
			numCols
		);
		let startNeighborsVertices: Vertex[] = getNeighborVertices(
			startNeighbors,
			numRows,
			numCols,
			verticesRef
		);
		let endNeighborsVertices: Vertex[] = getNeighborVertices(
			endNeighbors,
			numRows,
			numCols,
			verticesRef
		);

		dispatch(
			mouseOver(
				e,
				verticesRef,
				startVertex,
				endVertex,
				numRows,
				numCols,
				startNeighbors,
				startNeighborsVertices,
				endNeighbors,
				endNeighborsVertices
			)
		);

		if (drag.isStartMouseDown) {
			// if (drag.isOverEnd) {
			// 	let startIndex = position.indexToAbsolute(
			// 		drag.overStartRow,
			// 		drag.overStartCol,
			// 		numRows,
			// 		numCols
			// 	);
			// 	dispatch(
			// 		actions.onRecalculatePath(
			// 			startIndex,
			// 			endVertex.absoluteIndex,
			// 			verticesRef
			// 		)
			// 	);
			// } else {
			dispatch(
				actions.onRecalculatePath(
					parseInt(vertex.getAttribute('absoluteIndex')),
					endVertex.absoluteIndex,
					verticesRef
				)
			);
			// }
		} else if (drag.isEndMouseDown) {
			dispatch(
				actions.onRecalculatePath(
					startVertex.absoluteIndex,
					parseInt(vertex.getAttribute('absoluteIndex')),
					verticesRef
				)
			);
		}
	};
};

export const mouseOut = (
	e: any,
	verticesRef: RefObject<HTMLDivElement>,
	startVertex: Vertex,
	endVertex: Vertex,
	numRows: number,
	numCols: number,
	startNeighbors: number[],
	startNeighborsVertices: Vertex[],
	endNeighbors: number[],
	endNeighborsVertices: Vertex[]
) => {
	return {
		type: ActionTypes.MOUSE_OUT,
		e,
		verticesRef,
		startVertex,
		endVertex,
		numRows,
		numCols,
		startNeighbors,
		startNeighborsVertices,
		endNeighbors,
		endNeighborsVertices,
	};
};

export const onMouseOut = (e: any, verticesRef: RefObject<HTMLDivElement>) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let startVertex = graph.startVertex;
		let endVertex = graph.endVertex;
		let numRows = graph.numRows;
		let numCols = graph.numCols;
		let verticesRef = graph.verticesRef;
		let startNeighbors = getNeighbors(
			startVertex.absoluteIndex,
			startVertex.row,
			numRows,
			numCols
		);
		let endNeighbors = getNeighbors(
			endVertex.absoluteIndex,
			endVertex.row,
			numRows,
			numCols
		);
		let startNeighborsVertices: Vertex[] = getNeighborVertices(
			startNeighbors,
			numRows,
			numCols,
			verticesRef
		);
		let endNeighborsVertices: Vertex[] = getNeighborVertices(
			endNeighbors,
			numRows,
			numCols,
			verticesRef
		);

		dispatch(
			mouseOut(
				e,
				verticesRef,
				startVertex,
				endVertex,
				numRows,
				numCols,
				startNeighbors,
				startNeighborsVertices,
				endNeighbors,
				endNeighborsVertices
			)
		);
	};
};

const getNeighbors = (
	absoluteIndex: number,
	row: number,
	numRows: number,
	numCols: number
): number[] => {
	return Object.values(
		position.getNeighbors(absoluteIndex, row, numRows, numCols)
	);
};

const getNeighborVertices = (
	neighbors: number[],
	numRows: number,
	numCols: number,
	verticesRef: RefObject<HTMLDivElement>
): Vertex[] => {
	let neighborVertices: Vertex[] = [];

	for (let neighbor of neighbors) {
		neighborVertices.push(
			position.getVertexAbsolute(neighbor, numRows, numCols, verticesRef)
		);
	}

	return neighborVertices;
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
			if (drag.isOverEnd) {
				dispatch(
					actions.setStartVertex(drag.overEndRow, drag.overEndCol)
				);
			} else {
				dispatch(actions.setStartVertex(vertexRow, vertexCol));
			}
		} else if (drag.isEndMouseDown) {
			if (drag.isOverStart) {
				dispatch(
					actions.setEndVertex(drag.overStartRow, drag.overStartCol)
				);
			} else {
				dispatch(actions.setEndVertex(vertexRow, vertexCol));
			}
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

export const setIsRecalculating = (isRecalculating: boolean) => {
	return {
		type: ActionTypes.SET_IS_RECALCULATING,
		isRecalculating,
	};
};
