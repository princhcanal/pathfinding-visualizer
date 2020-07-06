import React, { useRef } from 'react';

import Vertices, { VerticesRef } from './Vertices/Vertices';

import styles from './PathfindingVisualizer.module.css';

interface PathfindingVisualizerProps {}

const PathfindingVisualizer = (props: PathfindingVisualizerProps) => {
	let vertices = useRef<VerticesRef>();

	return (
		<div className={styles.PathfindingVisualizer}>
			<Vertices rows={15} columns={40} ref={vertices} />
			<button
				onClick={() =>
					console.log(vertices.current?.children[0].children[10])
				}
			>
				Test
			</button>
		</div>
	);
};

export default PathfindingVisualizer;
