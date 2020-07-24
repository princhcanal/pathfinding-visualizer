import { carTheme } from './car';
import { avengersTheme } from './avengers';
import { carObstacleOptions } from './car';
import { avengersObstacleOptions } from './avengers';
import { onePieceObstacleOptions, onePieceTheme } from './onePiece';
import { lakersObstacleOptions, lakersTheme } from './lakers';
import { pokemonTheme, pokemonObstacleOptions } from './pokemon';
import { theOfficeTheme, theOfficeObstacleOptions } from './theOffice';
import {
	hunterxhunterTheme,
	hunterxhunterObstacleOptions,
} from './hunterxhunter';

type GraphManipulation = (vertex: HTMLDivElement) => void;
type BodyManipulation = (body: HTMLBodyElement) => void;
type DivManipulation = (div: HTMLDivElement) => void;
type ButtonManipulation = (button: HTMLButtonElement) => void;
type HeadingManipulation = (heading: HTMLHeadingElement) => void;
type ListItemManipulation = (li: HTMLLIElement) => void;
type Themes = { [key: string]: GraphTheme };
type Obstacles = { [key: string]: Obstacle };

export type GraphTheme = {
	start: GraphManipulation;
	end: GraphManipulation;
	wall: GraphManipulation;
	obstacle1: GraphManipulation;
	obstacle2: GraphManipulation;
	obstacle3: GraphManipulation;
	unvisited: GraphManipulation;
	visited: GraphManipulation;
	visiting: GraphManipulation;
	pathHorizontalStart: GraphManipulation;
	pathVerticalStart: GraphManipulation;
	pathHorizontalEnd: GraphManipulation;
	pathVerticalEnd: GraphManipulation;
	pathHorizontal: GraphManipulation;
	pathVertical: GraphManipulation;

	revertObstacle: GraphManipulation;
	revertPath: GraphManipulation;

	bodyBackground: BodyManipulation;
	header: DivManipulation;
	heading: HeadingManipulation;
	controller: DivManipulation;
	button: ButtonManipulation;
	dropdown: HeadingManipulation;
	options: DivManipulation;
	option: ListItemManipulation;
	cursorWall: GraphManipulation;
	cursorObstacle1: GraphManipulation;
	cursorObstacle2: GraphManipulation;
	cursorObstacle3: GraphManipulation;
};

export type Obstacle = {
	wall: string;
	obstacle1: string;
	obstacle2: string;
	obstacle3: string;
};

export const themes: Themes = {
	car: carTheme,
	avengers: avengersTheme,
	onePiece: onePieceTheme,
	lakers: lakersTheme,
	pokemon: pokemonTheme,
	theOffice: theOfficeTheme,
	hunterxhunter: hunterxhunterTheme,
};

export const themeOptions = {
	car: 'Car',
	avengers: 'Avengers',
	onePiece: 'One Piece',
	lakers: 'Lakers',
	pokemon: 'Pokemon',
	theOffice: 'The Office',
	hunterxhunter: 'HunterxHunter',
};

export const obstacleOptions: Obstacles = {
	car: carObstacleOptions,
	avengers: avengersObstacleOptions,
	onePiece: onePieceObstacleOptions,
	lakers: lakersObstacleOptions,
	pokemon: pokemonObstacleOptions,
	theOffice: theOfficeObstacleOptions,
	hunterxhunter: hunterxhunterObstacleOptions,
};

export const is_touch_device = () => {
	try {
		document.createEvent('TouchEvent');
		return true;
	} catch (e) {
		return false;
	}
};
