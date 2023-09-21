import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { groupActions } from '../../store/group/groupStore';
import { noteActions, noteSelectors } from '../../store/note/noteStore';
import Notes from './Notes';

const mapStateToProps = state => {
  return {
    notes: noteSelectors.data.getItems(state),
    hasMore: noteSelectors.data.hasMore(state),
    startKey: noteSelectors.data.getStartKey(state),
    isLoading: noteSelectors.fetchItems.isPending(state),
    isCreating: noteSelectors.createItem.isPending(state),
    isDeleting: noteSelectors.deleteItem.isPending(state),
  };
};

const mapDispatchToProps = {
  onFetch: noteActions.fetchItemsRequested,
  onFetchGroups: groupActions.fetchItemsRequested,
  onUpdate: noteActions.updateRequested,
  onDelete: noteActions.deleteRequested,
  onToast: sharedActionCreators.setToast,
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
