import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';
import thanos from './img/thanos.png';
import gauntlet from './img/gauntlet.png';
import ironMan from './img/ironMan.png';
import ironManCursor from './img/ironMan.png';
import captainAmerica from './img/captainAmerica.png';
import captainAmericaCursor from './img/captainAmerica.png';
import thor from './img/thor.png';
import thorCursor from './img/thor.png';
import captainMarvel from './img/captainMarvel.png';
import captainMarvelCursor from './img/captainMarvel.png';

export const avengersTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${thanos})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '90%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${gauntlet})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '40%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${ironMan})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '40%';
		vertex.style.cursor = `url(${ironManCursor}), pointer`;
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${ironManCursor}), pointer`;
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${captainAmerica})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '50%';
		vertex.style.cursor = `url(${captainAmericaCursor}), pointer`;
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${captainAmericaCursor}), pointer`;
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${thor})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '60%';
		vertex.style.cursor = `url(${thorCursor}), pointer`;
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${thorCursor}), pointer`;
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = `url(${captainMarvel})`;
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '70%';
		vertex.style.cursor = `url(${captainMarvelCursor}), pointer`;
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = `url(${captainMarvelCursor}), pointer`;
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_AVENGERS_GOLD;
		vertex.style.cursor = `url(${ironManCursor}), pointer`;
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_PURPLE;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${thanos})`;
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${thanos})`;
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${gauntlet})`;
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = `url(${gauntlet})`;
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
	},
	revertObstacle: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
	},
	revertPath: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
	},
	bodyBackground: (body: HTMLBodyElement) => {
		body.style.background = Colors.COLOR_AVENGERS_BLACK;
	},
	header: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_AVENGERS_BLACK;
		div.style.color = Colors.COLOR_AVENGERS_GOLD;
		div.style.fontFamily = 'Avengers, sans-serif';
		div.style.letterSpacing = '';
		div.style.fontSize = '2rem';
	},
	heading: (heading: HTMLHeadingElement) => {
		heading.style.background = `linear-gradient(to top, ${Colors.COLOR_AVENGERS_BROWN}, ${Colors.COLOR_AVENGERS_GOLD})`;
		heading.style.backgroundClip = 'text';
		heading.style.webkitBackgroundClip = 'text';
		heading.style.webkitTextFillColor = 'transparent';
		heading.style.webkitTextStroke = `4px ${Colors.COLOR_AVENGERS_BROWN}`;
	},
	controller: (div: HTMLDivElement) => {
		div.style.color = Colors.COLOR_AVENGERS_PURPLE;
	},
	button: (button: HTMLButtonElement) => {
		button.style.backgroundColor = 'transparent';
		button.style.color = Colors.COLOR_AVENGERS_PURPLE;

		if (!is_touch_device()) {
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor = Colors.COLOR_AVENGERS_PURPLE;
				button.style.color = Colors.COLOR_AVENGERS_GOLD;
			});

			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'transparent';
				button.style.color = Colors.COLOR_AVENGERS_PURPLE;
			});
		}
	},
	dropdown: (heading: HTMLHeadingElement) => {
		heading.style.backgroundColor = Colors.COLOR_AVENGERS_PURPLE;
		heading.style.color = Colors.COLOR_AVENGERS_GOLD;
	},
	options: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_AVENGERS_PURPLE;
	},
	option: (li: HTMLLIElement) => {
		li.style.backgroundColor = 'transparent';
		li.style.color = Colors.COLOR_AVENGERS_GOLD;

		if (!is_touch_device()) {
			li.addEventListener('mouseover', () => {
				li.style.backgroundColor = Colors.COLOR_AVENGERS_GOLD;
				li.style.color = Colors.COLOR_AVENGERS_PURPLE;
			});

			li.addEventListener('mouseout', () => {
				li.style.backgroundColor = 'transparent';
				li.style.color = Colors.COLOR_AVENGERS_GOLD;
			});
		}
	},
};

export const avengersObstacleOptions: Obstacle = {
	wall: 'Iron Man (Barrier)',
	obstacle1: 'Captain America (Weight: 2)',
	obstacle2: 'Thor (Weight: 3)',
	obstacle3: 'Captain Marvel (Weight: 4)',
};
