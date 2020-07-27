import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';
import car from './img/car.png';
import location from './img/location.png';
import carObstacle from './img/carObstacle.png';
import carObstacleCursor from './img/carObstacleCursor.png';
import rain from './img/rain.png';
import rainCursor from './img/rainCursor.png';
import cone from './img/cone.png';
import coneCursor from './img/coneCursor.png';
import hill from './img/hill.png';
import hillCursor from './img/hillCursor.png';
import roadHorizontal from './img/road-horizontal.jpg';
import roadVertical from './img/road-vertical.jpg';

export const carTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${car})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${location})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${carObstacle})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = `url(${carObstacleCursor}), pointer`;
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${carObstacleCursor}), pointer`;
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${rain})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = `url(${rainCursor}), pointer`;
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${rainCursor}), pointer`;
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${cone})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = `url(${coneCursor}), pointer`;
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${coneCursor}), pointer`;
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${hill})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '70%';
		vertex.style.cursor = `url(${hillCursor}), pointer`;
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${hillCursor}), pointer`;
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_WALL;
		vertex.style.cursor = `url(${carObstacleCursor}), pointer`;
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_VISITED;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_VISITING;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${car}), url(${roadHorizontal})`;
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
		vertex.style.cursor = 'grab';
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${car}), url(${roadVertical})`;
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
		vertex.style.cursor = 'grab';
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${location}), url(${roadHorizontal})`;
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
		vertex.style.cursor = 'grab';
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${location}), url(${roadVertical})`;
		vertex.style.backgroundRepeat = 'no-repeat, no-repeat';
		vertex.style.backgroundPosition = 'center, center';
		vertex.style.backgroundSize = '90%, cover';
		vertex.style.cursor = 'grab';
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${roadHorizontal})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${roadVertical})`;
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
	bodyBackground: (body: HTMLBodyElement) => {
		body.style.background = '#fff';
	},
	heading: (heading: HTMLHeadingElement) => {
		heading.style.background = Colors.COLOR_VISITING;
		heading.style.backgroundClip = 'text';
		heading.style.webkitBackgroundClip = 'text';
		heading.style.webkitTextFillColor = 'transparent';
		heading.style.webkitTextStroke = '';
	},
	header: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_WALL;
		div.style.color = Colors.COLOR_VISITING;
		div.style.fontFamily = 'Montserrat, sans-serif';
		div.style.letterSpacing = '';
		div.style.fontSize = '';
	},
	controller: (div: HTMLDivElement) => {
		div.style.color = Colors.COLOR_VISITING;
	},
	button: (button: HTMLButtonElement) => {
		button.style.backgroundColor = 'transparent';
		button.style.color = Colors.COLOR_VISITING;

		if (!is_touch_device()) {
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor = Colors.COLOR_VISITING;
				button.style.color = '#fff';
			});

			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'transparent';
				button.style.color = Colors.COLOR_VISITING;
			});
		}
	},
	dropdown: (heading: HTMLHeadingElement) => {
		heading.style.backgroundColor = Colors.COLOR_VISITING;
		heading.style.color = '#fff';
	},
	options: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_WALL;
	},
	option: (li: HTMLLIElement) => {
		li.style.backgroundColor = 'transparent';
		li.style.color = Colors.COLOR_VISITING;

		if (!is_touch_device()) {
			li.addEventListener('mouseover', () => {
				li.style.backgroundColor = Colors.COLOR_VISITING;
				li.style.color = '#fff';
			});

			li.addEventListener('mouseout', () => {
				li.style.backgroundColor = 'transparent';
				li.style.color = Colors.COLOR_VISITING;
			});
		}
	},
};

export const carObstacleOptions: Obstacle = {
	wall: 'Car (Barrier)',
	obstacle1: 'Rain (Weight: 2)',
	obstacle2: 'Cone (Weight: 3)',
	obstacle3: 'Hill (Weight: 4)',
};
