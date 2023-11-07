import { select } from 'redux-saga/effects';
import { safeGet, safeSet } from '../../shared/js/object';
import { uniqBy } from '../../shared/js/uniq';
import {
  createDataSelectors,
  createGeneralStore,
  defaultId,
  mergeReducers,
  updateStandaloneItemAndItems,
} from '../../shared/react/store/storeHelpers';
import { groupActions } from '../group/groupStore';
import { createNote, deleteNote, fetchNote, fetchNotes, updateNote } from './noteNetwork';

export const noteDomain = 'note';

const dataSelectors = createDataSelectors(noteDomain);

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

function processItems(state) {
  const items = safeGet(state, [defaultId, 'data', 'items'], []);
  const updatedItems = processDateForItems(items);

  return safeSet(state, [defaultId, 'data'], {
    items: updatedItems,
  });
}

const { actions, selectors, reducer, saga } = createGeneralStore(noteDomain, {
  preFetchItems: function* (payload) {
    const items = yield select(dataSelectors.getItems);
    if (!payload?.force && items.length) {
      return { continueCall: false };
    }

    return { continueCall: true };
  },
  fetchItems: async ({ startKey, groupId, startTime, endTime }) => {
    return fetchNotes({ startKey, groupId, startTime, endTime });
  },
  onFetchItemsSucceeded: state => {
    return processItems(state);
  },
  fetchItem: async ({ itemId }) => {
    return fetchNote(itemId);
  },
  createItem: async ({ note, date, groupIds }) => {
    return createNote({ note, date, groupIds });
  },
  onCreateItemSucceeded: state => {
    return processItems(state);
  },
  preUpdateItem: function* ({ itemId }) {
    const standaloneItem = yield select(dataSelectors.getStandaloneItem);
    const item = yield select(dataSelectors.getItem, undefined, itemId);
    if ((item || standaloneItem)?.sortKey !== itemId) {
      return { continueCall: false };
    }

    return { continueCall: true, result: item };
  },
  updateItem: async ({ itemId, note }, item) => {
    return updateNote(itemId, { note }, item.decryptedPassword);
  },
  onUpdateItemSucceeded: state => {
    return processItems(state);
  },
  deleteItem: async ({ itemId }) => {
    return deleteNote(itemId);
  },
  onDeleteItemSucceeded: state => {
    return processItems(state);
  },
});

const createGroupItemSucceededActionType = groupActions.createGroupItemSucceeded().type;
const deleteGroupItemSucceededActionType = groupActions.deleteGroupItemSucceeded().type;
const customReducer = (state = {}, action) => {
  switch (action.type) {
    case createGroupItemSucceededActionType: {
      const note = safeGet(state, [defaultId, 'data', 'item']);
      if (!note) {
        return state;
      }

      const updatedFile = {
        ...note,
        groups: uniqBy(
          [
            ...(note.groups || []),
            { id: action.payload.data.item.id, itemId: action.payload.data.item.sortKey },
          ],
          'id'
        ),
      };
      const updatedState = updateStandaloneItemAndItems(state, updatedFile);
      return processItems(updatedState);
    }

    case deleteGroupItemSucceededActionType: {
      const note = safeGet(state, [defaultId, 'data', 'item']);
      if (!note) {
        return state;
      }

      const updatedFile = {
        ...note,
        groups: (note.groups || []).filter(group => group.id !== action.payload.data.item.id),
      };
      const updatedState = updateStandaloneItemAndItems(state, updatedFile);
      return processItems(updatedState);
    }

    default:
      return state;
  }
};

export const noteActions = {
  fetchItemsRequested: actions.fetchItems.requested.action,
  fetchItemRequested: actions.fetchItem.requested.action,
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
};

export const noteSelectors = {
  ...selectors,
  data: dataSelectors,
};

export const noteReducer = mergeReducers([reducer, customReducer]);

export const noteSagas = saga;
