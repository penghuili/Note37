import { call, put, select, takeLatest } from 'redux-saga/effects';

import { ALL } from '../../components/MonthPicker';
import { formatDate } from '../../shared/js/date';
import { safeGet, safeSet } from '../../shared/js/object';
import {
  createDataSelectors,
  createGeneralStore,
  mergeReducers,
  mergeSagas,
} from '../../shared/react/store/storeHelpers';
import { makeSureTopicIsFetched } from '../topic/topicStore';
import { createItem, deleteItem, fetchItem, fetchItems, updateItem } from './itemNetwork';

export const itemDomain = 'item';

const dataSelectors = createDataSelectors(itemDomain);

function splitTime(newerTime, olderTime) {
  const totalSeconds = Math.floor(
    (new Date(newerTime).getTime() - new Date(olderTime).getTime()) / 1000
  );
  const daysRemainder = totalSeconds % (60 * 60 * 24);
  const days = (totalSeconds - daysRemainder) / 60 / 60 / 24;
  const hoursRemainder = daysRemainder % (60 * 60);
  const hours = (daysRemainder - hoursRemainder) / 60 / 60;
  const minutesReminder = hoursRemainder % 60;
  const minutes = (hoursRemainder - minutesReminder) / 60;
  const seconds = minutesReminder;

  return { days, hours, minutes, seconds, totalSeconds };
}

function processDateForItems(items) {
  return items.map((item, index) => {
    const gap = items[index + 1]
      ? splitTime(new Date(item.createdAt), new Date(items[index + 1].createdAt))
      : null;
    const ago = splitTime(new Date(), item.createdAt);

    return { ...item, gap, ago };
  });
}

function getChartData(items) {
  return items
    .filter(item => !!item.gap)
    .map(item => ({
      y: +(item.gap.totalSeconds / 60 / 60 / 24).toFixed(2),
      x: formatDate(new Date(item.createdAt)),
    }))
    .reverse();
}

function processItems(state, id) {
  const items = safeGet(state, ['data', id, 'items'], []);
  const updatedItems = processDateForItems(items);

  return safeSet(state, ['data', id], {
    items: updatedItems,
    chartData: getChartData(updatedItems),
  });
}

const { actions, selectors, reducer, saga } = createGeneralStore(itemDomain, {
  preFetchItems: function* ({ id, month, startKey }) {
    const items = yield select(dataSelectors.getItems, id);
    if (!month && !startKey && items.length) {
      return { continueCall: false };
    }

    const topic = yield call(makeSureTopicIsFetched, id);
    if (!topic) {
      return { continueCall: false };
    }

    return { continueCall: true, result: topic };
  },
  fetchItems: async ({ id, startKey, month }, topic) => {
    return fetchItems(id, { startKey, month }, topic.decryptedPassword);
  },
  onFetchItemsSucceeded: (state, { payload: { id } }) => {
    return processItems(state, id);
  },
  preFetchItem: function* ({ id }) {
    const topic = yield call(makeSureTopicIsFetched, id);
    if (!topic) {
      return { continueCall: false };
    }

    return { continueCall: true, result: topic };
  },
  fetchItem: async ({ id, itemId }, topic) => {
    return fetchItem(id, itemId, topic.decryptedPassword);
  },
  preCreateItem: function* ({ id }) {
    const topic = yield call(makeSureTopicIsFetched, id);
    if (!topic) {
      return { continueCall: false };
    }

    return { continueCall: true, result: topic };
  },
  createItem: async ({ id, note, date }, topic) => {
    return createItem(id, { note, date }, topic.decryptedPassword);
  },
  onCreateItemSucceeded: (state, { payload: { id } }) => {
    return processItems(state, id);
  },
  preUpdateItem: function* ({ id }) {
    const topic = yield call(makeSureTopicIsFetched, id);
    if (!topic) {
      return { continueCall: false };
    }

    return { continueCall: true, result: topic };
  },
  updateItem: async ({ id, itemId, note }, topic) => {
    return updateItem(id, itemId, { note }, topic.decryptedPassword);
  },
  onUpdateItemSucceeded: (state, { payload: { id } }) => {
    return processItems(state, id);
  },
  deleteItem: async ({ id, itemId }) => {
    return deleteItem(id, itemId);
  },
  onDeleteItemSucceeded: (state, { payload: { id } }) => {
    return processItems(state, id);
  },
});

const MONTH_CHANGED = `${itemDomain}/MONTH_CHANGED`;
const customReducer = (state = {}, action) => {
  switch (action.type) {
    case MONTH_CHANGED:
      return safeSet(state, ['data', action.payload.id], {
        items: [],
        month: action.payload.month,
      });
    default:
      return state;
  }
};

function* customSaga() {
  yield takeLatest(MONTH_CHANGED, function* ({ payload: { id, month } }) {
    if (month === ALL) {
      yield put(actions.fetchItems.requested({ id }));
      return;
    }

    yield put(actions.fetchItems.requested({ id, month }));
  });
}

export const itemActions = {
  fetchItemsRequested: actions.fetchItems.requested.action,
  fetchItemRequested: actions.fetchItem.requested.action,
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
  monthChanged: ({ id, month }) => ({ type: MONTH_CHANGED, payload: { id, month } }),
};

export const itemSelectors = {
  ...selectors,
  data: {
    ...dataSelectors,
    getChartData: (state, id) => safeGet(state, [itemDomain, 'data', id, 'chartData']),
    getMonth: (state, id) => safeGet(state, [itemDomain, 'data', id, 'month'], ALL),
  },
};

export const itemReducer = mergeReducers([reducer, customReducer]);

export const itemSagas = mergeSagas([saga, customSaga]);
