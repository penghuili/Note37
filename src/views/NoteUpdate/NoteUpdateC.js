import { connect } from 'react-redux';

import { noteActions, noteSelectors } from '../../store/note/noteStore';
import NoteUpdate from './NoteUpdate';

const mapStateToProps = (state, { params: { topicId, noteId } }) => ({
  noteId,
  note:
    noteSelectors.data.getStandaloneItem(state) ||
    noteSelectors.data.getItem(state, undefined, noteId),
  isLoading: noteSelectors.fetchItem.isPending(state, topicId),
  isUpdating: noteSelectors.updateItem.isPending(state, topicId),
});

const mapDispatchToProps = {
  onFetch: noteActions.fetchItemRequested,
  onUpdate: noteActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteUpdate);
