import React, { useRef, useState, useEffect } from 'react';

import Vertices from './Vertices/Vertices';
import WeightedGraph from '../../utils/pathfinding/algorithms/dijkstra';

import styles from './PathfindingVisualizer.module.css';

interface PathfindingVisualizerProps {}

interface Vertex {
	element: HTMLElement;
	row: number;
	column: number;
}

function absoluteToIndex(index: number, numRows: number, numCols: number) {
	let row = Math.floor(index / numRows);
	let col = index % numCols;

	return { row, col };
}

function indexToAbsolute(
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

const NUM_ROWS = 20;
const NUM_COLS = 40;
const START_ROW = Math.floor(NUM_ROWS / 2);
const START_COL = Math.floor(NUM_COLS / 4);
const END_ROW = Math.floor(NUM_ROWS / 2) + 4;
const END_COL = Math.floor((NUM_COLS / 4) * 3);

const COLOR_START = 'blue';
const COLOR_END = 'red';
const COLOR_VISIT = 'orange';
const COLOR_PATH = 'green';

const PathfindingVisualizer = (props: PathfindingVisualizerProps) => {
	const [graph, setGraph] = useState<WeightedGraph>(new WeightedGraph());
	const [rows, setRows] = useState<number>(NUM_ROWS);
	const [columns, setColumns] = useState<number>(NUM_COLS);
	const [rowStart, setRowStart] = useState<number>(START_ROW);
	const [colStart, setColStart] = useState<number>(START_COL);
	const [rowEnd, setRowEnd] = useState<number>(END_ROW);
	const [colEnd, setColEnd] = useState<number>(END_COL);
	const [setTimeouts] = useState<any>([]);

	const verticesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		handleInitGraph();
	}, []);

	const handleGetVertex = (row: number, column: number) => {
		return {
			element: verticesRef.current?.children[row].children[
				column
			] as HTMLElement,
			row,
			column,
		};
	};

	const handleInitGraph = (): void => {
		let startVertex: Vertex = handleGetVertex(rowStart, colStart);
		let endVertex: Vertex = handleGetVertex(rowEnd, colEnd);

		startVertex.element.style.backgroundColor = COLOR_START;
		endVertex.element.style.backgroundColor = COLOR_END;

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				let idx = columns * i + j;
				graph.addVertex(idx);
			}
		}

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				let idx = columns * i + j;

				// adds left neighbor edge
				if (idx - 1 !== columns * i - 1) {
					graph.addEdge(idx, idx - 1, 1);
				}

				// adds right neighbor edge
				if (idx + 1 !== columns * (i + 1)) {
					graph.addEdge(idx, idx + 1, 1);
				}

				// adds top neighbor edge
				if (idx - columns >= 0) {
					graph.addEdge(idx, idx - columns, 1);
				}

				// adds bottom neighbor edge
				if (idx + columns < rows * columns) {
					graph.addEdge(idx, idx + columns, 1);
				}
			}
		}
	};

	const handleFindShortestPath = (start: number, end: number) => {
		handleClearPath();
		let animations = graph.dijkstra(start, end);

		for (let i = 0; i < animations.length; i++) {
			let animation = animations[i];
			let vertices = verticesRef.current;
			let row = Math.floor(animation.index / columns);
			let column = animation.index % columns;
			let vertex: Vertex;
			let visited = false;
			if (vertices) {
				vertex = {
					element: vertices?.children[row].children[
						column
					] as HTMLElement,
					row: row,
					column: column,
				};
			}

			if (!visited) {
				setTimeouts.push(
					setTimeout(() => {
						if (animation.state === 'VISITING') {
							vertex.element.style.backgroundColor = COLOR_VISIT;
						} else if (animation.state === 'PATH') {
							vertex.element.style.backgroundColor = COLOR_PATH;
						}
					}, 20 * i)
				);
			}
		}
	};

	const handleClearTimeouts = () => {
		for (let timeout of setTimeouts) {
			clearTimeout(timeout);
		}
	};

	const handleClearPath = () => {
		handleClearTimeouts();

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				let vertex = handleGetVertex(i, j);
				if (i === rowStart && j === colStart) {
					vertex.element.style.backgroundColor = COLOR_START;
				} else if (i === rowEnd && j === colEnd) {
					vertex.element.style.backgroundColor = COLOR_END;
				} else {
					handleGetVertex(i, j).element.style.backgroundColor = '';
				}
			}
		}
	};

	return (
		<div className={styles.PathfindingVisualizer}>
			<Vertices rows={rows} columns={columns} ref={verticesRef} />
			<div className={styles.buttons}>
				<button
					onClick={() =>
						handleFindShortestPath(
							indexToAbsolute(rowStart, colStart, rows, columns),
							indexToAbsolute(rowEnd, colEnd, rows, columns)
						)
					}
				>
					Find path
				</button>
				<button onClick={handleClearPath}>Clear graph</button>
				<button
					onClick={() =>
						console.log(
							verticesRef.current?.children[0].children[10]
						)
					}
				>
					Test
				</button>
			</div>
		</div>
	);
};

export default PathfindingVisualizer;
