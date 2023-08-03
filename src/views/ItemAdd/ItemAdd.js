import { Button } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import TextEditor from '../../shared/react/TextEditor';

function ItemAdd({ topicId, isLoading, onCreate }) {
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  return (
    <>
      <AppBar title="Add item" hasBack />
      <ContentWrapper>
        <DatePicker label="Date" showTime value={date} onChange={setDate} />
        <Spacer />
        <TextEditor text={note} onChange={setNote} />

        <Spacer />
        <Button
          label="Create item"
          onClick={() => {
            onCreate(topicId, note, new Date(date).getTime());
          }}
          disabled={!date || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default ItemAdd;
