import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import logo from './assets/logo.png';
import Pitch from './components/Pitch';
import Router from './router';
import apps from './shared/js/apps';
import ContentWrapper from './shared/react-pure/ContentWrapper';
import createTheme from './shared/react-pure/createTheme';
import Divider from './shared/react-pure/Divider';
import Spacer from './shared/react-pure/Spacer';
import AppContainer from './shared/react/AppContainer';
import Door from './shared/react/Door';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import Toast from './shared/react/Toast';
import store from './store';


initShared({ logo, app: apps.note37.name });
const theme = createTheme('#DB4437');

setHook('location', useLocation);
setHook('dispatch', useDispatch);

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <Router />

        <ContentWrapper as="footer">
          <Spacer />
          <Divider />
          <Spacer />
          <Pitch showHome />
        </ContentWrapper>

        <Toast />
      </AppContainer>
      <HooksOutsieWrapper />
      <Door />
    </StoreProvider>
  );
}

export default App;
