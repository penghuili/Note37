import { connect } from 'react-redux';

import TopicsReorder from './TopicsReorder';
import { topicActions, topicSelectors } from '../../store/topic/topicStore';

const mapStateToProps = state => ({
  isLoading: topicSelectors.fetchItems.isPending(state),
  topics: topicSelectors.data.getItems(state),
});

const mapDispatchToProps = {
  onFetch: topicActions.fetchItemsRequested,
  onUpdate: topicActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsReorder);
