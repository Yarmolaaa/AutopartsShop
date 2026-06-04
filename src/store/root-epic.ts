import { combineEpics } from 'redux-observable';
import { searchEpic } from './search/search-epic';

export const rootEpic = combineEpics(searchEpic);
