import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { addUser, clearHistory } from './../actions/user.actions';
import { allSearchedUser } from '../user.state';
import { GitHubUser } from '../models/user.model';


export const githubUserReducer = createReducer(
  allSearchedUser,
  on(addUser, (state, prop) => {
    return [...state, prop]
  }),
  on(clearHistory, (state) => {
    return []
  })
);

export const GitHubUserSelecter = createSelector(createFeatureSelector("allSearchedUser"),
  (allSearchedUser: GitHubUser[]) => allSearchedUser
)