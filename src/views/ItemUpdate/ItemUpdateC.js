import { connect } from 'react-redux';

import { itemActions, itemSelectors } from '../../store/item/itemStore';
import ItemUpdate from './ItemUpdate';

const mapStateToProps = (state, { params: { topicId, itemId } }) => ({
  topicId,
  itemId,
  item:
    itemSelectors.data.getStandaloneItem(state, topicId) ||
    itemSelectors.data.getItem(state, topicId, itemId),
  isLoading: itemSelectors.fetchItem.isPending(state, topicId),
});

const mapDispatchToProps = {
  onFetchItem: itemActions.fetchItemRequested,
  onUpdate: itemActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdate);
