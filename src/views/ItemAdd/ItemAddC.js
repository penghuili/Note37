import { connect } from 'react-redux';

import { itemActions, itemSelectors } from '../../store/item/itemStore';
import ItemAdd from './ItemAdd';

const mapStateToProps = (state, { params: { topicId } }) => ({
  topicId,
  isCreating: itemSelectors.createItem.isPending(state, topicId),
});

const mapDispatchToProps = {
  onCreate: itemActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemAdd);
