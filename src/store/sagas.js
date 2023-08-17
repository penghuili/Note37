import { all } from 'redux-saga/effects';

import { sharedSagas } from '../shared/react/store/sharedSaga';
import { itemSagas } from './item/itemStore';
import { topicSagas } from './topic/topicStore';

export function* sagas() {
  yield all([sharedSagas(), topicSagas(), itemSagas()]);
}
