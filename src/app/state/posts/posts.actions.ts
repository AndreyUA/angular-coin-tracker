import { createAction, props } from '@ngrx/store';

import { IPost } from './posts.reducer';

export const setAllPosts = createAction(
  '[Posts action] Set all posts',
  props<{ posts: Array<IPost> }>()
);

export const addNewPost = createAction(
  '[Posts action] Add new post',
  props<{ post: IPost }>()
);

export const removePost = createAction(
  '[Posts action] Remove post',
  props<{ postId: string }>()
);

export const resetPosts = createAction('[Posts action] Reset all posts');
