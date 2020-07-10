import { ActionTypes } from '../actions';
import * as position from '../../utils/position';
import * as colors from '../../utils/colors';

export interface DragState {
	isStartMouseDown: boolean;
	isEndMouseDown: boolean;
	isMouseDown: boolean;
	wallIndices: number[];
	isDoneAnimating: boolean;
}

const initialState: DragState = {
	isStartMouseDown: false,
	isEndMouseDown: false,
	isMouseDown: false,
	wallIndices: [],
	isDoneAnimating: false,
};

const mouseDown = (state: DragState, action: any): DragState => {
	if (action.isAnimating) return state;

	let vertex = action.e.target;
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
	let startVertexIndex = position.indexToAbsolute(
		action.startRow,
		action.startCol,
		action.numRows,
		action.numCols
	);
	let endVertexIndex = position.indexToAbsolute(
		action.endRow,
		action.endCol,
		action.numRows,
		action.numCols
	);

	if (vertexIndex === startVertexIndex) {
		return {
			...state,
			isStartMouseDown: true,
		};
	} else if (vertexIndex === endVertexIndex) {
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

const mouseOver = (state: DragState, action: any) => {
	let vertex = action.e.target;
	let vertexIndex = parseInt(vertex.getAttribute('absoluteIndex'));
	let start = position.getVertex(
		action.startRow,
		action.startCol,
		action.numRows,
		action.numCols,
		action.verticesRef
	);
	let end = position.getVertex(
		action.endRow,
		action.endCol,
		action.numRows,
		action.numCols,
		action.verticesRef
	);

	if (state.isStartMouseDown && vertexIndex !== end.absoluteIndex) {
		if (state.isDoneAnimating) {
		} else {
			vertex.style.backgroundColor = colors.COLOR_START;
		}
	} else if (state.isEndMouseDown && vertexIndex !== start.absoluteIndex) {
		if (state.isDoneAnimating) {
		} else {
			vertex.style.backgroundColor = colors.COLOR_END;
		}
	} else if (
		state.isMouseDown &&
		vertexIndex !== start.absoluteIndex &&
		vertexIndex !== end.absoluteIndex
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
};

const mouseOut = (state: DragState, action: any): void => {
	let vertex = action.e.target;
	let start = position.getVertex(
		action.startRow,
		action.startCol,
		action.numRows,
		action.numCols,
		action.verticesRef
	);
	let end = position.getVertex(
		action.endRow,
		action.endCol,
		action.numRows,
		action.numCols,
		action.verticesRef
	);

	if (state.isStartMouseDown && vertex !== end.element) {
		vertex.style.backgroundColor = '';
	} else if (state.isEndMouseDown && vertex !== start.element) {
		vertex.style.backgroundColor = '';
	}
};

const mouseUp = (state: DragState, action: any): DragState => {
	return {
		...state,
		isStartMouseDown: false,
		isEndMouseDown: false,
		isMouseDown: false,
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

export const dragReducer = (
	state: DragState = initialState,
	action: any
): DragState => {
	switch (action.type) {
		case ActionTypes.MOUSE_DOWN:
			return mouseDown(state, action);
		case ActionTypes.MOUSE_OVER:
			mouseOver(state, action);
			return state;
		case ActionTypes.MOUSE_OUT:
			mouseOut(state, action);
			return state;
		case ActionTypes.MOUSE_UP:
			return mouseUp(state, action);
		case ActionTypes.CLEAR_DRAG_WALLS:
			return clearDragWalls(state, action);
		case ActionTypes.SET_IS_DONE_ANIMATING:
			return setIsDoneAnimating(state, action);
		default:
			return state;
	}
};
