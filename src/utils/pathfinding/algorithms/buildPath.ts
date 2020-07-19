import { PathfindingAnimation, Previous } from './graphTypes';
import { PathfindingStates } from '../pathfindingStates';
import { Neighbors, getNeighbors, absoluteToIndex } from '../../position';
import { Graph } from './graph';

export const buildPath = (
	pathfindingAnimation: PathfindingAnimation[],
	currentNode: number,
	previous: Previous,
	path: number[],
	start: number,
	end: number,
	graph: Graph
) => {
	while (previous[currentNode] || previous[currentNode] === 0) {
		path.push(currentNode);
		currentNode = previous[currentNode];
	}

	path.push(currentNode);
	path.reverse();

	for (let i = 0; i < path.length; i++) {
		let previousNeighbors: Neighbors = {
			left: -1,
			right: -1,
			top: -1,
			bottom: -1,
		};
		if (i > 0) {
			let previousIndices = absoluteToIndex(
				path[i - 1],
				graph.numRows,
				graph.numCols
			);
			previousNeighbors = getNeighbors(
				path[i - 1],
				previousIndices.row,
				graph.numRows,
				graph.numCols
			);
		}

		let startIndices = absoluteToIndex(
			path[i],
			graph.numRows,
			graph.numCols
		);
		let startNeighbors = getNeighbors(
			path[i],
			startIndices.row,
			graph.numRows,
			graph.numCols
		);
		let endIndices = absoluteToIndex(path[i], graph.numRows, graph.numCols);
		let endNeighbors = getNeighbors(
			path[i],
			endIndices.row,
			graph.numRows,
			graph.numCols
		);

		if (path[i] === start) {
			if (
				path[i + 1] === startNeighbors.left ||
				path[i + 1] === startNeighbors.right
			) {
				pathfindingAnimation.push({
					index: path[i],
					state: PathfindingStates.PATH_HORIZONTAL_START,
				});
			} else if (
				path[i + 1] === startNeighbors.top ||
				path[i + 1] === startNeighbors.bottom
			) {
				pathfindingAnimation.push({
					index: path[i],
					state: PathfindingStates.PATH_VERTICAL_START,
				});
			}
		} else if (path[i] === end) {
			if (
				path[i - 1] === endNeighbors.left ||
				path[i - 1] === endNeighbors.right
			) {
				pathfindingAnimation.push({
					index: path[i],
					state: PathfindingStates.PATH_HORIZONTAL_END,
				});
			} else if (
				path[i - 1] === endNeighbors.top ||
				path[i - 1] === endNeighbors.bottom
			) {
				pathfindingAnimation.push({
					index: path[i],
					state: PathfindingStates.PATH_VERTICAL_END,
				});
			}
		} else if (
			path[i] === previousNeighbors.top ||
			path[i] === previousNeighbors.bottom
		) {
			pathfindingAnimation.push({
				index: path[i],
				state: PathfindingStates.PATH_VERTICAL,
			});
		} else if (
			path[i] === previousNeighbors.left ||
			path[i] === previousNeighbors.right
		) {
			pathfindingAnimation.push({
				index: path[i],
				state: PathfindingStates.PATH_HORIZONTAL,
			});
		} else {
			pathfindingAnimation.push({
				index: path[i],
				state: PathfindingStates.PATH,
			});
		}
	}

	pathfindingAnimation.push({
		index: 0,
		state: PathfindingStates.DONE,
	});
};
