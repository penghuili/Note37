import { Button } from 'grommet';
import React, { useState } from 'react';

import AreaField from '../../shared/react-pure/AreaField';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useListener } from '../../shared/react/hooks/useListener';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function TopicUpdate({ isLoading, topicId, topic, onFetchTopics, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(topic?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(topic?.note, value => setNote(value || ''));

  useEffectOnce(() => {
    onFetchTopics(topicId);
  });

  return (
    <>
      <AppBar title="Update topic" hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <AreaField
          label="Note"
          placeholder="Note"
          value={note}
          minHeight="13rem"
          onChange={setNote}
        />

        <Spacer />
        <Button
          label="Update topic"
          onClick={() => {
            onUpdate(topicId, title, note);
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default TopicUpdate;
