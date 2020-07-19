import { Graph } from './graph';
import * as GraphTypes from './graphTypes';
import { PathfindingStates } from '../pathfindingStates';

export const depthFirstSearch = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let visited: number[] = [];
	let pathfindingAnimations: GraphTypes.PathfindingAnimation[] = [];

	depthFirstSearchUtil(graph, start, end, visited, pathfindingAnimations);

	for (let i = 0; i < visited.length; i++) {
		if (visited[i] !== start && visited[i] !== end)
			pathfindingAnimations.push({
				index: visited[i],
				state: PathfindingStates.PATH,
			});
	}

	pathfindingAnimations.push({
		index: 0,
		state: PathfindingStates.DONE,
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
		state: PathfindingStates.VISITING,
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
