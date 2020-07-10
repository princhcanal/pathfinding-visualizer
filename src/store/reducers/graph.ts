import { ActionTypes } from '../actions';
import WeightedGraph from '../../utils/pathfinding/algorithms/dijkstra';
import * as position from '../../utils/position';
import * as colors from '../../utils/colors';

export interface GraphState {
	graph: WeightedGraph;
	numRows: number;
	numCols: number;
	startRow: number;
	startCol: number;
	endRow: number;
	endCol: number;
	setTimeouts: NodeJS.Timeout[];
	wallIndices: number[];
	isAnimating: boolean;
}

interface Vertex {
	element: HTMLElement;
	row: number;
	column: number;
	absoluteIndex: number;
}

const NUM_ROWS = 20;
const NUM_COLS = 40;
const START_ROW = Math.floor(NUM_ROWS / 2);
const START_COL = Math.floor(NUM_COLS / 4);
const END_ROW = Math.floor(NUM_ROWS / 2) + 4;
const END_COL = Math.floor((NUM_COLS / 4) * 3);

const initialState: GraphState = {
	graph: new WeightedGraph(),
	numRows: NUM_ROWS,
	numCols: NUM_COLS,
	startRow: START_ROW,
	startCol: START_COL,
	endRow: END_ROW,
	endCol: END_COL,
	setTimeouts: [],
	wallIndices: [],
	isAnimating: false,
};

const setStartRow = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		startRow: action.row,
	};
};

const setStartCol = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		startCol: action.col,
	};
};
const setEndRow = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		endRow: action.row,
	};
};

const setEndCol = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		endCol: action.col,
	};
};

const setWallIndices = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		wallIndices: action.wallIndices,
	};
};

const initGraph = (state: GraphState, action: any): GraphState => {
	let graph = new WeightedGraph();
	let startVertex: Vertex = position.getVertex(
		state.startRow,
		state.startCol,
		state.numRows,
		state.numCols,
		action.verticesRef
	);
	let endVertex: Vertex = position.getVertex(
		state.endRow,
		state.endCol,
		state.numRows,
		state.numCols,
		action.verticesRef
	);

	startVertex.element.style.backgroundColor = colors.COLOR_START;
	// startVertex.element.children[0].setAttribute('src', 'car.png');
	endVertex.element.style.backgroundColor = colors.COLOR_END;
	// endVertex.element.children[0].setAttribute('src', 'location.png');

	for (let i = 0; i < state.numRows; i++) {
		for (let j = 0; j < state.numCols; j++) {
			let idx = state.numCols * i + j;
			let vertex = position.getVertex(
				i,
				j,
				state.numRows,
				state.numCols,
				action.verticesRef
			);

			vertex.element.setAttribute('row', i.toString());
			vertex.element.setAttribute('column', j.toString());
			vertex.element.setAttribute(
				'absoluteIndex',
				position
					.indexToAbsolute(i, j, state.numRows, state.numCols)
					.toString()
			);

			graph.addVertex(idx);
		}
	}

	for (let i = 0; i < state.numRows; i++) {
		for (let j = 0; j < state.numCols; j++) {
			let idx = state.numCols * i + j;
			let leftNeighbor = idx - 1;
			let rightNeighbor = idx + 1;
			let topNeighbor = idx - state.numCols;
			let bottomNeighbor = idx + state.numCols;

			// adds left neighbor edge
			if (
				leftNeighbor !== state.numCols * i - 1 &&
				!state.wallIndices.includes(leftNeighbor)
			) {
				graph.addEdge(idx, leftNeighbor, 1);
			}

			// adds right neighbor edge
			if (
				rightNeighbor !== state.numCols * (i + 1) &&
				!state.wallIndices.includes(rightNeighbor)
			) {
				graph.addEdge(idx, rightNeighbor, 1);
			}

			// adds top neighbor edge
			if (topNeighbor >= 0 && !state.wallIndices.includes(topNeighbor)) {
				graph.addEdge(idx, topNeighbor, 1);
			}

			// adds bottom neighbor edge
			if (
				bottomNeighbor < state.numRows * state.numCols &&
				!state.wallIndices.includes(bottomNeighbor)
			) {
				graph.addEdge(idx, bottomNeighbor, 1);
			}
		}
	}

	return {
		...state,
		graph: graph,
	};
};

const clearTimeouts = (state: GraphState, action: any): void => {
	for (let timeout of state.setTimeouts) {
		clearTimeout(timeout);
	}
};

const clearPath = (state: GraphState, action: any): void => {
	clearTimeouts(state, action);

	for (let i = 0; i < state.numRows; i++) {
		for (let j = 0; j < state.numCols; j++) {
			let vertex = position.getVertex(
				i,
				j,
				state.numRows,
				state.numCols,
				action.verticesRef
			);
			if (i === state.startRow && j === state.startCol) {
				vertex.element.style.backgroundColor = colors.COLOR_START;
			} else if (i === state.endRow && j === state.endCol) {
				vertex.element.style.backgroundColor = colors.COLOR_END;
			} else if (state.wallIndices.includes(vertex.absoluteIndex)) {
				vertex.element.style.backgroundColor = colors.COLOR_WALL;
			} else {
				vertex.element.style.backgroundColor = '';
			}
		}
	}
};

const clearWalls = (state: GraphState, action: any): GraphState => {
	if (state.isAnimating) return state;

	for (let i = 0; i < state.numRows; i++) {
		for (let j = 0; j < state.numCols; j++) {
			let vertex = position.getVertex(
				i,
				j,
				state.numRows,
				state.numCols,
				action.verticesRef
			);

			if (state.wallIndices.includes(vertex.absoluteIndex)) {
				vertex.element.style.backgroundColor = '';
			}
		}
	}

	return {
		...state,
		wallIndices: [],
	};
};

const setIsAnimating = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		isAnimating: action.isAnimating,
	};
};

export const graphReducer = (
	state: GraphState = initialState,
	action: any
): GraphState => {
	switch (action.type) {
		case ActionTypes.INIT_GRAPH:
			return initGraph(state, action);
		case ActionTypes.SET_START_ROW:
			return setStartRow(state, action);
		case ActionTypes.SET_START_COL:
			return setStartCol(state, action);
		case ActionTypes.SET_END_ROW:
			return setEndRow(state, action);
		case ActionTypes.SET_END_COL:
			return setEndCol(state, action);
		case ActionTypes.CLEAR_TIMEOUTS:
			clearTimeouts(state, action);
			return state;
		case ActionTypes.CLEAR_PATH:
			clearPath(state, action);
			return state;
		case ActionTypes.SET_WALL_INDICES:
			return setWallIndices(state, action);
		case ActionTypes.CLEAR_WALLS:
			return clearWalls(state, action);
		case ActionTypes.SET_IS_ANIMATING:
			return setIsAnimating(state, action);
		default:
			return state;
	}
};
