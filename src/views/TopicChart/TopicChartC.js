import { connect } from 'react-redux';

import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicChart from './TopicChart';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.getTopic(state, topicId),
  isLoading: topicSelectors.isLoading(state),
  isLoadingItems: topicSelectors.isLoadingItems(state),
});

const mapDispatchToProps = {
  onFetchItems: topicActionCreators.fetchItemsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicChart);
