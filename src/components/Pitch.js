import { Text } from 'grommet';
import React from 'react';
import { useLocation } from 'wouter';

import RouteLink from '../shared/react/RouteLink';

function Pitch({ showHome }) {
  const [location] = useLocation();

  return (
    <>
      <Text margin="0 0 1rem">
        Notes. <RouteLink label="Encrypted" to="/encryption" />.
      </Text>
      {showHome && location !== '/' && <RouteLink label="← Back to home" to="/" />}
    </>
  );
}

export default Pitch;
