import { Box, Heading, Menu, Spinner, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React, { useState } from 'react';

import GapAndAgo from '../../components/GapAndAgo';
import { formatDateWeekTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../shared/react/RouteLink';
import TextEditor from '../../shared/react/TextEditor';
import Filters from './components/Filters';
import LoadMore from './components/LoadMore';

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
    onFetchItems({ topicId });
  });

  return (
    <>
      <AppBar title="Topic details" isLoading={isLoading || isLoadingItems} hasBack />
      <ContentWrapper>
        <HorizontalCenter margin="0 0 1rem">
          <RouteLink
            to={`/topics/${topicId}/items/add`}
            label="Create item"
            color="status-ok"
            margin="0 1rem 0 0"
          />
        </HorizontalCenter>

        <Divider />
        <Spacer />

        {!!topic && (
          <>
            <HorizontalCenter>
              <Heading margin="0">{topic.title}</Heading>
              <Menu
                icon={<MoreVertical />}
                items={[
                  {
                    label: 'Update',
                    onClick: () => onNav(`/topics/${topicId}/update`),
                    margin: '0.25rem 0',
                  },
                  {
                    label: 'Frequency chart',
                    onClick: () => onNav(`/topics/${topicId}/chart`),
                    margin: '0.25rem 0',
                  },
                ]}
              />
            </HorizontalCenter>

            <Spacer />
            <Filters topicId={topicId} />
            <Spacer />

            {!isLoadingItems && !topic.items?.length && (
              <Box margin="1rem 0">
                <Text>No items</Text>
              </Box>
            )}
            {topic.items?.map(item => (
              <Box key={item.sortKey} margin="0 0 1rem">
                <HorizontalCenter>
                  <Text size="xsmall">{formatDateWeekTime(new Date(item.createdAt))}</Text>
                  <Menu
                    icon={<MoreVertical />}
                    items={[
                      {
                        label: 'Update',
                        onClick: () => onNav(`/topics/${topicId}/items/${item.sortKey}/update`),
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
                <GapAndAgo gap={item.gap} ago={item.ago} />
                <Spacer />
                {!!item.note && <TextEditor editable={false} text={item.note} />}
              </Box>
            ))}
            <LoadMore topic={topic} isLoadingItems={isLoadingItems} onFetchItems={onFetchItems} />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default TopicDetails;
