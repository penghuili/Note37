import React from 'react';

import { calculateItemPosition } from '../../shared/js/position';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DragDrop from '../../shared/react-pure/DragDrop';
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
        <DragDrop
          items={topics}
          onDragEnd={(sourceId, targetId) => {
            const newPosition = calculateItemPosition(topics, sourceId, targetId);
            onUpdate({ itemId: sourceId, position: newPosition, goBack: false, reorder: true });
          }}
        />
      </ContentWrapper>
    </>
  );
}

export default TopicsReorder;
