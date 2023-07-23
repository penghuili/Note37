import { differenceInCalendarDays } from 'date-fns';
import { sharedActionTypes } from '../../shared/react/store/sharedActions';
import { topicActionTypes } from './topicActions';
import uniqBy from 'lodash.uniqby';
import { formatDate } from '../../shared/js/date';

const initialState = {
  isLoading: false,
  isLoadingItems: false,
  isDeletingItem: false,
  topics: [],
};

function handleIsLoading(state, { value }) {
  return { ...state, isLoading: value };
}

function handleIsLoadingItems(state, { value }) {
  return { ...state, isLoadingItems: value };
}

function handleIsDeletingItem(state, { value }) {
  return { ...state, isDeletingItem: value };
}

function handleReset() {
  return initialState;
}

function handleFetchTopicsSucceeded(state, { topics }) {
  return { ...state, topics };
}

function handleCreateTopicSucceeded(state, { topic }) {
  return { ...state, topics: [topic, ...state.topics] };
}

function handleUpdateTopicSucceeded(state, { topicId, topic }) {
  const topics = state.topics.map(t => {
    if (t.sortKey === topicId) {
      return { ...t, ...topic };
    }
    return t;
  });
  return { ...state, topics };
}

function processItems(items) {
  const uniqed = uniqBy(items, item => item.sortKey);

  return uniqed.map((item, index) => {
    if (uniqed[index + 1]) {
      return {
        ...item,
        days: differenceInCalendarDays(
          new Date(item.createdAt),
          new Date(uniqed[index + 1].createdAt)
        ),
      };
    }

    return item;
  });
}

function getChartData(items) {
  return items
    .filter(item => item.days !== undefined)
    .map(item => ({ y: item.days, x: formatDate(new Date(item.createdAt)) }));
}

function handleFetchItemsSucceeded(state, { topicId, items, startKey, hasMore }) {
  const topics = state.topics.map(topic => {
    if (topic.sortKey === topicId) {
      const updatedItems = processItems([...(topic.items || []), ...items]);
      return {
        ...topic,
        items: updatedItems,
        chartData: getChartData(updatedItems),
        startKey,
        hasMore,
      };
    }
    return topic;
  });
  return { ...state, topics };
}

function handleCreateItemSucceeded(state, { topicId, item }) {
  const topics = state.topics.map(topic => {
    if (topic.sortKey === topicId) {
      const updatedItems = processItems([item, ...(topic.items || [])]);
      return { ...topic, items: updatedItems, chartData: getChartData(updatedItems) };
    }
    return topic;
  });
  return { ...state, topics };
}

function handleUpdateItemSucceeded(state, { topicId, itemId, item }) {
  const topics = state.topics.map(topic => {
    if (topic.sortKey === topicId) {
      const updatedItems = processItems(
        topic.items.map(i => {
          if (i.sortKey === itemId) {
            return { ...i, ...item };
          }
          return i;
        })
      );
      return { ...topic, items: updatedItems, chartData: getChartData(updatedItems) };
    }
    return topic;
  });
  return { ...state, topics };
}

function handleDeleteItemSucceeded(state, { topicId, itemId }) {
  const topics = state.topics.map(topic => {
    if (topic.sortKey === topicId) {
      const updatedItems = processItems(topic.items.filter(item => item.sortKey !== itemId));
      return { ...topic, items: updatedItems, chartData: getChartData(updatedItems) };
    }
    return topic;
  });
  return { ...state, topics };
}

export function topicReducer(state = initialState, action) {
  switch (action.type) {
    case topicActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case topicActionTypes.IS_LOADING_ITEMS:
      return handleIsLoadingItems(state, action.payload);

    case topicActionTypes.IS_DELETING_ITEM:
      return handleIsDeletingItem(state, action.payload);

    case topicActionTypes.FETCH_TOPICS_SUCCEEDED:
      return handleFetchTopicsSucceeded(state, action.payload);

    case topicActionTypes.CREATE_TOPIC_SUCCEEDED:
      return handleCreateTopicSucceeded(state, action.payload);

    case topicActionTypes.UPDATE_TOPIC_SUCCEEDED:
      return handleUpdateTopicSucceeded(state, action.payload);

    case topicActionTypes.FETCH_ITEMS_SUCCEEDED:
      return handleFetchItemsSucceeded(state, action.payload);

    case topicActionTypes.CREATE_ITEM_SUCCEEDED:
      return handleCreateItemSucceeded(state, action.payload);

    case topicActionTypes.UPDATE_ITEM_SUCCEEDED:
      return handleUpdateItemSucceeded(state, action.payload);

    case topicActionTypes.DELETE_ITEM_SUCCEEDED:
      return handleDeleteItemSucceeded(state, action.payload);

    case sharedActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
