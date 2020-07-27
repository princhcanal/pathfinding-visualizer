import * as algorithms from './algorithms';

type PathfindingAlgorithms = { [key: string]: Function };

export const pathfindingAlgorithms: PathfindingAlgorithms = {
	BreadthFirstSearch: algorithms.breadthFirstSearch,
	Dijkstra: algorithms.dijkstra,
	GreedyBestFirstSearch: algorithms.greedyBestFirstSearch,
	AStar: algorithms.aStar,
	DepthFirstSearch: algorithms.depthFirstSearch,
};
