export const topicActionTypes = {
  IS_LOADING: 'topic/IS_LOADING',
  IS_LOADING_ITEMS: 'topic/IS_LOADING_ITEMS',
  IS_DELETING_ITEM: 'topic/IS_DELETING_ITEM',
  FETCH_TOPICS_REQUESTED: 'topic/FETCH_TOPICS_REQUESTED',
  FETCH_TOPICS_SUCCEEDED: 'topic/FETCH_TOPICS_SUCCEEDED',
  FETCH_TOPIC_REQUESTED: 'topic/FETCH_TOPIC_REQUESTED',
  SET_EDITING_TOPIC: 'topic/SET_EDITING_TOPIC',
  CREATE_TOPIC_PRESSED: 'topic/CREATE_TOPIC_PRESSED',
  CREATE_TOPIC_SUCCEEDED: 'topic/CREATE_TOPIC_SUCCEEDED',
  UPDATE_TOPIC_PRESSED: 'topic/UPDATE_TOPIC_PRESSED',
  UPDATE_TOPIC_SUCCEEDED: 'topic/UPDATE_TOPIC_SUCCEEDED',
  FETCH_ITEMS_REQUESTED: 'topic/FETCH_ITEMS_REQUESTED',
  FETCH_ITEMS_SUCCEEDED: 'topic/FETCH_ITEMS_SUCCEEDED',
  FETCH_ITEM_REQUESTED: 'topic/FETCH_ITEM_REQUESTED',
  SET_EDITING_ITEM: 'topic/SET_EDITING_ITEM',
  MONTH_CHANGED: 'topic/YEAR_MONTH_CHANGED',
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
  fetchTopicRequested(topicId) {
    return { type: topicActionTypes.FETCH_TOPIC_REQUESTED, payload: { topicId } };
  },
  setEditingTopic(topic) {
    return { type: topicActionTypes.SET_EDITING_TOPIC, payload: { topic } };
  },
  createTopicPressed(title, note) {
    return { type: topicActionTypes.CREATE_TOPIC_PRESSED, payload: { title, note } };
  },
  createTopicSucceeded(topic) {
    return { type: topicActionTypes.CREATE_TOPIC_SUCCEEDED, payload: { topic } };
  },
  updateTopicPressed(topicId, { title, note, position, stayOnPage }) {
    return {
      type: topicActionTypes.UPDATE_TOPIC_PRESSED,
      payload: { topicId, title, note, position, stayOnPage },
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
  fetchItemRequested(topicId, itemId) {
    return { type: topicActionTypes.FETCH_ITEM_REQUESTED, payload: { topicId, itemId } };
  },
  setEditingItem(item) {
    return { type: topicActionTypes.SET_EDITING_ITEM, payload: { item } };
  },
  monthChanged(topicId, month) {
    return { type: topicActionTypes.MONTH_CHANGED, payload: { topicId, month } };
  },
  createItemPressed(topicId, note, date) {
    return { type: topicActionTypes.CREATE_ITEM_PRESSED, payload: { topicId, note, date } };
  },
  createItemSucceeded(topicId, item) {
    return { type: topicActionTypes.CREATE_ITEM_SUCCEEDED, payload: { topicId, item } };
  },
  updateItemPressed({ topicId, itemId, note, goBack }) {
    return {
      type: topicActionTypes.UPDATE_ITEM_PRESSED,
      payload: { topicId, itemId, note, goBack },
    };
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
