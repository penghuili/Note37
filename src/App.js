import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import Router from './router';
import apps from './shared/js/apps';
import createTheme from './shared/react-pure/createTheme';
import AppContainer from './shared/react/AppContainer';
import Door from './shared/react/Door';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import Toast from './shared/react/Toast';
import store from './store';

initShared({ logo: `${process.env.REACT_APP_ASSETS_FOR_CODE}/logo.png`, app: apps.note37.name });
const theme = createTheme('#DB4437');

setHook('location', useLocation);
setHook('dispatch', useDispatch);

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <Router />
        <Toast />
      </AppContainer>
      <HooksOutsieWrapper />
      <Door />
    </StoreProvider>
  );
}

export default App;
