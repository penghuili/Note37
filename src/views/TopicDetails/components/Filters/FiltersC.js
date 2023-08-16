import { connect } from 'react-redux';

import { itemActions, itemSelectors } from '../../../../store/item/itemStore';
import { topicActionCreators } from '../../../../store/topics/topicActions';
import { topicSelectors } from '../../../../store/topics/topicSelectors';
import Filters from './Filters';

const mapStateToProps = (state, { topicId }) => ({
  topicId,
  topic: topicSelectors.getTopic(state, topicId),
  month: topicSelectors.getMonth(state, topicId),
  isLoadingItems: itemSelectors.fetchItems.isPending(state, topicId),
  isDeletingItem: itemSelectors.deleteItem.isPending(state, topicId),
});

const mapDispatchToProps = {
  onFetchItems: itemActions.fetchItemsRequested,
  onMonthChange: topicActionCreators.monthChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
