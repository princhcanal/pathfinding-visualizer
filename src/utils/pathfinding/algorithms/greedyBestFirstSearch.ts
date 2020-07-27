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
	let foundEnd = false;

	nodes.enqueue(start, 0);
	previous[start] = NaN;

	visited.push(start);

	pathfindingAnimation.push({
		index: start,
		state: PathfindingStates.VISITING,
	});

	while (nodes.values.length) {
		let current = nodes.dequeue();

		// pathfindingAnimation.push({
		// 	index: current.node,
		// 	state: PathfindingStates.VISITING,
		// });

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

		for (const neighbor of graph.adjacencyList[current.node]) {
			if (!(neighbor.node in previous)) {
				if (!foundEnd) {
					pathfindingAnimation.push({
						index: neighbor.node,
						state: PathfindingStates.VISITING,
					});
					if (neighbor.node === end) {
						foundEnd = true;
					}
				}

				const priority = graph.getHeuristic(neighbor, endVertex);
				previous[neighbor.node] = current.node;
				nodes.enqueue(neighbor.node, priority);
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
