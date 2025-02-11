import {createFeatureSelector, createSelector} from '@ngrx/store';
import { SLIDEBAR_KEY, SlideBarState} from './slide-bar.reducer';

export const selectSlideBarState = createFeatureSelector<SlideBarState>(SLIDEBAR_KEY);

export const selectSelectedItem = createSelector(
  selectSlideBarState,
  (state: SlideBarState) => state.selectedItem,
);
