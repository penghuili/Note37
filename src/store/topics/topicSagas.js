import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { ALL } from '../../components/MonthPicker';
import { routeHelpers } from '../../shared/react/routeHelpers';
import { topicActionCreators, topicActionTypes } from './topicActions';
import {
  createItem,
  createTopic,
  deleteItem,
  fetchItems,
  fetchTopics,
  updateItem,
  updateTopic,
} from './topicNetwork';
import { topicSelectors } from './topicSelectors';

function* handleFetchTopicsRequested() {
  const topics = yield select(topicSelectors.getTopics);
  if (topics.length) {
    return;
  }

  yield put(topicActionCreators.isLoading(true));

  const { data } = yield call(fetchTopics);
  if (data) {
    yield put(topicActionCreators.fetchTopicsSucceeded(data));
  }

  yield put(topicActionCreators.isLoading(false));
}

function* makeSureTopicIsFetched(topicId) {
  let topic = yield select(topicSelectors.getTopic, topicId);
  if (!topic) {
    yield put(topicActionCreators.fetchTopicsRequested());
    yield take(topicActionTypes.FETCH_TOPICS_SUCCEEDED);
    topic = yield select(topicSelectors.getTopic, topicId);
  }

  return topic;
}

function* handleCreateTopicPressed({ payload: { title, note } }) {
  yield put(topicActionCreators.isLoading(true));

  const { data } = yield call(createTopic, { title, note });
  if (data) {
    yield put(topicActionCreators.createTopicSucceeded(data));
    yield call(routeHelpers.goBack);
  }

  yield put(topicActionCreators.isLoading(false));
}

function* handleUpdateTopicPressed({ payload: { topicId, title, note, showChart } }) {
  const topic = yield call(makeSureTopicIsFetched, topicId);

  yield put(topicActionCreators.isLoading(true));

  const { data } = yield call(updateTopic, topicId, topic.decryptedPassword, {
    title,
    note,
    showChart,
  });
  if (data) {
    yield put(topicActionCreators.updateTopicSucceeded(topicId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(topicActionCreators.isLoading(false));
}

function* handleFetchItemsRequested({ payload: { topicId, startKey, month } }) {
  const items = yield select(topicSelectors.getItems, topicId);
  if (!month && !startKey && items.length) {
    return;
  }

  const topic = yield call(makeSureTopicIsFetched, topicId);

  yield put(topicActionCreators.isLoadingItems(true));

  const { data } = yield call(fetchItems, topicId, { startKey, month }, topic.decryptedPassword);
  if (data) {
    yield put(topicActionCreators.fetchItemsSucceeded(topicId, data));
  }

  yield put(topicActionCreators.isLoadingItems(false));
}

function* handleMonthChanged({ payload: { topicId, month } }) {
  if (month === ALL) {
    yield put(topicActionCreators.fetchItemsRequested({ topicId }));
    return;
  }

  yield put(topicActionCreators.fetchItemsRequested({ topicId, month }));
}

function* handleCreateItemPressed({ payload: { topicId, note, date } }) {
  const topic = yield call(makeSureTopicIsFetched, topicId);

  yield put(topicActionCreators.isLoading(true));

  const { data } = yield call(createItem, topicId, topic.decryptedPassword, { note, date });
  if (data) {
    yield put(topicActionCreators.createItemSucceeded(topicId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(topicActionCreators.isLoading(false));
}

function* handleUpdateItemPressed({ payload: { topicId, itemId, note } }) {
  const topic = yield call(makeSureTopicIsFetched, topicId);

  yield put(topicActionCreators.isLoading(true));

  const { data } = yield call(updateItem, topicId, itemId, topic.decryptedPassword, { note });
  if (data) {
    yield put(topicActionCreators.updateItemSucceeded(topicId, itemId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(topicActionCreators.isLoading(false));
}

function* handleDeleteItemPressed({ payload: { topicId, itemId } }) {
  yield put(topicActionCreators.isDeletingItem(true));

  const { data } = yield call(deleteItem, topicId, itemId);
  if (data) {
    yield put(topicActionCreators.deleteItemSucceeded(topicId, itemId));
  }

  yield put(topicActionCreators.isDeletingItem(false));
}

export function* topicSagas() {
  yield all([
    takeLatest(topicActionTypes.FETCH_TOPICS_REQUESTED, handleFetchTopicsRequested),
    takeLatest(topicActionTypes.CREATE_TOPIC_PRESSED, handleCreateTopicPressed),
    takeLatest(topicActionTypes.UPDATE_TOPIC_PRESSED, handleUpdateTopicPressed),
    takeLatest(topicActionTypes.FETCH_ITEMS_REQUESTED, handleFetchItemsRequested),
    takeLatest(topicActionTypes.MONTH_CHANGED, handleMonthChanged),
    takeLatest(topicActionTypes.CREATE_ITEM_PRESSED, handleCreateItemPressed),
    takeLatest(topicActionTypes.UPDATE_ITEM_PRESSED, handleUpdateItemPressed),
    takeLatest(topicActionTypes.DELETE_ITEM_PRESSED, handleDeleteItemPressed),
  ]);
}
