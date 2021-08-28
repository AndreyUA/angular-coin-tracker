import { createAction, props } from '@ngrx/store';

import { IPost } from './posts.reducer';

export const setAllPosts = createAction(
  '[Posts action] Set all posts',
  props<{ posts: Array<IPost> }>()
);

export const resetPosts = createAction('[Posts action] Reset all posts');
