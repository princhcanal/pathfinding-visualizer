import { combineReducers } from 'redux';
import { graphReducer, GraphState } from './graph';
import { dragReducer, DragState } from './drag';

export interface StoreState {
	graph: GraphState;
	drag: DragState;
}

export const reducers = combineReducers<StoreState>({
	graph: graphReducer,
	drag: dragReducer,
});
