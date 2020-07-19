type GraphManipulation = (vertex: HTMLDivElement) => void;

export type GraphTheme = {
	start: GraphManipulation;
	end: GraphManipulation;
	wall: GraphManipulation;
	unvisited: GraphManipulation;
	visited: GraphManipulation;
	visiting: GraphManipulation;
	pathHorizontalStart: GraphManipulation;
	pathVerticalStart: GraphManipulation;
	pathHorizontalEnd: GraphManipulation;
	pathVerticalEnd: GraphManipulation;
	pathHorizontal: GraphManipulation;
	pathVertical: GraphManipulation;

	revertWall: GraphManipulation;
	revertPath: GraphManipulation;
};

export { defaultTheme } from './default';
