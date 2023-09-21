import { Box, Button, Menu, Spinner, Text } from 'grommet';
import { Edit, MoreVertical } from 'grommet-icons';
import React from 'react';

import { formatDateWeekTime } from '../shared/js/date';
import HorizontalCenter from '../shared/react-pure/HorizontalCenter';
import ShowMoreWrapper from '../shared/react-pure/ShowMoreWrapper';
import Spacer from '../shared/react-pure/Spacer';
import GroupsSelected from '../shared/react/GroupsSelected';
import TextEditor from '../shared/react/TextEditor';
import { groupSelectors } from '../store/group/groupStore';
import GapAndAgo from './GapAndAgo';

function NoteItem({ item, isDeleting, onUpdate, onDelete, onNav }) {
  return (
    <Box key={item.sortKey} margin="0 0 1rem">
      <HorizontalCenter>
        <Text size="xsmall">{formatDateWeekTime(new Date(item.createdAt))}</Text>
        <Button
          icon={<Edit />}
          onClick={() => onNav(`/notes/${item.sortKey}/update`)}
          margin="0 0 0 1rem"
          size="small"
        />
        <Menu
          icon={<MoreVertical />}
          items={[
            {
              label: 'Delete',
              onClick: onDelete,
              color: 'status-critical',
            },
          ]}
        />
        {isDeleting && <Spinner size="small" />}
      </HorizontalCenter>
      <GapAndAgo gap={item.gap} ago={item.ago} />
      <Spacer />
      {!!item?.groups?.length && (
        <GroupsSelected selectedGroups={item.groups} groupSelectors={groupSelectors} />
      )}
      {!!item.note && (
        <ShowMoreWrapper>
          <TextEditor
            editable={false}
            text={item.note}
            onReadOnlyChecked={content => {
              onUpdate(content);
            }}
          />
        </ShowMoreWrapper>
      )}
    </Box>
  );
}

export default NoteItem;
