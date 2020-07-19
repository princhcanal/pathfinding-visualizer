import React, { RefObject } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions';

import styles from './Vertex.module.css';

interface VertexRef {
	verticesRef: RefObject<HTMLDivElement>;
	absoluteIndex: number;
}

const Vertex = (props: VertexRef) => {
	const dispatch = useDispatch();

	return (
		<div
			className={styles.Vertex}
			onMouseDown={(e: any) => {
				e.preventDefault();
				dispatch(actions.onMouseDown(e));
			}}
			onMouseOver={(e: any) => {
				e.preventDefault();
				dispatch(actions.onMouseOver(e, props.verticesRef));
			}}
			onMouseOut={(e: any) => {
				e.preventDefault();
				dispatch(actions.onMouseOut(e, props.verticesRef));
			}}
			onMouseUp={(e: any) => {
				e.preventDefault();
				dispatch(actions.onMouseUp(e, props.verticesRef));
			}}
		>
			{/* {props.absoluteIndex} */}
			{/* <p>{props.absoluteIndex}</p> */}
			<p>.</p>
		</div>
	);
};

export default Vertex;
