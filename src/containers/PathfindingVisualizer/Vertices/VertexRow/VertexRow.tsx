import React from 'react';

import Vertex from '../Vertex/Vertex';

import styles from './VertexRow.module.css';

interface VertexRowProps {
	columns: number;
}

const VertexRow = (props: VertexRowProps) => {
	let vertexRow: JSX.Element[] = [];

	for (let i = 0; i < props.columns; i++) {
		vertexRow.push(<Vertex key={i} />);
	}

	return <div className={styles.VertexRow}>{vertexRow}</div>;
};

export default VertexRow;
