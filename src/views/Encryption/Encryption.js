import { Anchor, Heading, Text } from 'grommet';
import React from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import AppBar from '../../shared/react/AppBar';

function Encryption() {
  return (
    <>
      <AppBar title="How encryption works in Often37?" hasBack />
      <ContentWrapper>
        <Text margin="3rem 0 0">
          Watcher37 uses the famous{' '}
          <Anchor label="openpgpjs" href="https://github.com/openpgpjs/openpgpjs" target="_blank" />{' '}
          algorithm (used by <Anchor label="Proton" href="https://proton.me/" target="_blank" />) to
          do the end-to-end encryption. See what is PGP{' '}
          <Anchor
            label="here"
            href="https://proton.me/blog/what-is-pgp-encryption"
            target="_blank"
          />
          .
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When you signup / signin:
        </Heading>
        <Text margin="1rem 0 0">
          Please check{' '}
          <Anchor label="here" href="https://www.peng.kiwi/link37/encryption/" target="_blank" />
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When you create / update a topic or item:
        </Heading>
        <Text margin="1rem 0 0">
          1. Your device encrypts your content with a random strong password, then it encrypts the
          password with your public key, and save the encrypted password into database;
        </Text>
        <Text margin="1rem 0 0">2. Your device encrypts the password with your public key;</Text>
        <Text margin="1rem 0 0">
          3. Your device sends the encrypted contents and the encrypted password to server, which
          will be saved in database;
        </Text>

        <Heading level="3" margin="3rem 0 0">
          When you decrypt a topic or item:
        </Heading>
        <Text margin="1rem 0 0">
          1. Your device gets the encrypted password and encrypted contents from database;
        </Text>
        <Text margin="1rem 0 0">
          2. Your device decrypts the encrypted password with your private key;
        </Text>
        <Text margin="1rem 0 0">
          3. Your device decrypts the contents with the decrypted password;
        </Text>
      </ContentWrapper>
    </>
  );
}

export default Encryption;
