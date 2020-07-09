export function absoluteToIndex(
	index: number,
	numRows: number,
	numCols: number
) {
	let row = Math.floor(index / numRows);
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
	verticesRef: React.RefObject<HTMLDivElement>
) => {
	return {
		element: verticesRef.current?.children[row].children[
			column
		] as HTMLElement,
		row,
		column,
		absoluteIndex: indexToAbsolute(row, column, numRows, numCols),
	};
};
