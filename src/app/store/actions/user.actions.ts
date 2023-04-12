import { Action, createAction, props } from '@ngrx/store';
import { GitHubUser } from '../models/user.model';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const clearHistory = createAction('[Clear History] ResetHistory');
export const addUser = createAction('[Add User] AddUser', props<GitHubUser>());
