import { Button } from 'grommet';
import React, { useState } from 'react';

import { group37Prefix } from '../../shared/js/apps';
import { LocalStorage } from '../../shared/js/LocalStorage';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import GroupsSelector from '../../shared/react/GroupsSelector';
import TextEditor from '../../shared/react/TextEditor';
import { groupActions, groupSelectors } from '../../store/group/groupStore';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { getQueryParams } from '../../shared/react/routeHelpers';

const storageKey = 'note37-item-add';
function NoteAdd({ isCreating, onCreate }) {
  const [note, setNote] = useState(LocalStorage.get(storageKey) || '');
  const [date, setDate] = useState(new Date());
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  useEffectOnce(() => {
    const queryParams = getQueryParams();
    if (queryParams.groupId) {
      setSelectedGroupIds([queryParams.groupId]);
    }
  });

  return (
    <>
      <AppBar title="Add note" hasBack isLoading={isCreating} />
      <ContentWrapper>
        <DatePicker label="Date" showTime value={date} onChange={setDate} />

        <GroupsSelector
          group37Prefix={group37Prefix.note37}
          groupSelectors={groupSelectors}
          groupActions={groupActions}
          selectedGroups={selectedGroupIds}
          onSelect={setSelectedGroupIds}
        />

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
          label="Create note"
          onClick={() => {
            onCreate({
              note,
              date: new Date(date).getTime(),
              groupIds: selectedGroupIds,
              goBack: true,
            });
            LocalStorage.remove(storageKey);
          }}
          disabled={!date || isCreating}
        />
      </ContentWrapper>
    </>
  );
}

export default NoteAdd;
