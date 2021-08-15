import { Action, createReducer, on } from '@ngrx/store';

import { setFamily, resetFamily } from './family.actions';

export interface IPerson {
  _id: string;
  name: string;
  date: string;
}

export interface IFamily {
  _id: string;
  familyName: string;
  email: string;
  persons: [] | Array<IPerson>;
  date: string;
  __v: any;
}

const initialState: {} | IFamily = {};

export const _familyReducer = createReducer(
  initialState,
  on(setFamily, (state, { family }) => ({
    ...state,
    family,
  })),
  on(resetFamily, (): any => {})
);

export function familyReducer(state: any, action: Action) {
  return _familyReducer(state, action);
}
