type GraphManipulation = (vertex: HTMLDivElement) => void;

export type GraphTheme = {
	start: GraphManipulation;
	end: GraphManipulation;
	wall: GraphManipulation;
	obstacle1: GraphManipulation;
	obstacle2: GraphManipulation;
	obstacle3: GraphManipulation;
	unvisited: GraphManipulation;
	visited: GraphManipulation;
	visiting: GraphManipulation;
	pathHorizontalStart: GraphManipulation;
	pathVerticalStart: GraphManipulation;
	pathHorizontalEnd: GraphManipulation;
	pathVerticalEnd: GraphManipulation;
	pathHorizontal: GraphManipulation;
	pathVertical: GraphManipulation;

	revertObstacle: GraphManipulation;
	revertPath: GraphManipulation;
};

export { defaultTheme } from './default';
