import { Graph } from './graph';
import * as GraphTypes from './graphTypes';

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
			state: 'VISITING',
		});

		if (current === end) {
			while (previous[current]) {
				path.push(current);
				current = previous[current];
			}
			path.push(start);
			path.reverse();

			for (let i = 0; i < path.length; i++) {
				pathfindingAnimation.push({
					index: path[i],
					state: 'PATH',
				});
			}

			pathfindingAnimation.push({ index: 0, state: 'DONE' });
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
