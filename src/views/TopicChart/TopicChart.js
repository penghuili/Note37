import { Box, Heading, Text } from 'grommet';
import React from 'react';
import ApexCharts from 'react-apexcharts';

import apps from '../../shared/js/apps';
import { formatDate } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import Filters from '../TopicDetails/components/Filters';

function getChartOptions({
  xaxisType = 'datetime',
  xaxisRotate = -45,
  colors,
  yFormatter,
  tickAmount,
  showToolbar = true,
}) {
  return {
    colors,
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: showToolbar,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      type: xaxisType,
      tickAmount,
      labels: {
        rotate: xaxisRotate,
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: yFormatter,
      },
    },
    tooltip: {
      x: {
        formatter: xaxisType === 'datetime' ? value => formatDate(value) : undefined,
      },
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };
}

function TopicDetails({
  topicId,
  topic,
  chartData,
  hasMore,
  startKey,
  isLoadingItems,
  onFetchItems,
}) {
  useEffectOnce(() => {
    onFetchItems({ id: topicId });
  });

  console.log('chartData', chartData)

  return (
    <>
      <AppBar title="Topic frequency chart" isLoading={isLoadingItems} hasBack />
      <ContentWrapper>
        {!!topic && (
          <>
            <Heading margin="0">{topic.title}</Heading>

            <Spacer />
            <Filters topicId={topicId} hasMore={hasMore} startKey={startKey} />
            <Spacer />

            {chartData?.length > 1 ? (
              <Box width="100%">
                <ApexCharts
                  type="line"
                  height={350}
                  series={[{ name: 'After', data: chartData }]}
                  options={getChartOptions({
                    xaxisRotate: 0,
                    colors: [apps.note37.color],
                    tickAmount: 1,
                    yFormatter: value => `${+value.toFixed(2)} days`,
                  })}
                />
              </Box>
            ) : (
              <Box margin="1rem 0">
                <Text>Not enough data to show frequency chart.</Text>
              </Box>
            )}
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default TopicDetails;
