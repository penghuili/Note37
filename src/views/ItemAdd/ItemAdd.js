import { Button } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import TextEditor from '../../shared/react/TextEditor';
import { LocalStorage } from '../../shared/js/LocalStorage';

const storageKey = 'note37-item-add';
function ItemAdd({ topicId, isCreating, onCreate }) {
  const [note, setNote] = useState(LocalStorage.get(storageKey) || '');
  const [date, setDate] = useState(new Date());

  return (
    <>
      <AppBar title="Add item" hasBack isLoading={isCreating} />
      <ContentWrapper>
        <DatePicker label="Date" showTime value={date} onChange={setDate} />
        <Spacer />
        <TextEditor
          text={note}
          onChange={value => {
            setNote(value);
            LocalStorage.set(storageKey, value);
          }}
        />

        <Spacer />
        <Button
          label="Create item"
          onClick={() => {
            onCreate({ id: topicId, note, date: new Date(date).getTime(), goBack: true });
            LocalStorage.remove(storageKey);
          }}
          disabled={!date || isCreating}
        />
      </ContentWrapper>
    </>
  );
}

export default ItemAdd;
