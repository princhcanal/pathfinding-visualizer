import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';

export const onePieceTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/strawhat.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/treasure.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/kaido.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'url(/img/kaido.png), pointer';
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/kaido.png), pointer';
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/bigmom.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'url(/img/bigmom.png), pointer';
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/bigmom.png), pointer';
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/shanks.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '50%';
		vertex.style.cursor = 'url(/img/shanks.png), pointer';
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/shanks.png), pointer';
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/blackbeard.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '60%';
		vertex.style.cursor = 'url(/img/blackbeard.png), pointer';
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/blackbeard.png), pointer';
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_ONEPIECE_RED;
		vertex.style.cursor = 'url(/img/kaido.png), pointer';
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_YELLOW;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/strawhat.png)';
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/strawhat.png)';
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/treasure.png)';
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/treasure.png)';
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/sunny.png)';
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/sunny.png)';
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
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
		body.style.background = `linear-gradient(to top right, ${Colors.COLOR_ONEPIECE_DARKBLUE}, ${Colors.COLOR_ONEPIECE_LIGHTBLUE})`;
	},
	header: (div: HTMLDivElement) => {
		div.style.backgroundColor = 'transparent';
		div.style.color = Colors.COLOR_ONEPIECE_DARKBLUE;
		div.style.fontFamily = 'One Piece, sans-serif';
		div.style.letterSpacing = '1rem';
		div.style.fontSize = '2rem';
	},
	heading: (heading: HTMLHeadingElement) => {
		heading.style.background = `linear-gradient(to top, ${Colors.COLOR_ONEPIECE_DARKBLUE}, ${Colors.COLOR_ONEPIECE_LIGHTBLUE})`;
		heading.style.backgroundClip = 'text';
		heading.style.webkitBackgroundClip = 'text';
		heading.style.webkitTextFillColor = 'transparent';
		heading.style.webkitTextStroke = `2px ${Colors.COLOR_ONEPIECE_BLACK}`;
	},
	controller: (div: HTMLDivElement) => {
		div.style.color = Colors.COLOR_ONEPIECE_DARKBLUE;
	},
	button: (button: HTMLButtonElement) => {
		button.style.backgroundColor = 'transparent';
		button.style.color = Colors.COLOR_ONEPIECE_DARKBLUE;

		if (!is_touch_device()) {
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor = Colors.COLOR_ONEPIECE_DARKBLUE;
				button.style.color = Colors.COLOR_ONEPIECE_YELLOW;
			});

			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'transparent';
				button.style.color = Colors.COLOR_ONEPIECE_DARKBLUE;
			});
		}
	},
	dropdown: (heading: HTMLHeadingElement) => {
		heading.style.backgroundColor = Colors.COLOR_ONEPIECE_DARKBLUE;
		heading.style.color = Colors.COLOR_ONEPIECE_YELLOW;
	},
	options: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_ONEPIECE_DARKBLUE;
	},
	option: (li: HTMLLIElement) => {
		li.style.backgroundColor = 'transparent';
		li.style.color = Colors.COLOR_ONEPIECE_YELLOW;

		if (!is_touch_device()) {
			li.addEventListener('mouseover', () => {
				li.style.backgroundColor = Colors.COLOR_ONEPIECE_YELLOW;
				li.style.color = Colors.COLOR_ONEPIECE_DARKBLUE;
			});

			li.addEventListener('mouseout', () => {
				li.style.backgroundColor = 'transparent';
				li.style.color = Colors.COLOR_ONEPIECE_YELLOW;
			});
		}
	},
};

export const onePieceObstacleOptions: Obstacle = {
	wall: 'Kaido (Weight: Infinity)',
	obstacle1: 'Big Mom (Weight: 2)',
	obstacle2: 'Shanks (Weight: 3)',
	obstacle3: 'Blackbeard (Weight: 4)',
};
