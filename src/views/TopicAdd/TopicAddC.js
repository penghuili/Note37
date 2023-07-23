import { connect } from 'react-redux';

import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicAdd from './TopicAdd';

const mapStateToProps = state => ({
  isLoading: topicSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onCreate: topicActionCreators.createTopicPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicAdd);
