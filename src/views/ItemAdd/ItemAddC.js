import { connect } from 'react-redux';

import { topicActionCreators } from '../../store/topics/topicActions';
import { topicSelectors } from '../../store/topics/topicSelectors';
import ItemAdd from './ItemAdd';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  isLoading: topicSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onCreate: topicActionCreators.createItemPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemAdd);
