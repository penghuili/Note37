import { connect } from 'react-redux';

import { itemActions, itemSelectors } from '../../store/item/itemStore';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicChart from './TopicChart';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.getTopic(state, topicId),
  chartData: itemSelectors.data.getChartData(state, topicId),
  isLoading: topicSelectors.isLoading(state),
  isLoadingItems: itemSelectors.fetchItems.isPending(state, topicId),
});

const mapDispatchToProps = {
  onFetchItems: itemActions.fetchItemsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicChart);
