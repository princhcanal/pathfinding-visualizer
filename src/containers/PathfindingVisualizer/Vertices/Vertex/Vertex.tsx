import React, { RefObject } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions';

import styles from './Vertex.module.css';

interface VertexRef {
	verticesRef: RefObject<HTMLDivElement>;
}

const Vertex = (props: VertexRef) => {
	const dispatch = useDispatch();

	return (
		<div
			className={styles.Vertex}
			onMouseDown={(e: any) => dispatch(actions.onMouseDown(e))}
			onMouseOver={(e: any) =>
				dispatch(actions.onMouseOver(e, props.verticesRef))
			}
			onMouseOut={(e: any) =>
				dispatch(actions.onMouseOut(e, props.verticesRef))
			}
			onMouseUp={(e: any) =>
				dispatch(actions.onMouseUp(e, props.verticesRef))
			}
		>
			{/* <img src='' alt='' /> */}
		</div>
	);
};

export default Vertex;
