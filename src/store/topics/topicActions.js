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
  MONTH_CHANGED: 'topic/YEAR_MONTH_CHANGED',
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
  monthChanged(topicId, month) {
    return { type: topicActionTypes.MONTH_CHANGED, payload: { topicId, month } };
  },
};
