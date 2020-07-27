import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';
import strawhat from './img/strawhat.png';
import treasure from './img/treasure.png';
import kaido from './img/kaido.png';
import kaidoCursor from './img/kaidoCursor.png';
import bigmom from './img/bigmom.png';
import bigmomCursor from './img/bigmomCursor.png';
import shanks from './img/shanks.png';
import shanksCursor from './img/shanksCursor.png';
import blackbeard from './img/blackbeard.png';
import blackbeardCursor from './img/blackbeardCursor.png';
import sunny from './img/sunny.png';

export const onePieceTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${strawhat})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${treasure})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${kaido})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = `url(${kaidoCursor}), pointer`;
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${kaidoCursor}), pointer`;
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${bigmom})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = `url(${bigmomCursor}), pointer`;
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${bigmomCursor}), pointer`;
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${shanks})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = `url(${shanksCursor}), pointer`;
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${shanksCursor}), pointer`;
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${blackbeard})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = `url(${blackbeardCursor}), pointer`;
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${blackbeardCursor}), pointer`;
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_ONEPIECE_RED;
		vertex.style.cursor = `url(${kaidoCursor}), pointer`;
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_YELLOW;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${strawhat})`;
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${strawhat})`;
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${treasure})`;
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${treasure})`;
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${sunny})`;
		vertex.style.backgroundColor = Colors.COLOR_ONEPIECE_RED;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${sunny})`;
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
	wall: 'Kaido (Barrier)',
	obstacle1: 'Big Mom (Weight: 2)',
	obstacle2: 'Shanks (Weight: 3)',
	obstacle3: 'Blackbeard (Weight: 4)',
};
