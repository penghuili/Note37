import { orderByPosition } from '../../shared/js/position';
import { sharedActionTypes } from '../../shared/react/store/sharedActions';
import { topicActionTypes } from './topicActions';

const initialState = {
  isLoading: false,
  isLoadingItems: false,
  isDeletingItem: false,
  topics: [],
  editingTopic: null,
  editingItem: null,
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

function handleSetEditingTopic(state, { topic }) {
  return { ...state, editingTopic: topic };
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
  return { ...state, topics: orderByPosition(topics) };
}

function handleMonthChanged(state, { topicId, month }) {
  return {
    ...state,
    topics: state.topics.map(topic => {
      if (topic.sortKey === topicId) {
        return { ...topic, items: [], month };
      }
      return topic;
    }),
  };
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

    case topicActionTypes.SET_EDITING_TOPIC:
      return handleSetEditingTopic(state, action.payload);

    case topicActionTypes.CREATE_TOPIC_SUCCEEDED:
      return handleCreateTopicSucceeded(state, action.payload);

    case topicActionTypes.UPDATE_TOPIC_SUCCEEDED:
      return handleUpdateTopicSucceeded(state, action.payload);

    case topicActionTypes.MONTH_CHANGED:
      return handleMonthChanged(state, action.payload);

    case sharedActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
