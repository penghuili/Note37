import { Button, Text } from 'grommet';
import React from 'react';

import { formatDateTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import useAutoSave from '../../shared/react/hooks/useAutoSave';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import TextEditor from '../../shared/react/TextEditor';

function ItemUpdate({ topicId, itemId, item, isLoading, onFetchItem, onSetEditingItem, onUpdate }) {
  function handleAutoSave(newNote) {
    if (newNote === item?.note) {
      return;
    }
    onUpdate({ topicId, itemId, note: newNote, goBack: false });
  }

  const [note, setNote] = useAutoSave(handleAutoSave, 2000);
  useListener(item?.note, value => setNote(value || ''));

  useEffectOnce(() => {
    onFetchItem(topicId, itemId);
    return () => {
      onSetEditingItem(null);
    };
  });

  const date = item?.updatedAt || item?.createdAt;
  return (
    <>
      <AppBar title="Update item" hasBack isLoading={isLoading} />
      <ContentWrapper>
        <Text>{!!date && formatDateTime(new Date(date))}</Text>
        <Spacer />
        <TextEditor text={note} onChange={setNote} />
        <Spacer />
        <Button
          label="Update item"
          onClick={() => {
            onUpdate({ topicId, itemId, note, goBack: true });
          }}
          disabled={isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default ItemUpdate;
