import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { itemActions, itemSelectors } from '../../store/item/itemStore';
import TopicDetails from './TopicDetails';
import { topicActions, topicSelectors } from '../../store/topic/topicStore';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.data.getItem(state, undefined, topicId),
  items: itemSelectors.data.getItems(state, topicId),
  isLoadingItems: itemSelectors.fetchItems.isPending(state, topicId),
  isDeletingItem: itemSelectors.deleteItem.isPending(state, topicId),
  hasMore: itemSelectors.data.hasMore(state, topicId),
  startKey: itemSelectors.data.getStartKey(state, topicId),
  isDeletingTopic: topicSelectors.deleteItem.isPending(state),
});

const mapDispatchToProps = {
  onFetchItems: itemActions.fetchItemsRequested,
  onDeleteItem: itemActions.deleteRequested,
  onUpdateItem: itemActions.updateRequested,
  onDeleteTopic: topicActions.deleteRequested,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetails);
