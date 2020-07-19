import { GraphTheme } from './index';
import * as Colors from '../colors';

export const defaultTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/car.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/location.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_GRASS;
		vertex.style.backgroundImage = 'url(/tree.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
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
		vertex.style.backgroundSize = 'cover, cover';
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/car.png), url(/road-vertical.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = 'cover, cover';
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage =
			'url(/location.png), url(/road-horizontal.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = 'cover, cover';
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage =
			'url(/location.png), url(/road-vertical.jpg)';
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = 'cover, cover';
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
	revertWall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
	},
	revertPath: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = '';
	},
};
