import { Box, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../shared/react/RouteLink';
import Filters from './components/Filters';
import LoadMore from './components/LoadMore';
import NoteItem from './components/NoteItem';

function TopicDetails({
  topicId,
  topic,
  items,
  hasMore,
  startKey,
  isLoadingItems,
  isDeletingItem,
  isDeletingTopic,
  onFetchItems,
  onUpdateItem,
  onDeleteItem,
  onDeleteTopic,
  onNav,
}) {
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffectOnce(() => {
    onFetchItems({ id: topicId });
  });

  return (
    <>
      <AppBar
        title="Topic details"
        isLoading={isLoadingItems || isDeletingTopic || isDeletingItem}
        hasBack
      />
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
                  {
                    label: 'Delete',
                    onClick: () => onDeleteTopic({ itemId: topicId, goBack: true }),
                    margin: '0.25rem 0',
                    color: 'status-critical',
                  },
                ]}
              />
            </HorizontalCenter>

            <Spacer />
            <Filters topicId={topicId} showLoadMore={false} hasMore={hasMore} startKey={startKey} />
            <Spacer />

            {!isLoadingItems && !items?.length && (
              <Box margin="1rem 0">
                <Text>No items</Text>
              </Box>
            )}
            {items?.map(item => (
              <NoteItem
                key={item.sortKey}
                item={item}
                topicId={topicId}
                isDeleting={deletingItemId === item.sortKey && isDeletingItem}
                onUpdate={content => {
                  onUpdateItem({ id: topicId, itemId: item.sortKey, note: content, goBack: false });
                }}
                onDelete={() => {
                  setDeletingItemId(item.sortKey);
                  onDeleteItem({ id: topicId, itemId: item.sortKey });
                }}
                onNav={() => onNav(`/topics/${topicId}/items/${item.sortKey}/update`)}
              />
            ))}
            <LoadMore
              topicId={topicId}
              hasMore={hasMore}
              startKey={startKey}
              isLoadingItems={isLoadingItems}
              onFetchItems={onFetchItems}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default TopicDetails;
