import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { itemDomain, itemReducer } from './item/itemStore';
import { topicDomain, topicReducer } from './topic/topicStore';

export const reducers = combineReducers({
  shared: sharedReducer,
  [topicDomain]: topicReducer,
  [itemDomain]: itemReducer,
});
