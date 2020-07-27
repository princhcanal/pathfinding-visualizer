import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';
import holly from './img/holly.jpg';
import michael from './img/michael.png';
import gasStation from './img/gasStation.png';
import gasStationCursor from './img/gasStationCursor.png';
import phone from './img/phone.png';
import phoneCursor from './img/phoneCursor.png';
import chineseFood from './img/chineseFood.png';
import chineseFoodCursor from './img/chineseFoodCursor.png';
import building from './img/building.png';
import buildingCursor from './img/buildingCursor.png';

export const theOfficeTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${holly})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${michael})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${gasStation})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = 'cover';
		vertex.style.cursor = `url(${gasStationCursor}), pointer`;
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${gasStationCursor}), pointer`;
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${phone})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = `url(${phoneCursor}), pointer`;
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${phoneCursor}), pointer`;
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${chineseFood})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = `url(${chineseFoodCursor}), pointer`;
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${chineseFoodCursor}), pointer`;
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${building})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '60%';
		vertex.style.cursor = `url(${buildingCursor}), pointer`;
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${buildingCursor}), pointer`;
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_THEOFFICE_WHITE;
		vertex.style.cursor = `url(${gasStationCursor}), pointer`;
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_WHITE;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_BLUE;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${holly})`;
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${holly})`;
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${michael})`;
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${michael})`;
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
	},
	revertObstacle: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
	},
	revertPath: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = '';
	},
	bodyBackground: (body: HTMLBodyElement) => {
		body.style.background = Colors.COLOR_THEOFFICE_BLACK;
	},
	header: (div: HTMLDivElement) => {
		div.style.backgroundColor = 'transparent';
		div.style.color = Colors.COLOR_THEOFFICE_WHITE;
		div.style.fontFamily = 'The Office, sans-serif';
		div.style.letterSpacing = '';
		div.style.fontSize = '2rem';
	},
	heading: (heading: HTMLHeadingElement) => {
		heading.style.background = Colors.COLOR_THEOFFICE_WHITE;
		heading.style.backgroundClip = 'text';
		heading.style.webkitBackgroundClip = 'text';
		heading.style.webkitTextFillColor = 'transparent';
		heading.style.webkitTextStroke = '';
	},
	controller: (div: HTMLDivElement) => {
		div.style.color = Colors.COLOR_THEOFFICE_WHITE;
	},
	button: (button: HTMLButtonElement) => {
		button.style.backgroundColor = 'transparent';
		button.style.color = Colors.COLOR_THEOFFICE_WHITE;

		if (!is_touch_device()) {
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
				button.style.color = Colors.COLOR_THEOFFICE_WHITE;
			});

			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'transparent';
				button.style.color = Colors.COLOR_THEOFFICE_WHITE;
			});
		}
	},
	dropdown: (heading: HTMLHeadingElement) => {
		heading.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
		heading.style.color = Colors.COLOR_THEOFFICE_WHITE;
	},
	options: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_THEOFFICE_WHITE;
	},
	option: (li: HTMLLIElement) => {
		li.style.backgroundColor = 'transparent';
		li.style.color = Colors.COLOR_THEOFFICE_BLACK;

		if (!is_touch_device()) {
			li.addEventListener('mouseover', () => {
				li.style.backgroundColor = Colors.COLOR_THEOFFICE_BROWN;
				li.style.color = Colors.COLOR_THEOFFICE_WHITE;
			});

			li.addEventListener('mouseout', () => {
				li.style.backgroundColor = 'transparent';
				li.style.color = Colors.COLOR_THEOFFICE_BLACK;
			});
		}
	},
};

export const theOfficeObstacleOptions: Obstacle = {
	wall: 'Gas Station (Barrier)',
	obstacle1: 'Cellphone Store (Weight: 2)',
	obstacle2: "Mr. Choo's Chinese Food (Weight: 3)",
	obstacle3: 'Top of Building (Weight: 4)',
};
