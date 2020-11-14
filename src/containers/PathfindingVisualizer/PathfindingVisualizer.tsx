import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Vertices from './Vertices/Vertices';
import Navbar from '../../components/UI/Navbar/Navbar';
import Controller from '../../components/Controller/Controller';
import MobileController from '../../components/MobileController/MobileController';

import * as Actions from '../../store/actions';

import styles from './PathfindingVisualizer.module.css';
import { StoreState } from '../../store/reducers';

interface PathfindingVisualizerProps {}

const PathfindingVisualizer = (props: PathfindingVisualizerProps) => {
    const dispatch = useDispatch();
    const numRows = useSelector<StoreState, number>(
        (state) => state.graph.numRows
    );
    const numCols = useSelector<StoreState, number>(
        (state) => state.graph.numCols
    );
    const dragWallIndices = useSelector<StoreState, number[]>(
        (state) => state.drag.wallIndices
    );

    const verticesRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        dispatch(Actions.setVerticesRef(verticesRef));
        dispatch(Actions.setObstacleRef(dragWallIndices));
    }, [dispatch, dragWallIndices]);

    useLayoutEffect(() => {
        dispatch(
            Actions.setStartVertex(
                Math.floor(numRows / 2),
                Math.floor(numCols / 4),
                verticesRef
            )
        );
        dispatch(
            Actions.setEndVertex(
                Math.floor(numRows / 2),
                Math.floor(numCols / 4) * 3,
                verticesRef
            )
        );
    }, [dispatch, verticesRef, numRows, numCols]);

    useEffect(() => {
        dispatch(Actions.initGraph(verticesRef));
        dispatch(Actions.clearPath(verticesRef));
        dispatch(Actions.setIsDoneAnimating(false));
        dispatch(Actions.onClearWalls(verticesRef));
    }, [dispatch, numRows, numCols]);

    // const handleTest = () => {
    // 	console.log(dragWallIndices, graphWallIndices);
    // 	console.log(dragObstacle1Indices, graphObstacle1Indices);
    // 	console.log(dragObstacle2Indices, graphObstacle2Indices);
    // 	console.log(dragObstacle3Indices, graphObstacle3Indices);
    // };

    return (
        <div className={styles.PathfindingVisualizer}>
            <Navbar verticesRef={verticesRef} />
            <Controller verticesRef={verticesRef} />
            <Vertices ref={verticesRef} />
            <MobileController verticesRef={verticesRef} />
            {/* <div className={styles.buttons}>
				<button onClick={handleTest}>Test</button>
			</div> */}
        </div>
    );
};

export default PathfindingVisualizer;
