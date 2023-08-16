import { all } from 'redux-saga/effects';

import { sharedSagas } from '../shared/react/store/sharedSaga';
import { topicSagas } from './topics/topicSagas';
import { itemSagas } from './item/itemStore';

export function* sagas() {
  yield all([sharedSagas(), topicSagas(), itemSagas()]);
}
