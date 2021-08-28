import { IPost } from './posts.reducer';

export const getPosts = (state: any): Array<IPost> => state.posts.allPosts;

// TODO: read and think about it
// import { createSelector } from '@ngrx/store';
