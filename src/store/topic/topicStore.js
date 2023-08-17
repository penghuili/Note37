import { call, put, select, take } from 'redux-saga/effects';

import {
  createDataSelectors,
  createGeneralStore,
  defaultId,
} from '../../shared/react/store/storeHelpers';
import { createTopic, fetchTopic, fetchTopics, updateTopic } from './topicNetwork';

export const topicDomain = 'topic';

const dataSelectors = createDataSelectors(topicDomain);

export function* makeSureTopicIsFetched(topicId) {
  let topic = yield select(dataSelectors.getItem, defaultId, topicId);
  if (!topic) {
    yield put({ type: `${topicDomain}/fetchItems/REQUESTED` });
    yield take(`${topicDomain}/fetchItems/SUCCEEDED`);
    topic = yield select(dataSelectors.getItem, defaultId, topicId);
  }

  return topic;
}

const { actions, selectors, reducer, saga } = createGeneralStore(topicDomain, {
  preFetchItems: function* () {
    const topics = yield select(dataSelectors.getItems);
    return { continueCall: !topics.length };
  },
  fetchItems: async () => {
    return fetchTopics();
  },
  fetchItem: async ({ itemId }) => {
    return fetchTopic(itemId);
  },
  createItem: async ({ title, note }) => {
    return createTopic({ title, note });
  },
  preUpdateItem: function* ({ itemId }) {
    const topic = yield call(makeSureTopicIsFetched, itemId);
    if (!topic) {
      return { continueCall: false };
    }

    return { continueCall: true, result: topic };
  },
  updateItem: async ({ itemId, title, note, position }, topic) => {
    return updateTopic(itemId, { title, note, position }, topic.decryptedPassword);
  },
});

export const topicActions = {
  fetchItemsRequested: actions.fetchItems.requested.action,
  fetchItemRequested: actions.fetchItem.requested.action,
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
};

export const topicSelectors = {
  ...selectors,
  data: dataSelectors,
};

export const topicReducer = reducer;

export const topicSagas = saga;
