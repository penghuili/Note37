import { ALL } from '../../components/MonthPicker';

export const topicSelectors = {
  isLoading: state => state.topics.isLoading,
  isLoadingItems: state => state.topics.isLoadingItems,
  isDeletingItem: state => state.topics.isDeletingItem,
  getTopics: state => state.topics.topics,
  getTopic: (state, topicId) => state.topics.topics.find(topic => topic.sortKey === topicId),
  getEditingTopic: state => state.topics.editingTopic,
  getItems: (state, topicId) => {
    const topic = topicSelectors.getTopic(state, topicId);
    return topic?.items || [];
  },
  getItem: (state, topicId, itemId) => {
    const topic = topicSelectors.getTopic(state, topicId);
    return (topic?.items || topic?.monthItems || []).find(item => item.sortKey === itemId);
  },
  getEditingItem: state => state.topics.editingItem,
  getMonth: (state, topicId) => {
    const topic = topicSelectors.getTopic(state, topicId);
    return topic?.month || ALL;
  },
};
