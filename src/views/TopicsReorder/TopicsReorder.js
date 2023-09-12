import React from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Reorder from '../../shared/react-pure/Reorder';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function TopicsReorder({ isLoading, topics, onFetch, onUpdate }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Reorder topics" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <Reorder
          items={topics}
          onReorder={({ itemId, newPosition, onSucceeded }) => {
            onUpdate({
              itemId,
              position: newPosition,
              goBack: false,
              reorder: true,
              onSucceeded,
            });
          }}
        />
      </ContentWrapper>
    </>
  );
}

export default TopicsReorder;
