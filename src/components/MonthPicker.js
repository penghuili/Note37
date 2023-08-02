import { Select } from 'grommet';
import React, { useMemo } from 'react';

import { add0 } from '../shared/js/utils';
import HorizontalCenter from '../shared/react-pure/HorizontalCenter';

export const ALL = 'All';

function MonthPicker({ value, onChange, startDate, endDate = new Date() }) {
  const options = useMemo(() => {
    const options = [ALL];
    const endDateMonth = endDate.getMonth() + 1;
    const endDateYear = endDate.getFullYear();
    const startDateMonth = startDate.getMonth() + 1;
    const startDateYear = startDate.getFullYear();
    for (let year = endDateYear; year >= startDateYear; year--) {
      for (let month = 12; month >= 1; month--) {
        if (year === startDateYear && month < startDateMonth) {
          continue;
        }
        if (year === endDateYear && month > endDateMonth) {
          continue;
        }
        options.push(`${year}-${add0(month)}`);
      }
    }

    return options;
  }, [startDate, endDate]);

  return (
    <>
      <HorizontalCenter>
        <Select
          options={options}
          value={value}
          onChange={({ option }) => onChange(option)}
          width="6rem"
        />
      </HorizontalCenter>
    </>
  );
}

export default MonthPicker;
