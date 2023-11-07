import { Anchor, Avatar, Heading, Text } from 'grommet';
import React from 'react';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import ChangeTheme from '../../shared/react/ChangeTheme';

function Maintenance() {
  return (
    <>
      <ContentWrapper>
        <HorizontalCenter margin="2rem 0 1rem">
          <Avatar src={`${process.env.REACT_APP_ASSETS_FOR_CODE}/logo.png`} />{' '}
          <Heading level="2" margin="0 0 0 1rem">
            Note37
          </Heading>
        </HorizontalCenter>

        <Text>
          Note37 is migrated to Encrypt37, you can visit it now at{' '}
          <Anchor label="app.encrypt37.com" href="https://app.encrypt37.com" />
        </Text>

        <Spacer size="4rem" />
        <Anchor label="Contact" href="https://encrypt37.com/contact" target="_blank" />

        <Spacer />
        <Divider />
        <Spacer />

        <ChangeTheme />
      </ContentWrapper>
    </>
  );
}

export default Maintenance;
