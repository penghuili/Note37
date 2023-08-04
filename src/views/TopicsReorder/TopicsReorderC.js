import { connect } from 'react-redux';

import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicsReorder from './TopicsReorder';

const mapStateToProps = state => ({
  isLoading: topicSelectors.isLoading(state),
  topics: topicSelectors.getTopics(state),
});

const mapDispatchToProps = {
  onFetch: topicActionCreators.fetchTopicsRequested,
  onUpdate: topicActionCreators.updateTopicPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsReorder);
