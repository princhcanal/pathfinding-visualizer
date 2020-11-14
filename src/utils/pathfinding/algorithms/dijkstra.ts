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

	for (const vertex in graph.adjacencyList) {
		const vertexIndex = parseInt(vertex);
		distances[vertexIndex] = Infinity;
		previous[vertexIndex] = NaN;
		nodes.enqueue(vertexIndex, Infinity);
	}
	distances[start] = 0;
	previous[start] = NaN;
	nodes.updatePriority(start, 0);

    while (nodes.values.length) {
		const current = nodes.dequeue();

		pathfindingAnimation.push({
			index: current.node,
			state: PathfindingStates.VISITING,
		});

		if (current.node === end) {
			buildPath(
				pathfindingAnimation,
				end,
				previous,
				path,
				start,
				end,
				graph
			);

			break;
		}

		for (const neighbor of graph.adjacencyList[current.node]) {
			const newCost =
				distances[current.node] +
				graph.getEdgeWeight(current.node, neighbor.node);

			if (newCost < distances[neighbor.node]) {
				distances[neighbor.node] = newCost;
				previous[neighbor.node] = current.node;
				nodes.updatePriority(neighbor.node, newCost);
			}
		}
	}

	if (path.length === 0) {
		pathfindingAnimation.push({
			index: 0,
			state: PathfindingStates.NO_PATH,
		});
	}

	return pathfindingAnimation;
};
