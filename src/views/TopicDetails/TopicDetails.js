import { Box, Button, Heading, Menu, Spinner, Text } from 'grommet';
import { MoreVertical, Refresh } from 'grommet-icons';
import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';

import { format } from 'date-fns';
import apps from '../../shared/js/apps';
import { formatDate } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import AppBar from '../../shared/react/AppBar';
import RouteLink from '../../shared/react/RouteLink';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

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
  isLoading,
  isLoadingItems,
  isDeletingItem,
  onFetchItems,
  onDeleteItem,
  onNav,
}) {
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffectOnce(() => {
    onFetchItems(topicId);
  });

  return (
    <>
      <AppBar title="Topic details" isLoading={isLoading} hasBack />
      <ContentWrapper>
        <HorizontalCenter margin="0 0 1rem">
          <RouteLink
            to={`/t/${topicId}/items/add`}
            label="Create item"
            color="status-ok"
            margin="0 1rem 0 0"
          />
        </HorizontalCenter>

        <Divider />

        {!!topic && (
          <>
            <HorizontalCenter margin="1rem 0">
              <Heading margin="0">{topic.title}</Heading>
              <Menu
                icon={<MoreVertical />}
                items={[
                  {
                    label: 'Update',
                    onClick: () => onNav(`/t/${topicId}/update`),
                    margin: '0.25rem 0',
                  },
                  {
                    label: 'Delete',
                    onClick: () => {},
                    margin: '0.25rem 0',
                    color: 'status-critical',
                  },
                ]}
              />
              {!!topic.hasMore &&
                (isLoadingItems ? (
                  <Spinner size="small" />
                ) : (
                  <Button
                    label="Load more"
                    size="xsmall"
                    icon={<Refresh size="small" color="brand" />}
                    onClick={() => onFetchItems(topicId, topic.startKey)}
                  />
                ))}
            </HorizontalCenter>

            {topic.chartData?.length > 1 && (
              <Box width="100%">
                <ApexCharts
                  type="line"
                  height={350}
                  series={[{ name: 'After', data: topic.chartData }]}
                  options={getChartOptions({
                    xaxisType: 'category',
                    xaxisRotate: 0,
                    colors: [apps.often37.color],
                    tickAmount: 1,
                    yFormatter: value => `${value} days`,
                  })}
                />
              </Box>
            )}

            {topic?.items?.map(item => (
              <Box key={item.sortKey} margin="0 0 1rem">
                <HorizontalCenter>
                  <Text size="xsmall">
                    {format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss EEEEEE')}
                  </Text>
                  <Menu
                    icon={<MoreVertical />}
                    items={[
                      {
                        label: 'Update',
                        onClick: () => onNav(`/t/${topicId}/items/${item.sortKey}/update`),
                        margin: '0.25rem 0',
                      },
                      {
                        label: 'Delete',
                        onClick: () => {
                          setDeletingItemId(item.sortKey);
                          onDeleteItem(topicId, item.sortKey);
                        },
                        margin: '0.25rem 0',
                        color: 'status-critical',
                      },
                    ]}
                  />
                  {deletingItemId === item.sortKey && isDeletingItem && <Spinner size="small" />}
                </HorizontalCenter>
                {!!item.days && `After: ${item.days} ${item.days === 1 ? 'day' : 'days'}`}
                {!!item.note && <Text style={{ whiteSpace: 'pre-line' }}>{item.note}</Text>}
              </Box>
            ))}
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default TopicDetails;
