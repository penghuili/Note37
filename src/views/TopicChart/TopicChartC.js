import { connect } from 'react-redux';

import { itemActions, itemSelectors } from '../../store/item/itemStore';
import TopicChart from './TopicChart';
import { topicSelectors } from '../../store/topic/topicStore';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.data.getItem(state, undefined, topicId),
  chartData: itemSelectors.data.getChartData(state, topicId),
  isLoadingItems: itemSelectors.fetchItems.isPending(state, topicId),
});

const mapDispatchToProps = {
  onFetchItems: itemActions.fetchItemsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicChart);
