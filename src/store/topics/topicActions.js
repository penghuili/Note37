export const topicActionTypes = {
  IS_LOADING: 'topic/IS_LOADING',
  IS_LOADING_ITEMS: 'topic/IS_LOADING_ITEMS',
  IS_DELETING_ITEM: 'topic/IS_DELETING_ITEM',
  FETCH_TOPICS_REQUESTED: 'topic/FETCH_TOPICS_REQUESTED',
  FETCH_TOPICS_SUCCEEDED: 'topic/FETCH_TOPICS_SUCCEEDED',
  CREATE_TOPIC_PRESSED: 'topic/CREATE_TOPIC_PRESSED',
  CREATE_TOPIC_SUCCEEDED: 'topic/CREATE_TOPIC_SUCCEEDED',
  UPDATE_TOPIC_PRESSED: 'topic/UPDATE_TOPIC_PRESSED',
  UPDATE_TOPIC_SUCCEEDED: 'topic/UPDATE_TOPIC_SUCCEEDED',
  FETCH_ITEMS_REQUESTED: 'topic/FETCH_ITEMS_REQUESTED',
  FETCH_ITEMS_SUCCEEDED: 'topic/FETCH_ITEMS_SUCCEEDED',
  YEAR_MONTH_CHANGED: 'topic/YEAR_MONTH_CHANGED',
  CREATE_ITEM_PRESSED: 'topic/CREATE_ITEM_PRESSED',
  CREATE_ITEM_SUCCEEDED: 'topic/CREATE_ITEM_SUCCEEDED',
  UPDATE_ITEM_PRESSED: 'topic/UPDATE_ITEM_PRESSED',
  UPDATE_ITEM_SUCCEEDED: 'topic/UPDATE_ITEM_SUCCEEDED',
  DELETE_ITEM_PRESSED: 'topic/DELETE_ITEM_PRESSED',
  DELETE_ITEM_SUCCEEDED: 'topic/DELETE_ITEM_SUCCEEDED',
};

export const topicActionCreators = {
  isLoading(value) {
    return { type: topicActionTypes.IS_LOADING, payload: { value } };
  },
  isLoadingItems(value) {
    return { type: topicActionTypes.IS_LOADING_ITEMS, payload: { value } };
  },
  isDeletingItem(value) {
    return { type: topicActionTypes.IS_DELETING_ITEM, payload: { value } };
  },
  fetchTopicsRequested() {
    return { type: topicActionTypes.FETCH_TOPICS_REQUESTED };
  },
  fetchTopicsSucceeded(topics) {
    return { type: topicActionTypes.FETCH_TOPICS_SUCCEEDED, payload: { topics } };
  },
  createTopicPressed(title, note) {
    return { type: topicActionTypes.CREATE_TOPIC_PRESSED, payload: { title, note } };
  },
  createTopicSucceeded(topic) {
    return { type: topicActionTypes.CREATE_TOPIC_SUCCEEDED, payload: { topic } };
  },
  updateTopicPressed(topicId, { title, note, showChart }) {
    return {
      type: topicActionTypes.UPDATE_TOPIC_PRESSED,
      payload: { topicId, title, note, showChart },
    };
  },
  updateTopicSucceeded(topicId, topic) {
    return { type: topicActionTypes.UPDATE_TOPIC_SUCCEEDED, payload: { topicId, topic } };
  },
  fetchItemsRequested({ topicId, startKey, month }) {
    return {
      type: topicActionTypes.FETCH_ITEMS_REQUESTED,
      payload: { topicId, startKey, month },
    };
  },
  fetchItemsSucceeded(topicId, { items, startKey, hasMore }) {
    return {
      type: topicActionTypes.FETCH_ITEMS_SUCCEEDED,
      payload: { topicId, items, startKey, hasMore },
    };
  },
  yearMonthChanged(topicId, yearMonth) {
    return { type: topicActionTypes.YEAR_MONTH_CHANGED, payload: { topicId, yearMonth } };
  },
  createItemPressed(topicId, note, date) {
    return { type: topicActionTypes.CREATE_ITEM_PRESSED, payload: { topicId, note, date } };
  },
  createItemSucceeded(topicId, item) {
    return { type: topicActionTypes.CREATE_ITEM_SUCCEEDED, payload: { topicId, item } };
  },
  updateItemPressed(topicId, itemId, note) {
    return { type: topicActionTypes.UPDATE_ITEM_PRESSED, payload: { topicId, itemId, note } };
  },
  updateItemSucceeded(topicId, itemId, item) {
    return { type: topicActionTypes.UPDATE_ITEM_SUCCEEDED, payload: { topicId, itemId, item } };
  },
  deleteItemPressed(topicId, itemId) {
    return { type: topicActionTypes.DELETE_ITEM_PRESSED, payload: { topicId, itemId } };
  },
  deleteItemSucceeded(topicId, itemId) {
    return { type: topicActionTypes.DELETE_ITEM_SUCCEEDED, payload: { topicId, itemId } };
  },
};
