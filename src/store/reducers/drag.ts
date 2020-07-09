import { ActionTypes } from '../actions';
import * as position from '../../utils/position';
import * as colors from '../../utils/colors';

export interface DragState {
	isStartMouseDown: boolean;
	isEndMouseDown: boolean;
}

const initialState: DragState = {
	isStartMouseDown: false,
	isEndMouseDown: false,
};

const mouseDown = (state: DragState, action: any): DragState => {
	let vertex = action.e.target;
	let vertexIndex = vertex.getAttribute('absoluteIndex');

	if (
		parseInt(vertexIndex) ===
		position.indexToAbsolute(
			action.startRow,
			action.startCol,
			action.numRows,
			action.numCols
		)
	) {
		return {
			...state,
			isStartMouseDown: true,
		};
	} else if (
		parseInt(vertexIndex) ===
		position.indexToAbsolute(
			action.endRow,
			action.endCol,
			action.numRows,
			action.numCols
		)
	) {
		return {
			...state,
			isEndMouseDown: true,
		};
	}

	return state;
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
		vertex.style.backgroundColor = colors.COLOR_START;
	} else if (state.isEndMouseDown && vertexIndex !== start.absoluteIndex) {
		vertex.style.backgroundColor = colors.COLOR_END;
	}
};

const mouseOut = (state: DragState, action: any) => {
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
		default:
			return state;
	}
};
