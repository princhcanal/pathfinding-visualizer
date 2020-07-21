import { GraphTheme } from './index';
import * as Colors from '../colors';

export const defaultTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/car.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/location.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_GRASS;
		vertex.style.backgroundImage = 'url(/tree.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
		vertex.style.cursor = 'url(/treeCursor.png), pointer';
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_WATER;
		vertex.style.backgroundImage = '';
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_TRAFFIC;
		vertex.style.backgroundImage = '';
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_MUD;
		vertex.style.backgroundImage = '';
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.cursor = 'url(/treeCursor.png), pointer';
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_VISITED;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_VISITING;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage =
			'url(/car.png), url(/road-horizontal.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/car.png), url(/road-vertical.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage =
			'url(/location.png), url(/road-horizontal.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage =
			'url(/location.png), url(/road-vertical.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/road-horizontal.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/road-vertical.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	revertObstacle: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
	},
	revertPath: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = '';
	},
};
