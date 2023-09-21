import { Text } from 'grommet';
import React, { useEffect, useState } from 'react';

import NoteItem from '../../components/NoteItem';
import { group37Prefix } from '../../shared/js/apps';
import { formatDate } from '../../shared/js/date';
import AnimatedList from '../../shared/react-pure/AnimatedList';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import FloatingButton from '../../shared/react-pure/FloatingButton';
import LoadMore from '../../shared/react-pure/LoadMore';
import AppBar from '../../shared/react/AppBar';
import GroupFilter from '../../shared/react/GroupFilter';
import { parseEndTime, parseStartTime } from '../../shared/react/GroupFilter/GroupFilter';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { getQueryParams, objectToQueryString } from '../../shared/react/routeHelpers';
import { groupSelectors } from '../../store/group/groupStore';

function Notes({
  notes,
  hasMore,
  startKey,
  isLoading,
  isCreating,
  isDeleting,
  onFetch,
  onFetchGroups,
  onUpdate,
  onDelete,
  onNav,
}) {
  const [selectedGroupId, setSelectedGroupId] = useState(undefined);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const queryParams = getQueryParams();

  useEffectOnce(() => {
    onFetchGroups({ prefix: group37Prefix.note37 });
  });

  useEffect(() => {
    onFetch({
      force: true,
      groupId: queryParams.groupId,
      startTime: parseStartTime(queryParams.startTime),
      endTime: parseEndTime(queryParams.endTime),
    });

    setSelectedGroupId(queryParams.groupId);
    setStartTime(queryParams.startTime);
    setEndTime(queryParams.endTime);
  }, [onFetch, queryParams.groupId, queryParams.startTime, queryParams.endTime]);

  function navigate(newGroupId, newStartTime, newEndTime) {
    const queryString =
      objectToQueryString({
        groupId: newGroupId,
        startTime: newStartTime,
        endTime: newEndTime,
      }) || Date.now();

    onNav(`/?${queryString}`);
  }

  return (
    <>
      <AppBar title="Note37" isLoading={isLoading || isCreating || isDeleting} />
      <ContentWrapper>
        <GroupFilter
          groupSelectors={groupSelectors}
          selectedGroupId={selectedGroupId}
          onSelectGroup={value => {
            setSelectedGroupId(value?.sortKey);
            navigate(value?.sortKey, startTime, endTime);
          }}
          startTime={startTime ? new Date(startTime) : null}
          endTime={endTime ? new Date(endTime) : null}
          onSelectDateRange={({ startDate, endDate }) => {
            if (startDate && endDate) {
              const newStartTime = formatDate(startDate);
              const newEndTime = formatDate(endDate);
              setStartTime(newStartTime);
              setEndTime(newEndTime);
              navigate(selectedGroupId, newStartTime, newEndTime);
            } else {
              setStartTime(null);
              setEndTime(null);
              navigate(selectedGroupId, null, null);
            }
          }}
        />

        {!!notes?.length && (
          <AnimatedList
            items={notes}
            renderItem={item => (
              <NoteItem
                item={item}
                isDeleting={deletingItemId === item.sortKey && isDeleting}
                onUpdate={content => {
                  onUpdate({ itemId: item.sortKey, note: content, goBack: false });
                }}
                onDelete={() => {
                  setDeletingItemId(item.sortKey);
                  onDelete({ itemId: item.sortKey, goBack: false });
                }}
                onNav={() => onNav(`/notes/${item.sortKey}/update`)}
              />
            )}
          />
        )}

        <LoadMore
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={() =>
            onFetch({
              startKey,
              groupId: selectedGroupId,
              force: true,
              startTime,
              endTime,
            })
          }
        />

        {!notes?.length && !isLoading && (
          <>
            <Text>No notes.</Text>
          </>
        )}

        <FloatingButton
          onClick={() => onNav(`/notes/add${selectedGroupId ? `?groupId=${selectedGroupId}` : ''}`)}
        />
      </ContentWrapper>
    </>
  );
}

export default Notes;
