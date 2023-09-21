import { all } from 'redux-saga/effects';

import { sharedSagas } from '../shared/react/store/sharedSaga';
import { groupSaga } from './group/groupStore';
import { noteSagas } from './note/noteStore';

export function* sagas() {
  yield all([sharedSagas(), noteSagas(), groupSaga()]);
}
