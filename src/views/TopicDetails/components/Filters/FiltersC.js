import { connect } from 'react-redux';

import { itemActions, itemSelectors } from '../../../../store/item/itemStore';
import Filters from './Filters';
import { topicSelectors } from '../../../../store/topic/topicStore';

const mapStateToProps = (state, { topicId }) => ({
  topicId,
  topic: topicSelectors.data.getItem(state, undefined, topicId),
  month: itemSelectors.data.getMonth(state, topicId),
  isLoadingItems: itemSelectors.fetchItems.isPending(state, topicId),
  isDeletingItem: itemSelectors.deleteItem.isPending(state, topicId),
});

const mapDispatchToProps = {
  onFetchItems: itemActions.fetchItemsRequested,
  onMonthChange: itemActions.monthChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
