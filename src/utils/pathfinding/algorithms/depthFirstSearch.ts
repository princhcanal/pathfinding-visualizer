import { Graph } from './graph';
import * as GraphTypes from './graphTypes';
import { PathfindingStates } from '../pathfindingStates';
import { buildPath } from './buildPath';

export const depthFirstSearch = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let visited: number[] = [];
	let pathfindingAnimations: GraphTypes.PathfindingAnimation[] = [];
	let previous: GraphTypes.Previous = {};
	let path: number[] = [];

	depthFirstSearchUtil(
		graph,
		start,
		end,
		visited,
		pathfindingAnimations,
		previous
	);

	buildPath(pathfindingAnimations, end, previous, path, start, end, graph);

	return pathfindingAnimations;
};

const depthFirstSearchUtil = (
	graph: Graph,
	start: number,
	end: number,
	visited: number[],
	pathfindingAnimations: GraphTypes.PathfindingAnimation[],
	previous: GraphTypes.Previous
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
					pathfindingAnimations,
					previous
				);
				previous[neighbor.node] = start;
			}
		}
	}
};
