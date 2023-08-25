import { Button, Spinner } from 'grommet';
import { Refresh } from 'grommet-icons';
import React from 'react';

function LoadMore({ topicId, hasMore, startKey, isLoadingItems, onFetchItems }) {
  if (!hasMore) {
    return null;
  }

  return isLoadingItems ? (
    <Spinner size="small" />
  ) : (
    <Button
      label="Load more"
      size="xsmall"
      icon={<Refresh size="small" color="brand" />}
      onClick={() => onFetchItems({ id: topicId, startKey })}
    />
  );
}

export default LoadMore;
