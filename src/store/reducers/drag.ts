import { ActionTypes } from '../actions';
import * as colors from '../../utils/colors';

export interface DragState {
	isStartMouseDown: boolean;
	isEndMouseDown: boolean;
	isMouseDown: boolean;
	wallIndices: number[];
	isDoneAnimating: boolean;
	isRecalculating: boolean;
	isOverStart: boolean;
	isOverEnd: boolean;
	overStartRow: number;
	overStartCol: number;
	overEndRow: number;
	overEndCol: number;
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
	overStartRow: 0,
	overStartCol: 0,
	overEndRow: 0,
	overEndCol: 0,
};

const mouseDown = (state: DragState, action: any): DragState => {
	if (action.isAnimating) return state;

	let vertex = action.e.target;
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));

	if (vertexIndex === action.startVertex.absoluteIndex) {
		return {
			...state,
			isStartMouseDown: true,
		};
	} else if (vertexIndex === action.endVertex.absoluteIndex) {
		return {
			...state,
			isEndMouseDown: true,
		};
	}

	if (state.wallIndices.includes(vertexIndex)) {
		state.wallIndices = state.wallIndices.filter((i) => i !== vertexIndex);
		vertex.style.backgroundColor = '';
	} else {
		state.wallIndices.push(vertexIndex);
		vertex.style.backgroundColor = colors.COLOR_WALL;
	}

	return { ...state, isMouseDown: true };
};

const mouseOver = (state: DragState, action: any): DragState => {
	let vertex = action.e.target;
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
	let isOverStart = false;
	let isOverEnd = false;

	if (state.isStartMouseDown) {
		if (vertexIndex === action.endVertex.absoluteIndex) {
			isOverEnd = true;
		} else {
			if (!action.endNeighbors.includes(vertexIndex)) {
				for (let endNeighborVertex of action.endNeighborsVertices) {
					endNeighborVertex.element.style.background = '';
				}
			}
			vertex.style.background = 'url(car.png) no-repeat center / cover';
		}
	} else if (
		state.isEndMouseDown &&
		vertexIndex !== action.startVertex.absoluteIndex
	) {
		if (vertexIndex === action.startVertex.absoluteIndex) {
			isOverStart = true;
		} else {
			if (!action.startNeighbors.includes(vertexIndex)) {
				for (let startNeighborVertex of action.startNeighborsVertices) {
					startNeighborVertex.element.style.background = '';
				}
			}

			vertex.style.background =
				'url(location.png) no-repeat center / cover';
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
			vertex.style.backgroundColor = '';
		} else {
			state.wallIndices.push(vertexIndex);
			vertex.style.backgroundColor = colors.COLOR_WALL;
		}
	}

	return {
		...state,
		isOverStart,
		isOverEnd,
	};
};

const mouseOut = (state: DragState, action: any): DragState => {
	let vertex = action.e.target;
	let vertexRow = parseInt(vertex.getAttribute('row'));
	let vertexCol = parseInt(vertex.getAttribute('column'));
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
	let overStartRow = 0;
	let overStartCol = 0;
	let overEndRow = 0;
	let overEndCol = 0;
	// let isOverStart = true;
	// let isOverEnd = true;

	if (state.isStartMouseDown) {
		if (vertexIndex === action.endVertex.absoluteIndex) {
			for (let endNeighborVertex of action.endNeighborsVertices) {
				endNeighborVertex.element.style.background = '';
			}

			// isOverEnd = false;
		} else if (action.endNeighbors.includes(vertexIndex)) {
			overEndRow = vertexRow;
			overEndCol = vertexCol;
		} else if (!action.endNeighbors.includes(vertexIndex)) {
			vertex.style.background = '';
		}
	} else if (state.isEndMouseDown) {
		if (vertexIndex === action.startVertex.absoluteIndex) {
			for (let startNeighborVertex of action.startNeighborsVertices) {
				startNeighborVertex.element.style.background = '';
			}

			// isOverStart = false;
		} else if (action.startNeighbors.includes(vertexIndex)) {
			overStartRow = vertexRow;
			overStartCol = vertexCol;
		} else if (!action.startNeighbors.includes(vertexIndex)) {
			vertex.style.background = '';
		}
	}

	return {
		...state,
		overStartRow,
		overStartCol,
		overEndRow,
		overEndCol,
		// isOverStart,
		// isOverEnd,
	};
};

const mouseUp = (state: DragState, action: any): DragState => {
	return {
		...state,
		isStartMouseDown: false,
		isEndMouseDown: false,
		isMouseDown: false,
		isRecalculating: false,
		isOverStart: false,
		isOverEnd: false,
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
