import { Graph } from './graph';
import { PriorityQueue } from './priorityQueue';
import * as GraphTypes from './graphTypes';
import * as Position from '../../position';

export const aStar = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let nodes = new PriorityQueue(graph.numRows, graph.numCols);
	let previous: GraphTypes.Previous = {};
	let distances: GraphTypes.Distances = {};
	let visited: number[] = [];
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

	nodes.enqueue(start, 0);
	previous[start] = NaN;
	distances[start] = 0;
	visited.push(start);

	while (nodes.values.length) {
		let current = nodes.dequeue();

		pathfindingAnimation.push({
			index: current.node,
			state: 'VISITING',
		});

		if (current.node === end) {
			let currentNode = current.node;
			while (previous[currentNode]) {
				path.push(currentNode);
				currentNode = previous[currentNode];
			}

			path.push(currentNode);
			path.reverse();

			for (let i = 0; i < path.length; i++) {
				pathfindingAnimation.push({
					index: path[i],
					state: 'PATH',
				});
			}

			pathfindingAnimation.push({
				index: 0,
				state: 'DONE',
			});

			break;
		}

		for (let neighbor of graph.adjacencyList[current.node]) {
			let newCost = distances[current.node] + neighbor.weight;
			let priority = newCost + graph.getHeuristic(endVertex, neighbor);

			if (
				!(neighbor.node in distances) ||
				newCost < distances[neighbor.node]
			) {
				distances[neighbor.node] = newCost;
				nodes.enqueue(neighbor.node, priority);
				previous[neighbor.node] = current.node;
			}
		}
	}

	return pathfindingAnimation;
};
