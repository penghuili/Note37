import { connect } from 'react-redux';

import { topicActions, topicSelectors } from '../../store/topic/topicStore';
import Topics from './Topics';

const mapStateToProps = state => ({
  topics: topicSelectors.data.getItems(state),
  isLoading: topicSelectors.fetchItems.isPending(state),
});

const mapDispatchToProps = {
  onFetch: topicActions.fetchItemsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
