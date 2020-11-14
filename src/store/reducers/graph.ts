import { ActionTypes } from '../actions';
import { Graph } from '../../utils/pathfinding/algorithms/graph';
import * as Position from '../../utils/position';
import { RefObject } from 'react';
import * as algorithms from '../../utils/pathfinding/algorithms';
import { GraphTheme, themes } from '../../utils/themes';
import { PathfindingStates } from '../../utils/pathfinding/pathfindingStates';

export interface GraphState {
	graph: Graph;
	startVertex: Vertex | null;
	endVertex: Vertex | null;
	verticesRef: RefObject<HTMLDivElement> | null;
	numRows: number;
	numCols: number;
	setTimeouts: NodeJS.Timeout[];
	wallIndices: number[];
	obstacle1Indices: number[];
	obstacle2Indices: number[];
	obstacle3Indices: number[];
	isAnimating: boolean;
	currentAlgorithm: Function;
	theme: GraphTheme;
}

export interface Vertex {
	element: HTMLDivElement;
	row: number;
	column: number;
	absoluteIndex: number;
}

// DEFAULTS
const NUM_ROWS = 11;
const NUM_COLS = 5;

const initialState: GraphState = {
	verticesRef: null,
	startVertex: null,
	endVertex: null,
	graph: new Graph(NUM_ROWS, NUM_COLS),
	numRows: NUM_ROWS,
	numCols: NUM_COLS,
	setTimeouts: [],
	wallIndices: [],
	obstacle1Indices: [],
	obstacle2Indices: [],
	obstacle3Indices: [],
	isAnimating: false,
	currentAlgorithm: algorithms.dijkstra,
	theme: themes['car'],
};

const setVerticesRef = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		verticesRef: action.verticesRef,
	};
};

const setStartVertex = (state: GraphState, action: any): GraphState => {
	let startVertex = Position.getVertex(
		action.startRow,
		action.startCol,
		state.numRows,
		state.numCols,
		action.verticesRef
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
		action.verticesRef
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

const setObstacle1Indices = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		obstacle1Indices: action.obstacle1Indices,
	};
};

const setObstacle2Indices = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		obstacle2Indices: action.obstacle2Indices,
	};
};

const setObstacle3Indices = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		obstacle3Indices: action.obstacle3Indices,
	};
};

const setNumRows = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		numRows: action.numRows,
	};
};

const setNumCols = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		numCols: action.numCols,
	};
};

const setTheme = (state: GraphState, action: any): GraphState => {
	return {
		...state,
		theme: action.theme,
	};
};

const initGraph = (state: GraphState, action: any): GraphState => {
	let graph = new Graph(state.numRows, state.numCols);

	if (state.startVertex && state.endVertex && !action.isSettingWalls) {
		state.theme.start(state.startVertex.element);
		state.theme.end(state.endVertex.element);
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
			let weight = 1;

			// adds right neighbor edge
			if (
				neighbors.right >= 0 &&
				!state.wallIndices.includes(neighbors.right)
			) {
				if (state.obstacle1Indices.includes(neighbors.right)) {
					weight = 2;
				} else if (state.obstacle2Indices.includes(neighbors.right)) {
					weight = 3;
				} else if (state.obstacle3Indices.includes(neighbors.right)) {
					weight = 4;
				}
				graph.addEdge(idx, neighbors.right, weight);
			}

			// adds left neighbor edge
			if (
				neighbors.left >= 0 &&
				!state.wallIndices.includes(neighbors.left)
			) {
				if (state.obstacle1Indices.includes(neighbors.left)) {
					weight = 2;
				} else if (state.obstacle2Indices.includes(neighbors.left)) {
					weight = 3;
				} else if (state.obstacle3Indices.includes(neighbors.left)) {
					weight = 4;
				}
				graph.addEdge(idx, neighbors.left, weight);
			}

			// adds bottom neighbor edge
			if (
				neighbors.bottom >= 0 &&
				!state.wallIndices.includes(neighbors.bottom)
			) {
				if (state.obstacle1Indices.includes(neighbors.bottom)) {
					weight = 2;
				} else if (state.obstacle2Indices.includes(neighbors.bottom)) {
					weight = 3;
				} else if (state.obstacle3Indices.includes(neighbors.bottom)) {
					weight = 4;
				}
				graph.addEdge(idx, neighbors.bottom, weight);
			}

			// adds top neighbor edge
			if (
				neighbors.top >= 0 &&
				!state.wallIndices.includes(neighbors.top)
			) {
				if (state.obstacle1Indices.includes(neighbors.top)) {
					weight = 2;
				} else if (state.obstacle2Indices.includes(neighbors.top)) {
					weight = 3;
				} else if (state.obstacle3Indices.includes(neighbors.top)) {
					weight = 4;
				}
				graph.addEdge(idx, neighbors.top, weight);
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
				state.theme.wall(vertex.element);
			} else if (state.obstacle1Indices.includes(vertex.absoluteIndex)) {
				state.theme.obstacle1(vertex.element);
			} else if (state.obstacle2Indices.includes(vertex.absoluteIndex)) {
				state.theme.obstacle2(vertex.element);
			} else if (state.obstacle3Indices.includes(vertex.absoluteIndex)) {
				state.theme.obstacle3(vertex.element);
			} else if (
				vertex.absoluteIndex === state.startVertex?.absoluteIndex
			) {
				if (action.isRecalculating) {
					state.theme.unvisited(vertex.element);
				} else {
					state.theme.start(vertex.element);
				}
			} else if (
				vertex.absoluteIndex === state.endVertex?.absoluteIndex
			) {
				if (action.isRecalculating) {
					state.theme.unvisited(vertex.element);
				} else {
					state.theme.end(vertex.element);
				}
			} else if (
				vertex.absoluteIndex !== action.start &&
				vertex.absoluteIndex !== action.end
			) {
				state.theme.unvisited(vertex.element);
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

			if (
				state.wallIndices.includes(vertex.absoluteIndex) ||
				state.obstacle1Indices.includes(vertex.absoluteIndex) ||
				state.obstacle2Indices.includes(vertex.absoluteIndex) ||
				state.obstacle3Indices.includes(vertex.absoluteIndex)
			) {
				state.theme.revertObstacle(vertex.element);
			}
		}
	}

	return {
		...state,
		wallIndices: [],
		obstacle1Indices: [],
		obstacle2Indices: [],
		obstacle3Indices: [],
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
		let row = Math.floor(animation.index / state.numCols);
		let column = animation.index % state.numCols;
		let vertex = Position.getVertex(
			row,
			column,
			state.numRows,
			state.numCols,
			action.verticesRef
		);

		if (animation.state === PathfindingStates.VISITING) {
			state.theme.visiting(vertex.element);
			if (i > 0) {
				let prevAnimation = animations[i - 1];
				let prevRow = Math.floor(prevAnimation.index / state.numCols);
				let prevColumn = prevAnimation.index % state.numCols;
				let prevVertex: Vertex;
				prevVertex = Position.getVertex(
					prevRow,
					prevColumn,
					state.numRows,
					state.numCols,
					action.verticesRef
				);
				state.theme.visited(prevVertex.element);
			}
		} else if (
			animation.state === PathfindingStates.PATH_HORIZONTAL_START
		) {
			state.theme.pathHorizontalStart(vertex.element);
		} else if (animation.state === PathfindingStates.PATH_VERTICAL_START) {
			state.theme.pathVerticalStart(vertex.element);
		} else if (animation.state === PathfindingStates.PATH_HORIZONTAL_END) {
			state.theme.pathHorizontalEnd(vertex.element);
		} else if (animation.state === PathfindingStates.PATH_VERTICAL_END) {
			state.theme.pathVerticalEnd(vertex.element);
		} else if (animation.state === PathfindingStates.PATH_HORIZONTAL) {
			state.theme.pathHorizontal(vertex.element);
		} else if (animation.state === PathfindingStates.PATH_VERTICAL) {
			state.theme.pathVertical(vertex.element);
		} else if (animation.state === PathfindingStates.DONE) {
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
		case ActionTypes.SET_NUM_ROWS:
			return setNumRows(state, action);
		case ActionTypes.SET_NUM_COLS:
			return setNumCols(state, action);
		case ActionTypes.SET_OBSTACLE_1_INDICES:
			return setObstacle1Indices(state, action);
		case ActionTypes.SET_OBSTACLE_2_INDICES:
			return setObstacle2Indices(state, action);
		case ActionTypes.SET_OBSTACLE_3_INDICES:
			return setObstacle3Indices(state, action);
		case ActionTypes.SET_THEME:
			return setTheme(state, action);
		default:
			return state;
	}
};
