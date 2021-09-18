import { Action, createReducer, on } from '@ngrx/store';

import { setFamily, resetFamily, setFetching } from './family.actions';

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

export interface IFamilyState {
  family: {} | IFamily;
  isFetching: boolean;
}

const initialState: IFamilyState = {
  family: {},
  isFetching: false,
};

export const _familyReducer = createReducer(
  initialState,
  on(setFamily, (state, { family }) => ({
    ...state,
    family,
  })),
  on(setFetching, (state, { isFetching }) => ({
    ...state,
    isFetching,
  })),
  on(resetFamily, (state) => ({
    ...state,
    family: {},
  }))
);

export function familyReducer(state: any, action: Action) {
  return _familyReducer(state, action);
}
