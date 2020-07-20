import { ActionTypes } from '../actions';
import * as Position from '../../utils/position';

export interface DragState {
	isStartMouseDown: boolean;
	isEndMouseDown: boolean;
	isMouseDown: boolean;
	wallIndices: number[];
	isDoneAnimating: boolean;
	isRecalculating: boolean;
	isOverStart: boolean;
	isOverEnd: boolean;
	isOverWall: boolean;
	overStartRow: number;
	overStartCol: number;
	overEndRow: number;
	overEndCol: number;
	overWallRow: number;
	overWallCol: number;
}

const initialState: DragState = {
	isStartMouseDown: false,
	isEndMouseDown: false,
	isMouseDown: false,
	wallIndices: [],
	isDoneAnimating: false,
	isRecalculating: false,
	isOverStart: false,
	isOverEnd: false,
	isOverWall: false,
	overStartRow: 0,
	overStartCol: 0,
	overEndRow: 0,
	overEndCol: 0,
	overWallRow: 0,
	overWallCol: 0,
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

	if (state.wallIndices.includes(vertexIndex)) {
		state.wallIndices = state.wallIndices.filter((i) => i !== vertexIndex);
		action.theme.revertWall(vertex);
	} else {
		state.wallIndices.push(vertexIndex);
		action.theme.wall(vertex);
	}

	return { ...state, isMouseDown: true };
};

// FIXME: vertex over walls over start/end
const mouseOver = (state: DragState, action: any): DragState => {
	let vertex = action.e.target;
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
	let isOverStart = false;
	let isOverEnd = false;
	let isOverWall = false;

	if (state.isStartMouseDown) {
		if (vertexIndex === action.endVertex.absoluteIndex) {
			isOverEnd = true;
		} else if (state.wallIndices.includes(vertexIndex)) {
			isOverWall = true;
		} else {
			if (!action.endNeighbors.includes(vertexIndex)) {
				for (let endNeighborVertex of action.endNeighborsVertices) {
					if (
						!state.wallIndices.includes(
							endNeighborVertex.absoluteIndex
						)
					) {
						action.theme.unvisited(endNeighborVertex.element);
					}
				}
			}

			for (let wallNeighborVertex of action.wallNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						wallNeighborVertex.absoluteIndex
					) &&
					!(
						wallNeighborVertex.absoluteIndex ===
						action.endVertex.absoluteIndex
					)
				) {
					action.theme.unvisited(wallNeighborVertex.element);
				}
			}

			action.theme.start(vertex);
			vertex.style.cursor = 'grabbing';
		}
	} else if (state.isEndMouseDown) {
		if (vertexIndex === action.startVertex.absoluteIndex) {
			isOverStart = true;
		} else if (state.wallIndices.includes(vertexIndex)) {
			isOverWall = true;
		} else {
			if (!action.startNeighbors.includes(vertexIndex)) {
				for (let startNeighborVertex of action.startNeighborsVertices) {
					if (
						!state.wallIndices.includes(
							startNeighborVertex.absoluteIndex
						)
					) {
						action.theme.unvisited(startNeighborVertex.element);
					}
				}
			}

			for (let wallNeighborVertex of action.wallNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						wallNeighborVertex.absoluteIndex
					) &&
					!(
						wallNeighborVertex.absoluteIndex ===
						action.startVertex.absoluteIndex
					)
				) {
					action.theme.unvisited(wallNeighborVertex.element);
				}
			}

			action.theme.end(vertex);
			vertex.style.cursor = 'grabbing';
		}
	} else if (
		state.isMouseDown &&
		vertexIndex !== action.startVertex.absoluteIndex &&
		vertexIndex !== action.endVertex.absoluteIndex
	) {
		if (state.wallIndices.includes(vertexIndex)) {
			state.wallIndices = state.wallIndices.filter(
				(i) => i !== vertexIndex
			);
			action.theme.revertWall(vertex);
		} else {
			state.wallIndices.push(vertexIndex);
			action.theme.wall(vertex);
		}
	}

	return {
		...state,
		isOverStart,
		isOverEnd,
		isOverWall,
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
	let overWallRow = state.overWallRow;
	let overWallCol = state.overWallCol;

	let overWallIndex = Position.indexToAbsolute(
		state.overWallRow,
		state.overWallCol,
		action.numRows,
		action.numCols
	);

	if (state.isStartMouseDown) {
		if (vertexIndex === action.endVertex.absoluteIndex) {
			for (let endNeighborVertex of action.endNeighborsVertices) {
				if (
					!state.wallIndices.includes(endNeighborVertex.absoluteIndex)
				) {
					action.theme.unvisited(endNeighborVertex.element);
				}
			}
		} else if (state.wallIndices.includes(vertexIndex)) {
			for (let wallNeighborVertex of action.wallNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						wallNeighborVertex.absoluteIndex
					) &&
					!(
						wallNeighborVertex.absoluteIndex ===
						action.startVertex.absoluteIndex
					) &&
					!(
						wallNeighborVertex.absoluteIndex ===
						action.endVertex.absoluteIndex
					) &&
					!(wallNeighborVertex.absoluteIndex === overWallIndex)
				) {
					action.theme.unvisited(wallNeighborVertex.element);
				}
			}
		} else if (action.endNeighbors.includes(vertexIndex)) {
			overEndRow = vertexRow;
			overEndCol = vertexCol;
			action.theme.start(vertex);
		} else if (action.wallNeighbors.includes(vertexIndex)) {
			overWallRow = vertexRow;
			overWallCol = vertexCol;
			action.theme.start(vertex);
		} else {
			action.theme.unvisited(vertex);
		}
	} else if (state.isEndMouseDown) {
		if (vertexIndex === action.startVertex.absoluteIndex) {
			for (let startNeighborVertex of action.startNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						startNeighborVertex.absoluteIndex
					)
				) {
					action.theme.unvisited(startNeighborVertex.element);
				}
			}
		} else if (state.wallIndices.includes(vertexIndex)) {
			for (let wallNeighborVertex of action.wallNeighborsVertices) {
				if (
					!state.wallIndices.includes(
						wallNeighborVertex.absoluteIndex
					) &&
					!(
						wallNeighborVertex.absoluteIndex ===
						action.startVertex.absoluteIndex
					) &&
					!(
						wallNeighborVertex.absoluteIndex ===
						action.endVertex.absoluteIndex
					) &&
					!(wallNeighborVertex.absoluteIndex === overWallIndex)
				) {
					action.theme.unvisited(wallNeighborVertex.element);
				}
			}
		} else if (action.startNeighbors.includes(vertexIndex)) {
			overStartRow = vertexRow;
			overStartCol = vertexCol;
			action.theme.end(vertex);
		} else if (action.wallNeighbors.includes(vertexIndex)) {
			overWallRow = vertexRow;
			overWallCol = vertexCol;
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
		overWallRow,
		overWallCol,
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
		isOverWall: false,
	};
};

const clearDragWalls = (state: DragState, action: any): DragState => {
	return {
		...state,
		wallIndices: [],
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
		default:
			return state;
	}
};
