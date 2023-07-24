import { Button } from 'grommet';
import React, { useState } from 'react';

import TextEditor from '../../components/TextEditor';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';

function TopicAdd({ isLoading, onCreate }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <>
      <AppBar title="Add topic" hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />

        <Spacer />
        <TextEditor text={note} onChange={setNote} />

        <Spacer />
        <Button
          label="Create topic"
          onClick={() => {
            onCreate(title, note);
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default TopicAdd;
