import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { itemDomain, itemReducer } from './item/itemStore';
import { topicReducer } from './topics/topicReducer';

export const reducers = combineReducers({
  shared: sharedReducer,
  topics: topicReducer,
  [itemDomain]: itemReducer,
});
