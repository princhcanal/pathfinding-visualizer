import { GraphTheme, Obstacle, is_touch_device } from './index';
import * as Colors from '../colors';

export const pokemonTheme: GraphTheme = {
	start: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/pokemonPlayer.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '50%';
		vertex.style.cursor = 'grab';
	},
	end: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/badge.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '120%';
		vertex.style.cursor = 'grab';
	},
	wall: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/rayquaza.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '80%';
		vertex.style.cursor = 'url(/img/rayquazaCursor.png), pointer';
	},
	cursorWall: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/rayquazaCursor.png), pointer';
	},
	obstacle1: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/groudon.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'url(/img/groudonCursor.png), pointer';
	},
	cursorObstacle1: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/groudonCursor.png), pointer';
	},
	obstacle2: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/kyogre.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'url(/img/kyogreCursor.png), pointer';
	},
	cursorObstacle2: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/kyogreCursor.png), pointer';
	},
	obstacle3: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = 'url(/img/latias.png)';
		vertex.style.backgroundRepeat = 'no-repeat';
		vertex.style.backgroundPosition = 'center';
		vertex.style.backgroundSize = '100%';
		vertex.style.cursor = 'url(/img/latiasCursor.png), pointer';
	},
	cursorObstacle3: (vertex: HTMLDivElement) => {
		vertex.style.cursor = 'url(/img/latiasCursor.png), pointer';
	},
	unvisited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
		vertex.style.color = Colors.COLOR_POKEMON_BLUE;
		vertex.style.cursor = 'url(/img/rayquazaCursor.png), pointer';
	},
	visited: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_BLUE;
	},
	visiting: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
	},
	pathHorizontalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/pokemonPlayer.png)';
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
	},
	pathVerticalStart: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/pokemonPlayer.png)';
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
	},
	pathHorizontalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/badge.png)';
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
	},
	pathVerticalEnd: (vertex: HTMLDivElement) => {
		vertex.style.backgroundImage = 'url(/img/badge.png)';
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
	},
	pathHorizontal: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
	},
	pathVertical: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
	},
	revertObstacle: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
		vertex.style.backgroundImage = '';
	},
	revertPath: (vertex: HTMLDivElement) => {
		vertex.style.backgroundColor = '';
	},
	bodyBackground: (body: HTMLBodyElement) => {
		body.style.background = `linear-gradient(to top, ${Colors.COLOR_POKEMON_EMERALD}, ${Colors.COLOR_POKEMON_BLUE})`;
		// body.style.background = `linear-gradient(to top, ${Colors.COLOR_POKEMON_BLUE}, ${Colors.COLOR_POKEMON_EMERALD})`;
	},
	header: (div: HTMLDivElement) => {
		div.style.backgroundColor = 'transparent';
		div.style.color = Colors.COLOR_POKEMON_YELLOW;
		div.style.fontFamily = 'Pokemon, sans-serif';
		div.style.letterSpacing = '0.5rem';
		div.style.fontSize = '2rem';
	},
	heading: (heading: HTMLHeadingElement) => {
		heading.style.background = Colors.COLOR_POKEMON_YELLOW;
		heading.style.backgroundClip = 'text';
		heading.style.webkitBackgroundClip = 'text';
		heading.style.webkitTextFillColor = 'transparent';
		heading.style.webkitTextStroke = `6px ${Colors.COLOR_POKEMON_BLUE}`;
	},
	controller: (div: HTMLDivElement) => {
		div.style.color = Colors.COLOR_POKEMON_YELLOW;
	},
	button: (button: HTMLButtonElement) => {
		button.style.backgroundColor = 'transparent';
		button.style.color = Colors.COLOR_POKEMON_YELLOW;

		if (!is_touch_device()) {
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
				button.style.color = Colors.COLOR_POKEMON_EMERALD;
			});

			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'transparent';
				button.style.color = Colors.COLOR_POKEMON_YELLOW;
			});
		}
	},
	dropdown: (heading: HTMLHeadingElement) => {
		heading.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
		heading.style.color = Colors.COLOR_POKEMON_EMERALD;
	},
	options: (div: HTMLDivElement) => {
		div.style.backgroundColor = Colors.COLOR_POKEMON_EMERALD;
	},
	option: (li: HTMLLIElement) => {
		li.style.backgroundColor = 'transparent';
		li.style.color = Colors.COLOR_POKEMON_YELLOW;

		if (!is_touch_device()) {
			li.addEventListener('mouseover', () => {
				li.style.backgroundColor = Colors.COLOR_POKEMON_YELLOW;
				li.style.color = Colors.COLOR_POKEMON_EMERALD;
			});

			li.addEventListener('mouseout', () => {
				li.style.backgroundColor = 'transparent';
				li.style.color = Colors.COLOR_POKEMON_YELLOW;
			});
		}
	},
};

export const pokemonObstacleOptions: Obstacle = {
	wall: 'Rayquaza (Barrier)',
	obstacle1: 'Groudon (Weight: 2)',
	obstacle2: 'Kyogre (Weight: 3)',
	obstacle3: 'Latias (Weight: 4)',
};
