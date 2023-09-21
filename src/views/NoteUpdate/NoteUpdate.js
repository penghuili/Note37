import { Button, Text } from 'grommet';
import React from 'react';

import { group37Prefix } from '../../shared/js/apps';
import { formatDateTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import GroupsUpdater from '../../shared/react/GroupsUpdater';
import useAutoSave from '../../shared/react/hooks/useAutoSave';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import TextEditor from '../../shared/react/TextEditor';
import { groupActions, groupSelectors } from '../../store/group/groupStore';

function NoteUpdate({ noteId, note, isLoading, isUpdating, onFetch, onUpdate }) {
  function handleAutoSave(newNote) {
    if (isUpdating || newNote === note?.note || !newNote || !newNote.trim()) {
      return;
    }
    onUpdate({ itemId: noteId, note: newNote, goBack: false });
  }

  const [text, setText] = useAutoSave(handleAutoSave, 2000);
  useListener(note?.note, value => setText(value || ''));

  useEffectOnce(() => {
    onFetch({ itemId: noteId });
  });

  const date = note?.updatedAt || note?.createdAt;
  return (
    <>
      <AppBar title="Update note" hasBack isLoading={isLoading || isUpdating} />
      <ContentWrapper>
        <Text>{!!date && formatDateTime(new Date(date))}</Text>
        <Spacer />

        <GroupsUpdater
          group37Prefix={group37Prefix.note37}
          groupSelectors={groupSelectors}
          groupActions={groupActions}
          item={note}
        />
        <Spacer />

        <TextEditor text={text} onChange={setText} />
        <Spacer />

        <Button
          label="Update note"
          onClick={() => {
            onUpdate({ itemId: noteId, note: text, goBack: true });
          }}
          disabled={isLoading || isUpdating}
        />
      </ContentWrapper>
    </>
  );
}

export default NoteUpdate;
