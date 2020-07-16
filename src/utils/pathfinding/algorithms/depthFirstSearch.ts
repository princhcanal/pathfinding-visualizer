import { Graph } from './graph';
import * as GraphTypes from './graphTypes';

export const depthFirstSearch = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let visited: number[] = [];
	let pathfindingAnimations: GraphTypes.PathfindingAnimation[] = [];

	depthFirstSearchUtil(graph, start, end, visited, pathfindingAnimations);

	for (let i = 0; i < visited.length; i++) {
		pathfindingAnimations.push({
			index: visited[i],
			state: 'PATH',
		});
	}

	pathfindingAnimations.push({
		index: 0,
		state: 'DONE',
	});

	return pathfindingAnimations;
};

const depthFirstSearchUtil = (
	graph: Graph,
	start: number,
	end: number,
	visited: number[],
	pathfindingAnimations: GraphTypes.PathfindingAnimation[]
) => {
	visited.push(start);

	pathfindingAnimations.push({
		index: start,
		state: 'VISITING',
	});

	for (let neighbor of graph.adjacencyList[start]) {
		if (!visited.includes(end)) {
			if (!visited.includes(neighbor.node)) {
				depthFirstSearchUtil(
					graph,
					neighbor.node,
					end,
					visited,
					pathfindingAnimations
				);
			}
		}
	}
};
