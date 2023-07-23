import { connect } from 'react-redux';

import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import ItemUpdate from './ItemUpdate';

const mapStateToProps = (state, { params: { topicId, itemId } }) => ({
  topicId,
  itemId,
  item: topicSelectors.getItem(state, topicId, itemId),
  isLoading: topicSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchItems: topicActionCreators.fetchItemsRequested,
  onUpdate: topicActionCreators.updateItemPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdate);
