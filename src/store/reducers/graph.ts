import { ActionTypes } from '../actions';
import { Graph } from '../../utils/pathfinding/algorithms/graph';
import * as Position from '../../utils/position';
import * as colors from '../../utils/colors';
import { RefObject } from 'react';
// import { dijkstra } from '../../utils/pathfinding/algorithms/dijkstra';
// import { breadthFirstSearch } from '../../utils/pathfinding/algorithms/breadthFirstSearch';
// import { greedyBestFirstSearch } from '../../utils/pathfinding/algorithms/greedyBestFirstSearch';
// import { aStar } from '../../utils/pathfinding/algorithms/aStar';
import * as algorithms from '../../utils/pathfinding/algorithms';

export interface GraphState {
	graph: Graph;
	startVertex: Vertex | null;
	endVertex: Vertex | null;
	verticesRef: RefObject<HTMLDivElement> | null;
	numRows: number;
	numCols: number;
	setTimeouts: NodeJS.Timeout[];
	wallIndices: number[];
	isAnimating: boolean;
	currentAlgorithm: Function;
}

export interface Vertex {
	element: HTMLElement;
	row: number;
	column: number;
	absoluteIndex: number;
}

// DEFAULTS
const NUM_ROWS = 20;
const NUM_COLS = 40;
const START_ROW = Math.floor(NUM_ROWS / 2);
const START_COL = Math.floor(NUM_COLS / 4);
const END_ROW = Math.floor(NUM_ROWS / 2) + 4;
const END_COL = Math.floor((NUM_COLS / 4) * 3);

const initialState: GraphState = {
	verticesRef: null,
	startVertex: null,
	endVertex: null,
	graph: new Graph(NUM_ROWS, NUM_COLS),
	numRows: NUM_ROWS,
	numCols: NUM_COLS,
	setTimeouts: [],
	wallIndices: [],
	isAnimating: false,
	currentAlgorithm: algorithms.dijkstra,
};

const setVerticesRef = (state: GraphState, action: any): GraphState => {
	let startVertex = Position.getVertex(
		START_ROW,
		START_COL,
		NUM_ROWS,
		NUM_COLS,
		action.verticesRef
	);
	let endVertex = Position.getVertex(
		END_ROW,
		END_COL,
		NUM_ROWS,
		NUM_COLS,
		action.verticesRef
	);

	return {
		...state,
		verticesRef: action.verticesRef,
		startVertex,
		endVertex,
	};
};

const setStartVertex = (state: GraphState, action: any): GraphState => {
	let startVertex = Position.getVertex(
		action.startRow,
		action.startCol,
		state.numRows,
		state.numCols,
		state.verticesRef as RefObject<HTMLDivElement>
	);

	return {
		...state,
		startVertex,
	};
};

const setEndVertex = (state: GraphState, action: any): GraphState => {
	let endVertex = Position.getVertex(
		action.endRow,
		action.endCol,
		state.numRows,
		state.numCols,
		state.verticesRef as RefObject<HTMLDivElement>
	);

	return {
		...state,
		endVertex,
	};
};

const setWallIndices = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		wallIndices: action.wallIndices,
	};
};

const initGraph = (state: GraphState, action: any): GraphState => {
	let graph = new Graph(state.numRows, state.numCols);

	if (state.startVertex && state.endVertex) {
		state.startVertex.element.style.background =
			'url(car.png) no-repeat center / cover';
		state.endVertex.element.style.background =
			'url(location.png) no-repeat center / cover';
	}

	for (let i = 0; i < state.numRows; i++) {
		for (let j = 0; j < state.numCols; j++) {
			let idx = state.numCols * i + j;
			let vertex = Position.getVertex(
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
				Position.indexToAbsolute(
					i,
					j,
					state.numRows,
					state.numCols
				).toString()
			);

			graph.addVertex(idx);
		}
	}

	for (let i = 0; i < state.numRows; i++) {
		for (let j = 0; j < state.numCols; j++) {
			let idx = state.numCols * i + j;
			let neighbors = Position.getNeighbors(
				idx,
				i,
				state.numRows,
				state.numCols
			);

			// adds right neighbor edge
			if (
				neighbors.right >= 0 &&
				!state.wallIndices.includes(neighbors.right)
			) {
				graph.addEdge(idx, neighbors.right, 1);
			}

			// adds left neighbor edge
			if (
				neighbors.left >= 0 &&
				!state.wallIndices.includes(neighbors.left)
			) {
				graph.addEdge(idx, neighbors.left, 1);
			}

			// adds bottom neighbor edge
			if (
				neighbors.bottom >= 0 &&
				!state.wallIndices.includes(neighbors.bottom)
			) {
				graph.addEdge(idx, neighbors.bottom, 1);
			}

			// adds top neighbor edge
			if (
				neighbors.top >= 0 &&
				!state.wallIndices.includes(neighbors.top)
			) {
				graph.addEdge(idx, neighbors.top, 1);
			}
		}
	}

	return {
		...state,
		graph,
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
			let vertex = Position.getVertex(
				i,
				j,
				state.numRows,
				state.numCols,
				action.verticesRef
			);

			if (state.wallIndices.includes(vertex.absoluteIndex)) {
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
			let vertex = Position.getVertex(
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

const setCurrentAlgorithm = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		currentAlgorithm: action.currentAlgorithm,
	};
};

const recalculatePath = (state: GraphState, action: any): void => {
	let animations = state.currentAlgorithm(
		state.graph,
		action.start,
		action.end
	);

	for (let i = 0; i < animations.length; i++) {
		let animation = animations[i];
		let vertices = action.verticesRef.current;
		let row = Math.floor(animation.index / state.numCols);
		let column = animation.index % state.numCols;
		let vertex = Position.getVertex(
			row,
			column,
			state.numRows,
			state.numCols,
			action.verticesRef
		);

		if (animation.state === 'VISITING') {
			vertex.element.style.backgroundColor = colors.COLOR_VISITING;
			if (i > 0) {
				let prevAnimation = animations[i - 1];
				let prevRow = Math.floor(prevAnimation.index / state.numCols);
				let prevColumn = prevAnimation.index % state.numCols;
				let prevVertex: Vertex;
				if (vertices) {
					prevVertex = Position.getVertex(
						prevRow,
						prevColumn,
						state.numRows,
						state.numCols,
						action.verticesRef
					);
					prevVertex.element.style.backgroundColor =
						colors.COLOR_VISITED;
				}
			}
		} else if (animation.state === 'PATH') {
			vertex.element.style.backgroundColor = colors.COLOR_PATH;
		} else if (animation.state === 'DONE') {
		}
	}
};

export const graphReducer = (
	state: GraphState = initialState,
	action: any
): GraphState => {
	switch (action.type) {
		case ActionTypes.INIT_GRAPH:
			return initGraph(state, action);
		case ActionTypes.SET_VERTICES_REF:
			return setVerticesRef(state, action);
		case ActionTypes.SET_START_VERTEX:
			return setStartVertex(state, action);
		case ActionTypes.SET_END_VERTEX:
			return setEndVertex(state, action);
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
		case ActionTypes.RECALCULATE_PATH:
			recalculatePath(state, action);
			return state;
		case ActionTypes.SET_CURRENT_ALGORITHM:
			return setCurrentAlgorithm(state, action);
		default:
			return state;
	}
};
