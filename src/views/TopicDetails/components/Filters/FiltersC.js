import { connect } from 'react-redux';

import { topicActionCreators } from '../../../../store/topics/topicActions';
import { topicSelectors } from '../../../../store/topics/topicSelectors';
import Filters from './Filters';

const mapStateToProps = (state, { topicId }) => ({
  topicId,
  topic: topicSelectors.getTopic(state, topicId),
  month: topicSelectors.getMonth(state, topicId),
  isLoadingItems: topicSelectors.isLoadingItems(state),
  isDeletingItem: topicSelectors.isDeletingItem(state),
});

const mapDispatchToProps = {
  onFetchItems: topicActionCreators.fetchItemsRequested,
  onMonthChange: topicActionCreators.monthChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
