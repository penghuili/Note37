import { ALL } from '../../components/MonthPicker';

export const topicSelectors = {
  isLoading: state => state.topics.isLoading,
  getTopics: state => state.topics.topics,
  getTopic: (state, topicId) => state.topics.topics.find(topic => topic.sortKey === topicId),
  getEditingTopic: state => state.topics.editingTopic,
  getMonth: (state, topicId) => {
    const topic = topicSelectors.getTopic(state, topicId);
    return topic?.month || ALL;
  },
};
