import { connect } from 'react-redux';

import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicUpdate from './TopicUpdate';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.getEditingTopic(state),
  isLoading: topicSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchTopic: topicActionCreators.fetchTopicRequested,
  onSetEditingTopic: topicActionCreators.setEditingTopic,
  onUpdate: topicActionCreators.updateTopicPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicUpdate);
