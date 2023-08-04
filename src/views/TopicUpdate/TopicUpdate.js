import { Box, Button, RadioButton, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import TextEditor from '../../shared/react/TextEditor';

function TopicUpdate({ isLoading, topicId, topic, onFetchTopic, onSetEditingTopic, onUpdate }) {
  const [title, setTitle] = useState('');
  useListener(topic?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(topic?.note, value => setNote(value || ''));
  const [showChart, setShowChart] = useState(true);
  useListener(topic?.showChart, value => setShowChart(!!value));

  useEffectOnce(() => {
    onFetchTopic(topicId);

    return () => {
      onSetEditingTopic(null);
    };
  });

  return (
    <>
      <AppBar title="Update topic" hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <TextEditor text={note} onChange={setNote} />

        <Spacer />
        <Text>Show chart:</Text>
        <HorizontalCenter>
          <RadioButton
            name="dark"
            checked={showChart}
            label="Yes"
            onChange={() => setShowChart(true)}
            disabled={isLoading}
          />
          <Box width="1rem" />
          <RadioButton
            name="light"
            checked={!showChart}
            label="No"
            onChange={() => setShowChart(false)}
            disabled={isLoading}
          />
        </HorizontalCenter>

        <Spacer />
        <Button
          label="Update topic"
          onClick={() => {
            onUpdate(topicId, { title, note, showChart });
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default TopicUpdate;
