import React from 'react';

import MonthPicker from '../../../../components/MonthPicker';
import HorizontalCenter from '../../../../shared/react-pure/HorizontalCenter';
import LoadMore from '../LoadMore';
import { Box } from 'grommet';

function Filters({ topicId, topic, month, isLoadingItems, onFetchItems, onMonthChange }) {
  if (!topic) {
    return null;
  }

  return (
    <HorizontalCenter>
      <MonthPicker
        startDate={new Date(topic.createdAt)}
        endDate={new Date()}
        value={month}
        onChange={value => onMonthChange(topicId, value)}
      />
      <Box width="1rem" />
      <LoadMore topic={topic} isLoadingItems={isLoadingItems} onFetchItems={onFetchItems} />
    </HorizontalCenter>
  );
}

export default Filters;
