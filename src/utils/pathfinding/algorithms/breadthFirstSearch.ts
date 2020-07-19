import { Graph } from './graph';
import * as GraphTypes from './graphTypes';
import { PathfindingStates } from '../pathfindingStates';
import { buildPath } from './buildPath';

export const breadthFirstSearch = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let nodes: number[] = [];
	nodes.push(start);
	let previous: GraphTypes.Previous = {};
	previous[start] = NaN;
	let path: number[] = [];
	let pathfindingAnimation: GraphTypes.PathfindingAnimation[] = [];

	while (nodes.length) {
		let current = nodes.shift();

		pathfindingAnimation.push({
			index: current as number,
			state: PathfindingStates.VISITING,
		});

		if (current === end) {
			buildPath(
				pathfindingAnimation,
				current,
				previous,
				path,
				start,
				end,
				graph
			);

			break;
		}

		if (current) {
			for (let neighbor of graph.adjacencyList[current]) {
				if (!(neighbor.node in previous)) {
					nodes.push(neighbor.node);
					previous[neighbor.node] = current;
				}
			}
		}
	}

	return pathfindingAnimation;
};
