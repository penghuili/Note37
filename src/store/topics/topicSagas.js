import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { ALL } from '../../components/MonthPicker';
import { routeHelpers } from '../../shared/react/routeHelpers';
import { topicActionCreators, topicActionTypes } from './topicActions';
import { createTopic, fetchTopic, fetchTopics, updateTopic } from './topicNetwork';
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

function* handleFetchTopicRequested({ payload: { topicId } }) {
  yield put(topicActionCreators.isLoading(true));

  const { data } = yield call(fetchTopic, topicId);
  if (data) {
    yield put(topicActionCreators.setEditingTopic(data));
  }

  yield put(topicActionCreators.isLoading(false));
}

export function* makeSureTopicIsFetched(topicId) {
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

function* handleUpdateTopicPressed({ payload: { topicId, title, note, position, stayOnPage } }) {
  const topic = yield call(makeSureTopicIsFetched, topicId);

  yield put(topicActionCreators.isLoading(true));

  const { data } = yield call(updateTopic, topicId, topic.decryptedPassword, {
    title,
    note,
    position,
  });
  if (data) {
    yield put(topicActionCreators.updateTopicSucceeded(topicId, data));
    if (!stayOnPage) {
      yield call(routeHelpers.goBack);
    }
  }

  yield put(topicActionCreators.isLoading(false));
}

function* handleMonthChanged({ payload: { topicId, month } }) {
  if (month === ALL) {
    yield put(topicActionCreators.fetchItemsRequested({ topicId }));
    return;
  }

  yield put(topicActionCreators.fetchItemsRequested({ topicId, month }));
}

export function* topicSagas() {
  yield all([
    takeLatest(topicActionTypes.FETCH_TOPICS_REQUESTED, handleFetchTopicsRequested),
    takeLatest(topicActionTypes.FETCH_TOPIC_REQUESTED, handleFetchTopicRequested),
    takeLatest(topicActionTypes.CREATE_TOPIC_PRESSED, handleCreateTopicPressed),
    takeLatest(topicActionTypes.UPDATE_TOPIC_PRESSED, handleUpdateTopicPressed),
    takeLatest(topicActionTypes.MONTH_CHANGED, handleMonthChanged),
  ]);
}
