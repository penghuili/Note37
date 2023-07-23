import { connect } from 'react-redux';

import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import Topics from './Topics';

const mapStateToProps = state => ({
  topics: topicSelectors.getTopics(state),
  isLoading: topicSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetch: topicActionCreators.fetchTopicsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
