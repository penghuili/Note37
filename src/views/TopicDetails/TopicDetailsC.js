import { connect } from 'react-redux';

import { ALL } from '../../components/MonthPicker';
import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import TopicDetails from './TopicDetails';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  topic: topicSelectors.getTopic(state, topicId),
  yearMonth: topicSelectors.getYearMonth(state, topicId) || { year: ALL, month: ALL },
  isLoading: topicSelectors.isLoading(state),
  isLoadingItems: topicSelectors.isLoadingItems(state),
  isDeletingItem: topicSelectors.isDeletingItem(state),
});

const mapDispatchToProps = {
  onFetchItems: topicActionCreators.fetchItemsRequested,
  onDeleteItem: topicActionCreators.deleteItemPressed,
  onYearMonthChange: topicActionCreators.yearMonthChanged,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetails);
