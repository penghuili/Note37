import { Box, Text } from 'grommet';
import React from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../shared/react/RouteLink';

function Topics({ topics, isLoading, onFetch }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Often37" isLoading={isLoading} />
      <ContentWrapper>
        <HorizontalCenter margin="0 0 1rem">
          <RouteLink to="/topics/add" label="Create topic" color="status-ok" margin="0 1rem 0 0" />
        </HorizontalCenter>
        <Divider />
        <Spacer />

        {!!topics?.length && (
          <Box direction="row" wrap>
            {topics.map(topic => (
              <Box key={topic.sortKey} margin="0 1rem 1rem 0">
                <RouteLink to={`/topics/${topic.sortKey}`} label={topic.title} />
              </Box>
            ))}
          </Box>
        )}

        {!topics?.length && !isLoading && (
          <>
            <Text margin="0 0 1rem">No topics yet.</Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Topics;
