import { RefObject } from 'react';
import { ActionTypes } from './types';
import * as actions from '../actions';
import * as Position from '../../utils/position';
import { Vertex } from '../reducers/graph';
import { GraphTheme } from '../../utils/themes';
import { indexToAbsolute } from '../../utils/position';

export const mouseDown = (
	e: any,
	isAnimating: boolean,
	startVertex: Vertex,
	endVertex: Vertex,
	theme: GraphTheme
) => {
	return {
		type: ActionTypes.MOUSE_DOWN,
		e,
		isAnimating,
		startVertex,
		endVertex,
		theme,
	};
};

export const onMouseDown = (e: any) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let isAnimating = graph.isAnimating;
		let startVertex = graph.startVertex;
		let endVertex = graph.endVertex;
		let theme = graph.theme;

		dispatch(mouseDown(e, isAnimating, startVertex, endVertex, theme));
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
	endNeighborsVertices: Vertex[],
	obstacleNeighbors: number[],
	obstacleNeighborsVertices: Vertex[],
	theme: GraphTheme
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
		obstacleNeighbors,
		obstacleNeighborsVertices,
		theme,
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
		let theme = graph.theme;
		let wallIndices = drag.wallIndices;
		let obstacle1Indices = drag.obstacle1Indices;
		let obstacle2Indices = drag.obstacle2Indices;
		let obstacle3Indices = drag.obstacle3Indices;
		let obstacleIndices = [
			...wallIndices,
			...obstacle1Indices,
			...obstacle2Indices,
			obstacle3Indices,
		];
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
		let obstacleNeighbors: number[] = [];
		for (let obstacleIndex of obstacleIndices) {
			let obstacleRow = Position.absoluteToIndex(
				obstacleIndex,
				numRows,
				numCols
			).row;
			obstacleNeighbors.push(
				...getNeighbors(obstacleIndex, obstacleRow, numRows, numCols)
			);
		}
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
		let obstacleNeighborsVertices: Vertex[] = getNeighborVertices(
			obstacleNeighbors,
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
				endNeighborsVertices,
				obstacleNeighbors,
				obstacleNeighborsVertices,
				theme
			)
		);

		let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
		let overEndRow = drag.overEndRow;
		let overEndCol = drag.overEndCol;
		let overStartRow = drag.overStartRow;
		let overStartCol = drag.overStartCol;
		let overObstacleRow = drag.overObstacleRow;
		let overObstacleCol = drag.overObstacleCol;

		let overEndIndex = indexToAbsolute(
			overEndRow,
			overEndCol,
			numRows,
			numCols
		);
		let overStartIndex = indexToAbsolute(
			overStartRow,
			overStartCol,
			numRows,
			numCols
		);
		let overObstacleIndex = indexToAbsolute(
			overObstacleRow,
			overObstacleCol,
			numRows,
			numCols
		);

		if (drag.isStartMouseDown && drag.isDoneAnimating) {
			console.log(overObstacleIndex);
			dispatch(
				actions.onRecalculatePath(
					vertexIndex,
					endVertex.absoluteIndex,
					verticesRef,
					overEndIndex,
					overStartIndex,
					overObstacleIndex
				)
			);
		} else if (drag.isEndMouseDown && drag.isDoneAnimating) {
			dispatch(
				actions.onRecalculatePath(
					startVertex.absoluteIndex,
					vertexIndex,
					verticesRef,
					overEndIndex,
					overStartIndex,
					overObstacleIndex
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
	endNeighborsVertices: Vertex[],
	obstacleNeighbors: number[],
	obstacleNeighborsVertices: Vertex[],
	theme: GraphTheme
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
		obstacleNeighbors,
		obstacleNeighborsVertices,
		theme,
	};
};

export const onMouseOut = (e: any, verticesRef: RefObject<HTMLDivElement>) => {
	return (dispatch: any, getState: any) => {
		let graph = getState().graph;
		let drag = getState().drag;
		let startVertex = graph.startVertex;
		let endVertex = graph.endVertex;
		let numRows = graph.numRows;
		let numCols = graph.numCols;
		let verticesRef = graph.verticesRef;
		let theme = graph.theme;
		let wallIndices = drag.wallIndices;
		let obstacle1Indices = drag.obstacle1Indices;
		let obstacle2Indices = drag.obstacle2Indices;
		let obstacle3Indices = drag.obstacle3Indices;
		let obstacleIndices = [
			...wallIndices,
			...obstacle1Indices,
			...obstacle2Indices,
			...obstacle3Indices,
		];
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
		let obstacleNeighbors: number[] = [];
		for (let obstacleIndex of obstacleIndices) {
			let obstacleRow = Position.absoluteToIndex(
				obstacleIndex,
				numRows,
				numCols
			).row;
			obstacleNeighbors.push(
				...getNeighbors(obstacleIndex, obstacleRow, numRows, numCols)
			);
		}
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
		let obstacleNeighborsVertices: Vertex[] = getNeighborVertices(
			obstacleNeighbors,
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
				endNeighborsVertices,
				obstacleNeighbors,
				obstacleNeighborsVertices,
				theme
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
		Position.getNeighbors(absoluteIndex, row, numRows, numCols)
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
		if (neighbor >= 0 && neighbor < numRows * numCols)
			neighborVertices.push(
				Position.getVertexAbsolute(
					neighbor,
					numRows,
					numCols,
					verticesRef
				)
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
					actions.setStartVertex(
						drag.overEndRow,
						drag.overEndCol,
						verticesRef
					)
				);
			} else if (drag.isOverObstacle) {
				dispatch(
					actions.setStartVertex(
						drag.overObstacleRow,
						drag.overObstacleCol,
						verticesRef
					)
				);
			} else {
				dispatch(
					actions.setStartVertex(vertexRow, vertexCol, verticesRef)
				);
			}
		} else if (drag.isEndMouseDown) {
			if (drag.isOverStart) {
				dispatch(
					actions.setEndVertex(
						drag.overStartRow,
						drag.overStartCol,
						verticesRef
					)
				);
			} else if (drag.isOverObstacle) {
				dispatch(
					actions.setEndVertex(
						drag.overObstacleRow,
						drag.overObstacleCol,
						verticesRef
					)
				);
			} else {
				dispatch(
					actions.setEndVertex(vertexRow, vertexCol, verticesRef)
				);
			}
		} else if (drag.isMouseDown) {
			dispatch(actions.onSetWallIndices(drag.wallIndices, verticesRef));
			dispatch(
				actions.onSetObstacle1Indices(
					drag.obstacle1Indices,
					verticesRef
				)
			);
			dispatch(
				actions.onSetObstacle2Indices(
					drag.obstacle2Indices,
					verticesRef
				)
			);
			dispatch(
				actions.onSetObstacle3Indices(
					drag.obstacle3Indices,
					verticesRef
				)
			);
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

export const setObstacleRef = (obstacleRef: number[]) => {
	return {
		type: ActionTypes.SET_OBSTACLE_REF,
		obstacleRef,
	};
};

export const onSetObstacleRef = (obstacleRef: string) => {
	return (dispatch: any, getState: any) => {
		const drag = getState().drag;
		const wallIndices = drag.wallIndices;
		const obstacle1Indices = drag.obstacle1Indices;
		const obstacle2Indices = drag.obstacle2Indices;
		const obstacle3Indices = drag.obstacle3Indices;

		type Obstacles = { [key: string]: number[] };

		const obstacles: Obstacles = {
			wall: wallIndices,
			obstacle1: obstacle1Indices,
			obstacle2: obstacle2Indices,
			obstacle3: obstacle3Indices,
		};

		dispatch(setObstacleRef(obstacles[obstacleRef]));
	};
};
