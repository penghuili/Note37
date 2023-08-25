import { connect } from 'react-redux';

import TopicAdd from './TopicAdd';
import { topicActions, topicSelectors } from '../../store/topic/topicStore';

const mapStateToProps = state => ({
  isCreating: topicSelectors.createItem.isPending(state),
});

const mapDispatchToProps = {
  onCreate: topicActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicAdd);
