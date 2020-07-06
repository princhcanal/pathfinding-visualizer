import React, { useRef, useImperativeHandle, forwardRef } from 'react';

import styles from './Vertices.module.css';

import VertexRow from './VertexRow/VertexRow';

interface VerticesProps {
	rows: number;
	columns: number;
}

export interface VerticesRef {
	vertices: any;
	children: any;
}

const Vertices = (props: VerticesProps, ref: any) => {
	let verticesRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(
		ref,
		(): VerticesRef => ({
			vertices: verticesRef.current,
			children: verticesRef.current ? verticesRef.current.children : null,
		})
	);

	let vertices: JSX.Element[] = [];

	for (let i = 0; i < props.rows; i++) {
		vertices.push(<VertexRow columns={props.columns} key={i} />);
	}

	return (
		<div className={styles.Vertices} ref={verticesRef}>
			{vertices}
		</div>
	);
};

export default forwardRef(Vertices);
