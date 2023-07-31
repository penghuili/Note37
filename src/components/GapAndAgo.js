import { Text } from 'grommet';
import React from 'react';

function GapAndAgo({ gap, ago }) {
  function renderGap() {
    if (gap.days > 0) {
      return `${gap.days} ${gap.days > 1 ? 'days' : 'day'}`;
    }

    if (gap.hours > 0) {
      return `${gap.hours} ${gap.hours > 1 ? 'hours' : 'hour'}`;
    }

    if (gap.minutes > 0) {
      return `${gap.minutes} ${gap.minutes > 1 ? 'minutes' : 'minute'}`;
    }

    return `${gap.seconds} ${gap.seconds > 1 ? 'seconds' : 'second'}`;
  }
  function renderAgo() {
    if (ago.days > 1) {
      return `${ago.days} days ago`;
    }

    if (ago.days === 1) {
      return 'Yesterday';
    }

    if (ago.hours > 0) {
      return `${ago.hours} ${ago.hours > 1 ? 'hours' : 'hour'} ago`;
    }

    if (ago.minutes > 0) {
      return `${ago.minutes} ${ago.minutes > 1 ? 'minutes' : 'minute'} ago`;
    }

    return `just now`;
  }

  return (
    <>
      {!!ago && <Text size="small">{renderAgo()}</Text>}
      {!!gap && <Text size="small">Since last time: {renderGap()}</Text>}
    </>
  );
}

export default GapAndAgo;
