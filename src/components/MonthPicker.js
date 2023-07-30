import { Select } from 'grommet';
import React, { useMemo, useState } from 'react';

import HorizontalCenter from '../shared/react-pure/HorizontalCenter';
import { useListener } from '../shared/react/hooks/useListener';

export const ALL = 'All';

function MonthPicker({ value, onChange, startDate, endDate = new Date() }) {
  const [year, setYear] = useState(new Date().getFullYear());
  useListener(value?.year, v => {
    if (v) {
      setYear(v);
    }
  });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  useListener(value?.month, v => {
    if (v) {
      setMonth(v);
    }
  });

  const yearOptions = useMemo(() => {
    const years = [];
    years.push(ALL);
    for (let i = startDate.getFullYear(); i <= endDate.getFullYear(); i++) {
      years.push(i);
    }
    return years.sort((a, b) => b - a);
  }, [startDate, endDate]);
  const monthOptions = useMemo(() => {
    const isStartYear = year === startDate.getFullYear();
    const isEndYear = year === endDate.getFullYear();
    const start = isStartYear ? startDate.getMonth() + 1 : 1;
    const end = isEndYear ? endDate.getMonth() + 1 : 12;
    const months = [];
    months.push(ALL);
    for (let i = start; i <= end; i++) {
      months.push(i);
    }

    return months;
  }, [startDate, endDate, year]);

  return (
    <>
      <HorizontalCenter>
        <Select
          options={yearOptions}
          value={year}
          onChange={({ option }) => {
            if (option === ALL) {
              onChange({ year: ALL, month: ALL });
              return;
            }

            let newMonth = month;
            const isStartYear = option === startDate.getFullYear();
            const isEndYear = option === endDate.getFullYear();
            const startYearMonth = startDate.getMonth() + 1;
            const endYearMonth = endDate.getMonth() + 1;
            if (isStartYear && newMonth < startYearMonth) {
              newMonth = startYearMonth;
            }
            if (isEndYear && newMonth > endYearMonth) {
              newMonth = endYearMonth;
            }
            onChange({ year: option, month: newMonth });
          }}
          width="4rem"
        />
        <Select
          disabled={year === ALL}
          options={monthOptions}
          value={month}
          onChange={({ option }) => onChange({ year, month: option })}
          margin="0 0 0 0.5rem"
          width="4rem"
        />
      </HorizontalCenter>
    </>
  );
}

export default MonthPicker;
