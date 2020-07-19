import { Graph } from './graph';
import { PriorityQueue } from './priorityQueue';
import * as GraphTypes from './graphTypes';
import * as Position from '../../position';
import { PathfindingStates } from '../pathfindingStates';
import { buildPath } from './buildPath';

export const greedyBestFirstSearch = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let nodes = new PriorityQueue(graph.numRows, graph.numCols);
	let previous: GraphTypes.Previous = {};
	let endIndices = Position.absoluteToIndex(
		end,
		graph.numRows,
		graph.numCols
	);
	let endVertex: GraphTypes.Vertex = {
		node: end,
		weight: 1,
		x: endIndices.row,
		y: endIndices.col,
	};
	let visited: number[] = [];
	let pathfindingAnimation: GraphTypes.PathfindingAnimation[] = [];
	let path: number[] = [];

	nodes.enqueue(start, 0);
	previous[start] = NaN;

	visited.push(start);

	while (nodes.values.length) {
		let current = nodes.dequeue();

		pathfindingAnimation.push({
			index: current.node,
			state: PathfindingStates.VISITING,
		});

		if (current.node === end) {
			buildPath(
				pathfindingAnimation,
				current.node,
				previous,
				path,
				start,
				end,
				graph
			);

			break;
		}

		for (let neighbor of graph.adjacencyList[current.node]) {
			if (!(neighbor.node in previous)) {
				let priority = graph.getHeuristic(endVertex, neighbor);
				nodes.enqueue(neighbor.node, priority);
				previous[neighbor.node] = current.node;
			}
		}
	}

	return pathfindingAnimation;
};
