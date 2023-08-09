import { Box, Menu, Spinner, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React from 'react';

import GapAndAgo from '../../../components/GapAndAgo';
import { formatDateWeekTime } from '../../../shared/js/date';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import ShowMoreWrapper from '../../../shared/react-pure/ShowMoreWrapper';
import Spacer from '../../../shared/react-pure/Spacer';
import TextEditor from '../../../shared/react/TextEditor';

function NoteItem({ item, topicId, isDeleting, onDelete, onNav }) {
  return (
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
              onClick: onDelete,
              margin: '0.25rem 0',
              color: 'status-critical',
            },
          ]}
        />
        {isDeleting && <Spinner size="small" />}
      </HorizontalCenter>
      <GapAndAgo gap={item.gap} ago={item.ago} />
      <Spacer />
      {!!item.note && (
        <ShowMoreWrapper>
          <TextEditor editable={false} text={item.note} />
        </ShowMoreWrapper>
      )}
    </Box>
  );
}

export default NoteItem;
