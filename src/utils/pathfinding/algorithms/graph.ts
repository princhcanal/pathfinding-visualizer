import * as Position from '../../position';
import * as GraphTypes from './graphTypes';

export class Graph {
	adjacencyList: GraphTypes.AdjacencyList;

	constructor(public numRows: number, public numCols: number) {
		this.adjacencyList = {};
	}

	addVertex(vertex: number) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	addEdge(vertex1: number, vertex2: number, weight: number = 1) {
		let indices = Position.absoluteToIndex(
			vertex2,
			this.numRows,
			this.numCols
		);

		this.adjacencyList[vertex1].push({
			node: vertex2,
			weight,
			x: indices.row,
			y: indices.col,
		});
	}

	getHeuristic(vertex1: GraphTypes.Vertex, vertex2: GraphTypes.Vertex) {
		return (
			Math.abs(vertex1.x - vertex2.x) + Math.abs(vertex1.y - vertex2.y)
		);
	}
}
