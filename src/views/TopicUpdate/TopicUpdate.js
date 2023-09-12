import { Button } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import TextEditor from '../../shared/react/TextEditor';

function TopicUpdate({ topicId, topic, isLoading, isUpdating, onFetchTopic, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(topic?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(topic?.note, value => setNote(value || ''));

  useEffectOnce(() => {
    onFetchTopic({ itemId: topicId });
  });

  return (
    <>
      <AppBar title="Update topic" hasBack isLoading={isLoading || isUpdating} />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <TextEditor text={note} onChange={setNote} />

        <Spacer />
        <Button
          label="Update topic"
          onClick={() => {
            onUpdate({ itemId: topicId, title, note, goBack: true });
          }}
          disabled={!title || isLoading || isUpdating}
        />
      </ContentWrapper>
    </>
  );
}

export default TopicUpdate;
