import { RefObject } from 'react';
import { Vertex } from '../store/reducers/graph';

interface Neighbors {
	left: number;
	right: number;
	top: number;
	bottom: number;
}

export function absoluteToIndex(
	index: number,
	numRows: number,
	numCols: number
) {
	let row = Math.floor(index / numCols);
	let col = index % numCols;
	return { row, col };
}

export function indexToAbsolute(
	row: number,
	col: number,
	numRows: number,
	numCols: number
) {
	let index = 0;

	index += row * numCols;
	index += col;

	return index;
}

export const getVertex = (
	row: number,
	column: number,
	numRows: number,
	numCols: number,
	verticesRef: RefObject<HTMLDivElement>
): Vertex => {
	return {
		element: verticesRef.current?.children[row].children[
			column
		] as HTMLElement,
		row,
		column,
		absoluteIndex: indexToAbsolute(row, column, numRows, numCols),
	};
};

export const getVertexAbsolute = (
	absoluteIndex: number,
	numRows: number,
	numCols: number,
	verticesRef: RefObject<HTMLDivElement>
): Vertex => {
	let vertexIndices = absoluteToIndex(absoluteIndex, numRows, numCols);

	return {
		element: verticesRef.current?.children[vertexIndices.row].children[
			vertexIndices.col
		] as HTMLElement,
		row: vertexIndices.row,
		column: vertexIndices.col,
		absoluteIndex,
	};
};

export const getNeighbors = (
	idx: number,
	row: number,
	numRows: number,
	numCols: number
): Neighbors => {
	let leftNeighbor: number = idx - 1;
	let rightNeighbor: number = idx + 1;
	let topNeighbor: number = idx - numCols;
	let bottomNeighbor: number = idx + numCols;

	if (!validLeftNeighbor(leftNeighbor, row, numCols)) leftNeighbor = -1;
	if (!validRightNeighbor(rightNeighbor, row, numCols)) rightNeighbor = -1;
	if (!validTopNeighbor(topNeighbor)) topNeighbor = -1;
	if (!validBottomNeighbor(bottomNeighbor, numRows, numCols))
		bottomNeighbor = -1;

	return {
		left: leftNeighbor,
		right: rightNeighbor,
		top: topNeighbor,
		bottom: bottomNeighbor,
	};
};

export const validLeftNeighbor = (
	leftNeighbor: number,
	row: number,
	numCols: number
): boolean => {
	return leftNeighbor !== numCols * row - 1;
};

export const validRightNeighbor = (
	rightNeighbor: number,
	row: number,
	numCols: number
): boolean => {
	return rightNeighbor !== numCols * (row + 1);
};

export const validTopNeighbor = (topNeighbor: number): boolean => {
	return topNeighbor >= 0;
};

export const validBottomNeighbor = (
	bottomNeighbor: number,
	numRows: number,
	numCols: number
): boolean => {
	return bottomNeighbor < numRows * numCols;
};
