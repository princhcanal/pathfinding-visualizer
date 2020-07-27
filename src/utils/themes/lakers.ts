import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';
import lakers from './img/lakers.png';
import trophy from './img/trophy.png';
import celtics from './img/celtics.png';
import celticsCursor from './img/celticsCursor.png';
import pistons from './img/pistons.png';
import pistonsCursor from './img/pistonsCursor.png';
import clippers from './img/clippers.png';
import clippersCursor from './img/clippersCursor.png';
import spurs from './img/spurs.png';

export const lakersTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${lakers})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${trophy})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '40%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${celtics})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = `url(${celticsCursor}), pointer`;
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${celticsCursor}), pointer`;
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${pistons})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '140%';
		vertex.style.cursor = `url(${pistonsCursor}), pointer`;
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${pistonsCursor}), pointer`;
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${clippers})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = `url(${clippersCursor}), pointer`;
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${clippersCursor}), pointer`;
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${spurs})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = `url(${spurs}), pointer`;
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${spurs}), pointer`;
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_LAKERS_GOLD;
		vertex.style.cursor = `url(${celticsCursor}), pointer`;
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_GOLD;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_BLACK;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${lakers})`;
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_WHITE;
		vertex.style.cursor = 'grab';
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${lakers})`;
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_WHITE;
		vertex.style.cursor = 'grab';
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${trophy})`;
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_WHITE;
		vertex.style.cursor = 'grab';
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${trophy})`;
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_WHITE;
		vertex.style.cursor = 'grab';
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_WHITE;
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_LAKERS_WHITE;
	},
	revertObstacle: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
	},
	revertPath: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
	},
	bodyBackground: (body: HTMLBodyElement) => {
		body.style.background = Colors.COLOR_LAKERS_PURPLE;
	},
	header: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_LAKERS_PURPLE;
		div.style.color = Colors.COLOR_LAKERS_GOLD;
		div.style.fontFamily = 'Lakers, sans-serif';
		div.style.letterSpacing = '';
		div.style.fontSize = '2rem';
	},
	heading: (heading: HTMLHeadingElement) => {
		heading.style.background = Colors.COLOR_LAKERS_GOLD;
		heading.style.backgroundClip = 'text';
		heading.style.webkitBackgroundClip = 'text';
		heading.style.webkitTextFillColor = 'transparent';
		heading.style.webkitTextStroke = `3px ${Colors.COLOR_LAKERS_BLACK}`;
	},
	controller: (div: HTMLDivElement) => {
		div.style.color = Colors.COLOR_LAKERS_GOLD;
	},
	button: (button: HTMLButtonElement) => {
		button.style.backgroundColor = 'transparent';
		button.style.color = Colors.COLOR_LAKERS_GOLD;

		if (!is_touch_device()) {
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor = Colors.COLOR_LAKERS_GOLD;
				button.style.color = Colors.COLOR_LAKERS_PURPLE;
			});

			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'transparent';
				button.style.color = Colors.COLOR_LAKERS_GOLD;
			});
		}
	},
	dropdown: (heading: HTMLHeadingElement) => {
		heading.style.backgroundColor = Colors.COLOR_LAKERS_GOLD;
		heading.style.color = Colors.COLOR_LAKERS_PURPLE;
	},
	options: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_LAKERS_BLACK;
	},
	option: (li: HTMLLIElement) => {
		li.style.backgroundColor = 'transparent';
		li.style.color = Colors.COLOR_LAKERS_PURPLE;

		if (!is_touch_device()) {
			li.addEventListener('mouseover', () => {
				li.style.backgroundColor = Colors.COLOR_LAKERS_GOLD;
				li.style.color = Colors.COLOR_LAKERS_PURPLE;
			});

			li.addEventListener('mouseout', () => {
				li.style.backgroundColor = 'transparent';
				li.style.color = Colors.COLOR_LAKERS_PURPLE;
			});
		}
	},
};

export const lakersObstacleOptions: Obstacle = {
	wall: 'Celtics (Barrier)',
	obstacle1: 'Pistons (Weight: 2)',
	obstacle2: 'Clippers (Weight: 3)',
	obstacle3: 'Spurs (Weight: 4)',
};
