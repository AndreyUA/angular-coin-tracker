import { Action, createReducer, on } from '@ngrx/store';

import { setAllPosts, resetPosts, addNewPost } from './posts.actions';

export interface IPost {
  date: string;
  family: string;
  isRemoved: boolean;
  name: string;
  text: string;
  __v: number;
  _id: string;
}

export interface IPosts {
  allPosts: [] | Array<IPost>;
}

const initialState: IPosts = {
  allPosts: [],
};

const _postsReducer = createReducer(
  initialState,
  on(setAllPosts, (state, { posts }) => ({
    ...state,
    allPosts: posts,
  })),
  on(addNewPost, (state, { post }) => ({
    ...state,
    allPosts: [post, ...state.allPosts],
  })),
  on(resetPosts, (): any => ({ allPosts: [] }))
);

export function postsReducer(state: any, action: Action) {
  return _postsReducer(state, action);
}
