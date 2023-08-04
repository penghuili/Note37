import { Button, Spinner } from 'grommet';
import { Refresh } from 'grommet-icons';
import React from 'react';

function LoadMore({ topic, isLoadingItems, onFetchItems }) {
  if (!topic?.hasMore) {
    return null;
  }

  return isLoadingItems ? (
    <Spinner size="small" />
  ) : (
    <Button
      label="Load more"
      size="xsmall"
      icon={<Refresh size="small" color="brand" />}
      onClick={() => onFetchItems({ topicId: topic.sortKey, startKey: topic.startKey })}
    />
  );
}

export default LoadMore;
