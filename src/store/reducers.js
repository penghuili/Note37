import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { topicReducer } from './topics/topicReducer';

export const reducers = combineReducers({
  shared: sharedReducer,
  topics: topicReducer,
});
