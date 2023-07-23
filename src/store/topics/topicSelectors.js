export const topicSelectors = {
  isLoading: state => state.topics.isLoading,
  isLoadingItems: state => state.topics.isLoadingItems,
  isDeletingItem: state => state.topics.isDeletingItem,
  getTopics: state => state.topics.topics,
  getTopic: (state, topicId) => state.topics.topics.find(topic => topic.sortKey === topicId),
  getItems: (state, topicId) => {
    const topic = state.topics.topics.find(topic => topic.sortKey === topicId);
    return topic?.items || [];
  },
  getItem: (state, topicId, itemId) => {
    const topic = state.topics.topics.find(topic => topic.sortKey === topicId);
    return (topic?.items || []).find(item => item.sortKey === itemId);
  },
};
