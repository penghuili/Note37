import { connect } from 'react-redux';

import { noteActions, noteSelectors } from '../../store/note/noteStore';
import NoteAdd from './NoteAdd';

const mapStateToProps = state => ({
  isCreating: noteSelectors.createItem.isPending(state),
});

const mapDispatchToProps = {
  onCreate: noteActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteAdd);
