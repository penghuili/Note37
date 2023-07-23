import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import { formatDateTime } from '../../shared/js/date';
import AreaField from '../../shared/react-pure/AreaField';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';

function ItemUpdate({ topicId, itemId, item, isLoading, onFetchItems, onUpdate }) {
  const [note, setNote] = useState('');
  useListener(item?.note, value => setNote(value || ''));

  useEffectOnce(() => {
    onFetchItems(topicId);
  });

  return (
    <>
      <AppBar title="Update item" hasBack />
      <ContentWrapper>
        {!!item && (
          <>
            <Text>{formatDateTime(new Date(item.updatedAt || item.createdAt))}</Text>
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
              label="Update item"
              onClick={() => {
                onUpdate(topicId, itemId, note);
              }}
              disabled={isLoading}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default ItemUpdate;
