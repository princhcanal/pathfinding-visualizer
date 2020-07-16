import React, { RefObject } from 'react';

import Vertex from '../Vertex/Vertex';

import styles from './VertexRow.module.css';
import * as Position from '../../../../utils/position';
import { StoreState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';

interface VertexRowProps {
	rowNumber: number;
	columns: number;
	verticesRef: RefObject<HTMLDivElement>;
}

const VertexRow = (props: VertexRowProps) => {
	let vertexRow: JSX.Element[] = [];
	const numRows = useSelector<StoreState, number>(
		(state) => state.graph.numRows
	);
	const numCols = useSelector<StoreState, number>(
		(state) => state.graph.numCols
	);

	for (let i = 0; i < props.columns; i++) {
		let absoluteIndex = Position.indexToAbsolute(
			props.rowNumber,
			i,
			numRows,
			numCols
		);
		vertexRow.push(
			<Vertex
				key={i}
				verticesRef={props.verticesRef}
				absoluteIndex={absoluteIndex}
			/>
		);
	}

	return <div className={styles.VertexRow}>{vertexRow}</div>;
};

export default VertexRow;
