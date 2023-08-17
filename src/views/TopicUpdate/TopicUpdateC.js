import { connect } from 'react-redux';

import { topicActions, topicSelectors } from '../../store/topic/topicStore';
import TopicUpdate from './TopicUpdate';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.data.getStandaloneItem(state),
  isLoading: topicSelectors.fetchItem.isPending(state),
});

const mapDispatchToProps = {
  onFetchTopic: topicActions.fetchItemRequested,
  onUpdate: topicActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicUpdate);
