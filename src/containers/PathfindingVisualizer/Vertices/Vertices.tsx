import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../../store/reducers';
import * as Actions from '../../../store/actions';

import styles from './Vertices.module.css';

import VertexRow from './VertexRow/VertexRow';
import { Vertex } from '../../../store/reducers/graph';

interface VerticesProps {}

export interface VerticesRef {
	vertices: HTMLDivElement | null;
	children: HTMLCollection | null;
}

const Vertices = (props: VerticesProps, ref: any) => {
	const dispatch = useDispatch();
	const numRows = useSelector<StoreState, number>(
		(state) => state.graph.numRows
	);
	const numCols = useSelector<StoreState, number>(
		(state) => state.graph.numCols
	);
	const startVertex = useSelector<StoreState, Vertex | null>(
		(state) => state.graph.startVertex
	);
	const endVertex = useSelector<StoreState, Vertex | null>(
		(state) => state.graph.endVertex
	);
	const wallIndices = useSelector<StoreState, number[]>(
		(state) => state.drag.wallIndices
	);
	const isStartMouseDown = useSelector<StoreState, boolean>(
		(state) => state.drag.isStartMouseDown
	);
	const isEndMouseDown = useSelector<StoreState, boolean>(
		(state) => state.drag.isEndMouseDown
	);
	const isMouseDown = useSelector<StoreState, boolean>(
		(state) => state.drag.isMouseDown
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
			<VertexRow
				rowNumber={i}
				columns={numCols}
				key={i}
				verticesRef={verticesRef}
			/>
		);
	}

	const handleMouseLeave = (e: any) => {
		if (
			startVertex &&
			endVertex &&
			(isStartMouseDown || isEndMouseDown || isMouseDown)
		) {
			dispatch(Actions.mouseUp(e));
			dispatch(
				Actions.setStartVertex(
					startVertex?.row,
					startVertex?.column,
					verticesRef
				)
			);
			dispatch(
				Actions.setEndVertex(
					endVertex?.row,
					endVertex?.column,
					verticesRef
				)
			);
			dispatch(
				Actions.clearPath(
					verticesRef,
					false,
					startVertex.absoluteIndex,
					endVertex.absoluteIndex
				)
			);
			dispatch(Actions.onSetWallIndices(wallIndices, verticesRef));
		}
	};

	return (
		<div
			className={styles.Vertices}
			ref={verticesRef}
			onMouseLeave={handleMouseLeave}
		>
			{vertices}
		</div>
	);
};

export default forwardRef(Vertices);
