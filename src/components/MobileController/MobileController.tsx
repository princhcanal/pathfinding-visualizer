import React, { useRef, RefObject } from 'react';

import styles from './MobileController.module.css';
import {
    getNeighbors,
    getVertexAbsolute,
    Neighbors,
} from '../../utils/position';
import { StoreState } from '../../store/reducers';
import { Vertex } from '../../store/reducers/graph';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../store/actions';
import { GraphTheme } from '../../utils/themes';

interface MobileControllerProps {
    classNames?: string[];
    verticesRef: RefObject<HTMLDivElement>;
}

// FIXME: moves over walls
// FIXME: responsive issues
const MobileController = (props: MobileControllerProps) => {
    let classNames = [styles.MobileController];
    if (props.classNames) {
        classNames.push(...props.classNames);
    }

    const startVertex = useSelector<StoreState, Vertex | null>(
        (state) => state.graph.startVertex
    );
    const endVertex = useSelector<StoreState, Vertex | null>(
        (state) => state.graph.endVertex
    );
    const numRows = useSelector<StoreState, number>(
        (state) => state.graph.numRows
    );
    const numCols = useSelector<StoreState, number>(
        (state) => state.graph.numCols
    );
    const theme = useSelector<StoreState, GraphTheme>(
        (state) => state.graph.theme
    );
    const isDoneAnimating = useSelector<StoreState, boolean>(
        (state) => state.drag.isDoneAnimating
    );
    const obstacleIndices = useSelector<StoreState, number[]>(
        (state) => state.drag.obstacleIndices
    );
    const controllerRef = useRef<HTMLDivElement>(null);
    const startEndRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    let start: Element;
    let startNeighbors: Neighbors;
    let startNeighborsTopVertex: Vertex;
    let startNeighborsBottomVertex: Vertex;
    let startNeighborsLeftVertex: Vertex;
    let startNeighborsRightVertex: Vertex;

    let end: Element;
    let endNeighbors: Neighbors;
    let endNeighborsTopVertex: Vertex;
    let endNeighborsBottomVertex: Vertex;
    let endNeighborsLeftVertex: Vertex;
    let endNeighborsRightVertex: Vertex;

    if (startEndRef.current) {
        start = startEndRef.current.children[0];
        end = startEndRef.current.children[1];
        startNeighbors = getNeighbors(
            startVertex?.absoluteIndex as number,
            startVertex?.row as number,
            numRows,
            numCols
        );
        endNeighbors = getNeighbors(
            endVertex?.absoluteIndex as number,
            endVertex?.row as number,
            numRows,
            numCols
        );
        if (
            startNeighbors.top !== -1 &&
            startNeighbors.top < numRows * numCols &&
            !obstacleIndices.includes(startNeighbors.top)
        ) {
            startNeighborsTopVertex = getVertexAbsolute(
                startNeighbors.top,
                numRows,
                numCols,
                props.verticesRef
            );
        }
        if (
            endNeighbors.top !== -1 &&
            endNeighbors.top < numRows * numCols &&
            !obstacleIndices.includes(endNeighbors.top)
        ) {
            endNeighborsTopVertex = getVertexAbsolute(
                endNeighbors.top,
                numRows,
                numCols,
                props.verticesRef
            );
        }
        if (
            startNeighbors.bottom !== -1 &&
            startNeighbors.bottom < numRows * numCols &&
            !obstacleIndices.includes(startNeighbors.bottom)
        ) {
            startNeighborsBottomVertex = getVertexAbsolute(
                startNeighbors.bottom,
                numRows,
                numCols,
                props.verticesRef
            );
        }
        if (
            endNeighbors.bottom !== -1 &&
            endNeighbors.bottom < numRows * numCols &&
            !obstacleIndices.includes(endNeighbors.bottom)
        ) {
            endNeighborsBottomVertex = getVertexAbsolute(
                endNeighbors.bottom,
                numRows,
                numCols,
                props.verticesRef
            );
        }
        if (
            startNeighbors.left !== -1 &&
            startNeighbors.left < numRows * numCols &&
            !obstacleIndices.includes(startNeighbors.left)
        ) {
            startNeighborsLeftVertex = getVertexAbsolute(
                startNeighbors.left,
                numRows,
                numCols,
                props.verticesRef
            );
        }
        if (
            endNeighbors.left !== -1 &&
            endNeighbors.left < numRows * numCols &&
            !obstacleIndices.includes(endNeighbors.left)
        ) {
            endNeighborsLeftVertex = getVertexAbsolute(
                endNeighbors.left,
                numRows,
                numCols,
                props.verticesRef
            );
        }
        if (
            startNeighbors.right !== -1 &&
            startNeighbors.right < numRows * numCols &&
            !obstacleIndices.includes(startNeighbors.right)
        ) {
            startNeighborsRightVertex = getVertexAbsolute(
                startNeighbors.right,
                numRows,
                numCols,
                props.verticesRef
            );
        }
        if (
            endNeighbors.right !== -1 &&
            endNeighbors.right < numRows * numCols &&
            !obstacleIndices.includes(endNeighbors.right)
        ) {
            endNeighborsRightVertex = getVertexAbsolute(
                endNeighbors.right,
                numRows,
                numCols,
                props.verticesRef
            );
        }
    }

    const handleStart = () => {
        if (startEndRef.current) {
            const start = startEndRef.current.children[0];
            const end = startEndRef.current.children[1];
            if (end.classList.contains(styles.Selected)) {
                end.classList.remove(styles.Selected);
                start.classList.add(styles.Selected);
            }
        }
    };

    const handleEnd = () => {
        if (startEndRef.current) {
            const start = startEndRef.current.children[0];
            const end = startEndRef.current.children[1];
            if (start.classList.contains(styles.Selected)) {
                start.classList.remove(styles.Selected);
                end.classList.add(styles.Selected);
            }
        }
    };

    const handleMove = (
        element: Element,
        elementNeighbor: number,
        vertex: Vertex
    ) => {
        if (startEndRef.current && startVertex && endVertex) {
            if (
                elementNeighbor !== -1 &&
                elementNeighbor !== endVertex.absoluteIndex &&
                elementNeighbor !== startVertex.absoluteIndex &&
                !obstacleIndices.includes(elementNeighbor)
            ) {
                if (element === start) {
                    theme.start(vertex.element);
                    theme.unvisited(startVertex?.element);
                    dispatch(
                        Actions.setStartVertex(
                            vertex.row,
                            vertex.column,
                            props.verticesRef
                        )
                    );
                    if (isDoneAnimating) {
                        dispatch(Actions.clearPath(props.verticesRef));
                        dispatch(
                            Actions.recalculatePath(
                                vertex.absoluteIndex,
                                endVertex.absoluteIndex,
                                props.verticesRef
                            )
                        );
                    }
                } else if (element === end) {
                    theme.end(vertex.element);
                    theme.unvisited(endVertex?.element);
                    dispatch(
                        Actions.setEndVertex(
                            vertex.row,
                            vertex.column,
                            props.verticesRef
                        )
                    );
                    if (isDoneAnimating) {
                        dispatch(Actions.clearPath(props.verticesRef));
                        dispatch(
                            Actions.recalculatePath(
                                startVertex.absoluteIndex,
                                vertex.absoluteIndex,
                                props.verticesRef
                            )
                        );
                    }
                }
            } else if (controllerRef.current) {
                controllerRef.current.classList.remove(styles.Shake);
                setTimeout(() => {
                    if (controllerRef.current) {
                        controllerRef.current.classList.add(styles.Shake);
                    }
                }, 10);
            }
        }
    };

    const handleUp = () => {
        if (start.classList.contains(styles.Selected)) {
            handleMove(start, startNeighbors.top, startNeighborsTopVertex);
        } else if (end.classList.contains(styles.Selected)) {
            handleMove(end, endNeighbors.top, endNeighborsTopVertex);
        }
    };
    const handleDown = () => {
        if (start.classList.contains(styles.Selected)) {
            handleMove(
                start,
                startNeighbors.bottom,
                startNeighborsBottomVertex
            );
        } else if (end.classList.contains(styles.Selected)) {
            handleMove(end, endNeighbors.bottom, endNeighborsBottomVertex);
        }
    };
    const handleLeft = () => {
        if (start.classList.contains(styles.Selected)) {
            handleMove(start, startNeighbors.left, startNeighborsLeftVertex);
        } else if (end.classList.contains(styles.Selected)) {
            handleMove(end, endNeighbors.left, endNeighborsLeftVertex);
        }
    };
    const handleRight = () => {
        if (start.classList.contains(styles.Selected)) {
            handleMove(start, startNeighbors.right, startNeighborsRightVertex);
        } else if (end.classList.contains(styles.Selected)) {
            handleMove(end, endNeighbors.right, endNeighborsRightVertex);
        }
    };

    return (
        <div ref={controllerRef} className={classNames.join(' ')}>
            <div className={styles.StartEndContainer}>
                <div ref={startEndRef} className={styles.StartEnd}>
                    <button className={styles.Selected} onClick={handleStart}>
                        Start
                    </button>
                    <button onClick={handleEnd}>End</button>
                </div>
            </div>
            <div className={styles.DPadContainer}>
                <div className={styles.DPad}>
                    <div className={styles.Row_1}>
                        <button onClick={handleUp}>&uarr;</button>
                    </div>
                    <div className={styles.Row_2}>
                        <button onClick={handleLeft}>&larr;</button>
                        <button onClick={handleRight}>&rarr;</button>
                    </div>
                    <div className={styles.Row_3}>
                        <button onClick={handleDown}>&darr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileController;
