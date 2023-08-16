import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { itemActions, itemSelectors } from '../../store/item/itemStore';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicDetails from './TopicDetails';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.getTopic(state, topicId),
  items: itemSelectors.data.getItems(state, topicId),
  isLoading: topicSelectors.isLoading(state),
  isLoadingItems: itemSelectors.fetchItems.isPending(state, topicId),
  isDeletingItem: itemSelectors.deleteItem.isPending(state, topicId)
});

const mapDispatchToProps = {
  onFetchItems: itemActions.fetchItemsRequested,
  onDeleteItem: itemActions.deleteRequested,
  onUpdateItem: itemActions.updateRequested,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetails);
