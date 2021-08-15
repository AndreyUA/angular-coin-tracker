import { createAction, props } from '@ngrx/store';

import { IFamily } from './family.reducer';

export const setFamily = createAction(
  '[Family action] Set family',
  props<{ family: IFamily }>()
);

export const resetFamily = createAction('[Family action] Reset family');
