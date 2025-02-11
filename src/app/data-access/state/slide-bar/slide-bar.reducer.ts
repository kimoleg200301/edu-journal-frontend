import {createReducer, on} from '@ngrx/store';
import {setSelectedItem} from './slide-bar.action';

export const SLIDEBAR_KEY = 'slideBar'

export interface SlideBarState {
  selectedItem: string;
}

const initialState: SlideBarState = {
  selectedItem: '/',
}

export const slideBarReducer = createReducer(
  initialState,
  on(setSelectedItem, (state, { route })=> ({...state, selectedItem: route}))
);
