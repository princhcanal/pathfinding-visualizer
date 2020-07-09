import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../store/reducers';

import styles from './Vertices.module.css';

import VertexRow from './VertexRow/VertexRow';

interface VerticesProps {}

export interface VerticesRef {
	vertices: HTMLDivElement | null;
	children: HTMLCollection | null;
}

const Vertices = (props: VerticesProps, ref: any) => {
	const numRows = useSelector<StoreState, number>(
		(state) => state.graph.numRows
	);
	const numCols = useSelector<StoreState, number>(
		(state) => state.graph.numCols
	);
	let verticesRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(
		ref,
		(): VerticesRef => ({
			vertices: verticesRef.current,
			children: verticesRef.current ? verticesRef.current.children : null,
		})
	);

	let vertices: JSX.Element[] = [];

	for (let i = 0; i < numRows; i++) {
		vertices.push(
			<VertexRow columns={numCols} key={i} verticesRef={verticesRef} />
		);
	}

	return (
		<div className={styles.Vertices} ref={verticesRef}>
			{vertices}
		</div>
	);
};

export default forwardRef(Vertices);
