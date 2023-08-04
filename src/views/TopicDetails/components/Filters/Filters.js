import React from 'react';

import MonthPicker from '../../../../components/MonthPicker';
import HorizontalCenter from '../../../../shared/react-pure/HorizontalCenter';
import LoadMore from '../LoadMore';

function Filters({ topicId, topic, month, isLoadingItems, onFetchItems, onMonthChange }) {
  if (!topic) {
    return null;
  }

  return (
    <HorizontalCenter>
      <LoadMore topic={topic} isLoadingItems={isLoadingItems} onFetchItems={onFetchItems} />
      <MonthPicker
        startDate={new Date(topic.createdAt)}
        endDate={new Date()}
        value={month}
        onChange={value => onMonthChange(topicId, value)}
      />
    </HorizontalCenter>
  );
}

export default Filters;
