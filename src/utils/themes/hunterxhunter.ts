import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';
import gon from './img/gon.png';
import ging from './img/ging.png';
import hisoka from './img/hisoka.png';
import hisokaCursor from './img/hisokaCursor.png';
import troupe from './img/troupe.png';
import troupeCursor from './img/troupeCursor.png';
import razor from './img/razor.png';
import razorCursor from './img/razorCursor.png';
import meruem from './img/meruem.png';
import meruemCursor from './img/meruemCursor.png';

export const hunterxhunterTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${gon})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%;';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${ging})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${hisoka})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = `url(${hisokaCursor}), pointer`;
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${hisokaCursor}), pointer`;
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${troupe})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = `url(${troupeCursor}), pointer`;
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${troupeCursor}), pointer`;
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${razor})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '40%';
		vertex.style.cursor = `url(${razorCursor}), pointer`;
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${razorCursor}), pointer`;
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${meruem})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '70%';
		vertex.style.cursor = `url(${meruemCursor}), pointer`;
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${meruemCursor}), pointer`;
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_HUNTERXHUNTER_GREEN;
		vertex.style.cursor = `url(${hisokaCursor}), pointer`;
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_GREEN;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${gon})`;
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${gon})`;
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${ging})`;
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${ging})`;
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	revertObstacle: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
	},
	revertPath: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
	},
	bodyBackground: (body: HTMLBodyElement) => {
		body.style.background = `linear-gradient(to top, ${Colors.COLOR_HUNTERXHUNTER_DARK_BROWN}, ${Colors.COLOR_HUNTERXHUNTER_BROWN})`;
	},
	header: (div: HTMLDivElement) => {
		div.style.backgroundColor = 'transparent';
		div.style.color = Colors.COLOR_HUNTERXHUNTER_WHITE;
		div.style.fontFamily = 'Arial, sans-serif';
		div.style.letterSpacing = '';
		div.style.fontSize = '2rem';
	},
	heading: (heading: HTMLHeadingElement) => {
		heading.style.background = `linear-gradient(to top, ${Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE}, ${Colors.COLOR_HUNTERXHUNTER_LIGHT_ORANGE})`;
		heading.style.backgroundClip = 'text';
		heading.style.webkitBackgroundClip = 'text';
		heading.style.webkitTextFillColor = 'transparent';
		heading.style.webkitTextStroke = `4px ${Colors.COLOR_HUNTERXHUNTER_MAROON}`;
	},
	controller: (div: HTMLDivElement) => {
		div.style.color = Colors.COLOR_HUNTERXHUNTER_LIGHT_ORANGE;
	},
	button: (button: HTMLButtonElement) => {
		button.style.backgroundColor = 'transparent';
		button.style.color = Colors.COLOR_HUNTERXHUNTER_LIGHT_ORANGE;

		if (!is_touch_device()) {
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor =
					Colors.COLOR_HUNTERXHUNTER_LIGHT_ORANGE;
				button.style.color = Colors.COLOR_HUNTERXHUNTER_WHITE;
			});

			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'transparent';
				button.style.color = Colors.COLOR_HUNTERXHUNTER_LIGHT_ORANGE;
			});
		}
	},
	dropdown: (heading: HTMLHeadingElement) => {
		heading.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_GREEN;
		heading.style.color = Colors.COLOR_HUNTERXHUNTER_WHITE;
	},
	options: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_DARK_ORANGE;
	},
	option: (li: HTMLLIElement) => {
		li.style.backgroundColor = 'transparent';
		li.style.color = Colors.COLOR_HUNTERXHUNTER_WHITE;

		if (!is_touch_device()) {
			li.addEventListener('mouseover', () => {
				li.style.backgroundColor = Colors.COLOR_HUNTERXHUNTER_GREEN;
				li.style.color = Colors.COLOR_HUNTERXHUNTER_WHITE;
			});

			li.addEventListener('mouseout', () => {
				li.style.backgroundColor = 'transparent';
				li.style.color = Colors.COLOR_HUNTERXHUNTER_WHITE;
			});
		}
	},
};

export const hunterxhunterObstacleOptions: Obstacle = {
	wall: 'Hisoka (Barrier)',
	obstacle1: 'Phantom Troupe (Weight: 2)',
	obstacle2: 'Razor (Weight: 3)',
	obstacle3: 'Meruem (Weight: 4)',
};
