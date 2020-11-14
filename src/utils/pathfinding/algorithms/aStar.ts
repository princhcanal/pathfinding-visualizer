import { Graph } from './graph';
import { PriorityQueueFast } from './priorityQueue';
import * as GraphTypes from './graphTypes';
import * as Position from '../../position';
import { PathfindingStates } from '../pathfindingStates';
import { buildPath } from './buildPath';

export const aStar = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let nodes = new PriorityQueueFast(graph.numRows, graph.numCols);
	let previous: GraphTypes.Previous = {};
	let distances: GraphTypes.Distances = {};
	let pathfindingAnimation: GraphTypes.PathfindingAnimation[] = [];
	let path: number[] = [];
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
	let foundEnd = false;

	nodes.enqueue(start, 0);
	previous[start] = NaN;
	distances[start] = 0;

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
			const newCost =
				distances[current.node] +
				graph.getEdgeWeight(current.node, neighbor.node);

			const priority = newCost + graph.getHeuristic(neighbor, endVertex);

			if (!(neighbor.node in distances) && !foundEnd) {
				pathfindingAnimation.push({
					index: neighbor.node,
					state: PathfindingStates.VISITING,
				});
				if (neighbor.node === end) {
					foundEnd = true;
				}
			}

			if (
				!(neighbor.node in distances) ||
				newCost < distances[neighbor.node]
			) {
				if (neighbor.node in distances) {
					nodes.updatePriority(neighbor.node, priority);
				} else {
					nodes.enqueue(neighbor.node, priority);
				}
				distances[neighbor.node] = newCost;
				previous[neighbor.node] = current.node;
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
