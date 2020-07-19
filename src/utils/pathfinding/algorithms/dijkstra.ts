import { Graph } from './graph';
import { PriorityQueue } from './priorityQueue';
import * as GraphTypes from './graphTypes';
import { PathfindingStates } from '../pathfindingStates';
import { buildPath } from './buildPath';

export const dijkstra = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let nodes = new PriorityQueue(graph.numRows, graph.numCols);
	let previous: GraphTypes.Previous = {};
	let distances: GraphTypes.Distances = {};
	let path: number[] = [];
	let pathfindingAnimation: GraphTypes.PathfindingAnimation[] = [];

	nodes.enqueue(start, 0);
	previous[start] = NaN;
	distances[start] = 0;

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
			let newCost = distances[current.node] + neighbor.weight;

			if (
				!(neighbor.node in distances) ||
				newCost < distances[neighbor.node]
			) {
				distances[neighbor.node] = newCost;
				nodes.enqueue(neighbor.node, newCost);
				previous[neighbor.node] = current.node;
			}
		}
	}

	return pathfindingAnimation;
};
