import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { groupDomain, groupReducer } from './group/groupStore';
import { noteDomain, noteReducer } from './note/noteStore';

export const reducers = combineReducers({
  shared: sharedReducer,
  [noteDomain]: noteReducer,
  [groupDomain]: groupReducer,
});
