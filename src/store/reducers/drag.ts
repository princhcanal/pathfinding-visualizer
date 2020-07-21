import { ActionTypes } from '../actions';
import * as Position from '../../utils/position';

export interface DragState {
	isStartMouseDown: boolean;
	isEndMouseDown: boolean;
	isMouseDown: boolean;
	wallIndices: number[];
	obstacle1Indices: number[];
	obstacle2Indices: number[];
	obstacle3Indices: number[];
	obstacleRef: number[] | null;
	isDoneAnimating: boolean;
	isRecalculating: boolean;
	isOverStart: boolean;
	isOverEnd: boolean;
	isOverObstacle: boolean;
	overStartRow: number;
	overStartCol: number;
	overEndRow: number;
	overEndCol: number;
	overObstacleRow: number;
	overObstacleCol: number;
}

const initialState: DragState = {
	isStartMouseDown: false,
	isEndMouseDown: false,
	isMouseDown: false,
	wallIndices: [],
	obstacle1Indices: [],
	obstacle2Indices: [],
	obstacle3Indices: [],
	obstacleRef: null,
	isDoneAnimating: false,
	isRecalculating: false,
	isOverStart: false,
	isOverEnd: false,
	isOverObstacle: false,
	overStartRow: 0,
	overStartCol: 0,
	overEndRow: 0,
	overEndCol: 0,
	overObstacleRow: 0,
	overObstacleCol: 0,
};

const mouseDown = (state: DragState, action: any): DragState => {
	if (action.isAnimating) return state;

	let vertex = action.e.target;
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));

	if (vertexIndex === action.startVertex.absoluteIndex) {
		vertex.style.cursor = 'grabbing';
		return {
			...state,
			isStartMouseDown: true,
		};
	} else if (vertexIndex === action.endVertex.absoluteIndex) {
		vertex.style.cursor = 'grabbing';
		return {
			...state,
			isEndMouseDown: true,
		};
	}

	if (state.obstacleRef?.includes(vertexIndex)) {
		state.obstacleRef.splice(state.obstacleRef.indexOf(vertexIndex), 1);
		action.theme.revertObstacle(vertex);
	} else {
		if (
			!state.wallIndices.includes(vertexIndex) &&
			!state.obstacle1Indices.includes(vertexIndex) &&
			!state.obstacle2Indices.includes(vertexIndex) &&
			!state.obstacle3Indices.includes(vertexIndex)
		) {
			state.obstacleRef?.push(vertexIndex);
			if (state.obstacleRef === state.wallIndices) {
				action.theme.wall(vertex);
			} else if (state.obstacleRef === state.obstacle1Indices) {
				action.theme.obstacle1(vertex);
			} else if (state.obstacleRef === state.obstacle2Indices) {
				action.theme.obstacle2(vertex);
			} else if (state.obstacleRef === state.obstacle3Indices) {
				action.theme.obstacle3(vertex);
			}
		}
	}

	return { ...state, isMouseDown: true };
};

// FIXME: vertex over walls over start/end
const mouseOver = (state: DragState, action: any): DragState => {
	let vertex = action.e.target;
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
	let isOverStart = false;
	let isOverEnd = false;
	let isOverObstacle = false;

	if (state.isStartMouseDown) {
		if (vertexIndex === action.endVertex.absoluteIndex) {
			isOverEnd = true;
		} else if (
			state.wallIndices.includes(vertexIndex) ||
			state.obstacle1Indices.includes(vertexIndex) ||
			state.obstacle2Indices.includes(vertexIndex) ||
			state.obstacle3Indices.includes(vertexIndex)
		) {
			isOverObstacle = true;
		} else {
			if (!action.endNeighbors.includes(vertexIndex)) {
				for (let endNeighborVertex of action.endNeighborsVertices) {
					if (
						!state.obstacleRef?.includes(
							endNeighborVertex.absoluteIndex
						)
					) {
						action.theme.unvisited(endNeighborVertex.element);
					}
				}
			}

			for (let obstacleNeighborVertex of action.obstacleNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle1Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle2Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle3Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						action.endVertex.absoluteIndex
					)
				) {
					action.theme.unvisited(obstacleNeighborVertex.element);
				}
			}

			action.theme.start(vertex);
		}
		vertex.style.cursor = 'grabbing';
	} else if (state.isEndMouseDown) {
		if (vertexIndex === action.startVertex.absoluteIndex) {
			isOverStart = true;
		} else if (
			state.wallIndices.includes(vertexIndex) ||
			state.obstacle1Indices.includes(vertexIndex) ||
			state.obstacle2Indices.includes(vertexIndex) ||
			state.obstacle3Indices.includes(vertexIndex)
		) {
			isOverObstacle = true;
		} else {
			if (!action.startNeighbors.includes(vertexIndex)) {
				for (let startNeighborVertex of action.startNeighborsVertices) {
					if (
						!state.obstacleRef?.includes(
							startNeighborVertex.absoluteIndex
						)
					) {
						action.theme.unvisited(startNeighborVertex.element);
					}
				}
			}

			for (let obstacleNeighborVertex of action.obstacleNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle1Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle2Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle3Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						action.startVertex.absoluteIndex
					)
				) {
					action.theme.unvisited(obstacleNeighborVertex.element);
				}
			}

			action.theme.end(vertex);
		}
		vertex.style.cursor = 'grabbing';
	} else if (
		state.isMouseDown &&
		vertexIndex !== action.startVertex.absoluteIndex &&
		vertexIndex !== action.endVertex.absoluteIndex
	) {
		if (state.obstacleRef?.includes(vertexIndex)) {
			state.obstacleRef.splice(state.obstacleRef.indexOf(vertexIndex), 1);
			action.theme.revertObstacle(vertex);
		} else {
			if (
				!state.wallIndices.includes(vertexIndex) &&
				!state.obstacle1Indices.includes(vertexIndex) &&
				!state.obstacle2Indices.includes(vertexIndex) &&
				!state.obstacle3Indices.includes(vertexIndex)
			) {
				state.obstacleRef?.push(vertexIndex);
				if (state.obstacleRef === state.wallIndices) {
					action.theme.wall(vertex);
				} else if (state.obstacleRef === state.obstacle1Indices) {
					action.theme.obstacle1(vertex);
				} else if (state.obstacleRef === state.obstacle2Indices) {
					action.theme.obstacle2(vertex);
				} else if (state.obstacleRef === state.obstacle3Indices) {
					action.theme.obstacle3(vertex);
				}
			}
		}
	}

	return {
		...state,
		isOverStart,
		isOverEnd,
		isOverObstacle,
	};
};

const mouseOut = (state: DragState, action: any): DragState => {
	let vertex = action.e.target;
	let vertexRow = parseInt(vertex.getAttribute('row'));
	let vertexCol = parseInt(vertex.getAttribute('column'));
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
	let overStartRow = state.overStartRow;
	let overStartCol = state.overStartCol;
	let overEndRow = state.overEndRow;
	let overEndCol = state.overEndCol;
	let overObstacleRow = state.overObstacleRow;
	let overObstacleCol = state.overObstacleCol;

	let overObstacleIndex = Position.indexToAbsolute(
		state.overObstacleRow,
		state.overObstacleCol,
		action.numRows,
		action.numCols
	);

	if (state.isStartMouseDown) {
		if (vertexIndex === action.endVertex.absoluteIndex) {
			for (let endNeighborVertex of action.endNeighborsVertices) {
				if (
					!state.obstacleRef?.includes(
						endNeighborVertex.absoluteIndex
					)
				) {
					action.theme.unvisited(endNeighborVertex.element);
				}
			}
			vertex.style.cursor = 'grab';
		} else if (
			state.wallIndices.includes(vertexIndex) ||
			state.obstacle1Indices.includes(vertexIndex) ||
			state.obstacle2Indices.includes(vertexIndex) ||
			state.obstacle3Indices.includes(vertexIndex)
		) {
			for (let obstacleNeighborVertex of action.obstacleNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle1Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle2Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle3Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						action.startVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						action.endVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						overObstacleIndex
					)
				) {
					action.theme.unvisited(obstacleNeighborVertex.element);
				}
			}
		} else if (action.endNeighbors.includes(vertexIndex)) {
			overEndRow = vertexRow;
			overEndCol = vertexCol;
			action.theme.start(vertex);
		} else if (action.obstacleNeighbors.includes(vertexIndex)) {
			overObstacleRow = vertexRow;
			overObstacleCol = vertexCol;
			action.theme.start(vertex);
		} else {
			action.theme.unvisited(vertex);
		}
	} else if (state.isEndMouseDown) {
		if (vertexIndex === action.startVertex.absoluteIndex) {
			for (let startNeighborVertex of action.startNeighborsVertices) {
				if (
					!state.obstacleRef?.includes(
						startNeighborVertex.absoluteIndex
					)
				) {
					action.theme.unvisited(startNeighborVertex.element);
				}
			}
		} else if (
			state.wallIndices.includes(vertexIndex) ||
			state.obstacle1Indices.includes(vertexIndex) ||
			state.obstacle2Indices.includes(vertexIndex) ||
			state.obstacle3Indices.includes(vertexIndex)
		) {
			for (let obstacleNeighborVertex of action.obstacleNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle1Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle2Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!state.obstacle3Indices.includes(
						obstacleNeighborVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						action.startVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						action.endVertex.absoluteIndex
					) &&
					!(
						obstacleNeighborVertex.absoluteIndex ===
						overObstacleIndex
					)
				) {
					action.theme.unvisited(obstacleNeighborVertex.element);
				}
			}
		} else if (action.startNeighbors.includes(vertexIndex)) {
			overStartRow = vertexRow;
			overStartCol = vertexCol;
			action.theme.end(vertex);
		} else if (action.obstacleNeighbors.includes(vertexIndex)) {
			overObstacleRow = vertexRow;
			overObstacleCol = vertexCol;
			action.theme.end(vertex);
		} else {
			action.theme.unvisited(vertex);
		}
	}

	return {
		...state,
		overStartRow,
		overStartCol,
		overEndRow,
		overEndCol,
		overObstacleRow,
		overObstacleCol,
	};
};

const mouseUp = (state: DragState, action: any): DragState => {
	const vertex = action.e.target;

	if (state.isStartMouseDown || state.isEndMouseDown) {
		vertex.style.cursor = 'grab';
	}

	return {
		...state,
		isStartMouseDown: false,
		isEndMouseDown: false,
		isMouseDown: false,
		isRecalculating: false,
		isOverStart: false,
		isOverEnd: false,
		isOverObstacle: false,
	};
};

const clearDragWalls = (state: DragState, action: any): DragState => {
	return {
		...state,
		wallIndices: [],
		obstacle1Indices: [],
		obstacle2Indices: [],
		obstacle3Indices: [],
	};
};

const setIsDoneAnimating = (state: DragState, action: any): DragState => {
	return {
		...state,
		isDoneAnimating: action.isDoneAnimating,
	};
};

const setIsRecalculating = (state: DragState, action: any): DragState => {
	return {
		...state,
		isRecalculating: action.isRecalculating,
	};
};

const setObstacleRef = (state: DragState, action: any): DragState => {
	return {
		...state,
		obstacleRef: action.obstacleRef,
	};
};

export const dragReducer = (
	state: DragState = initialState,
	action: any
): DragState => {
	switch (action.type) {
		case ActionTypes.MOUSE_DOWN:
			return mouseDown(state, action);
		case ActionTypes.MOUSE_OVER:
			return mouseOver(state, action);
		case ActionTypes.MOUSE_OUT:
			return mouseOut(state, action);
		case ActionTypes.MOUSE_UP:
			return mouseUp(state, action);
		case ActionTypes.CLEAR_DRAG_WALLS:
			return clearDragWalls(state, action);
		case ActionTypes.SET_IS_DONE_ANIMATING:
			return setIsDoneAnimating(state, action);
		case ActionTypes.SET_IS_RECALCULATING:
			return setIsRecalculating(state, action);
		case ActionTypes.SET_OBSTACLE_REF:
			return setObstacleRef(state, action);
		default:
			return state;
	}
};
