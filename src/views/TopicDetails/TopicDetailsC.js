import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicDetails from './TopicDetails';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.getTopic(state, topicId),
  isLoading: topicSelectors.isLoading(state),
  isLoadingItems: topicSelectors.isLoadingItems(state),
  isDeletingItem: topicSelectors.isDeletingItem(state),
});

const mapDispatchToProps = {
  onFetchItems: topicActionCreators.fetchItemsRequested,
  onDeleteItem: topicActionCreators.deleteItemPressed,
  onUpdateItem: topicActionCreators.updateItemPressed,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetails);
