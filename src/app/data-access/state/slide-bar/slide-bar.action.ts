import {createAction, props} from '@ngrx/store';

export const setSelectedItem = createAction(
  '[Slide Bar] Sets Selected Item]',
  props<{ route: string }>()
);
