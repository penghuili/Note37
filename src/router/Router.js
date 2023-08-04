import { Spinner } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import HorizontalCenter from '../shared/react-pure/HorizontalCenter';
import ChangePassword from '../shared/react/ChangePassword';
import Security from '../shared/react/Security';
import Setup2FA from '../shared/react/Setup2FA';
import SignIn from '../shared/react/SignIn';
import SignUp from '../shared/react/SignUp';
import Verify2FA from '../shared/react/Verify2FA';
import Account from '../views/Account';
import Encryption from '../views/Encryption';
import ItemAdd from '../views/ItemAdd';
import ItemUpdate from '../views/ItemUpdate';
import Privacy from '../views/Privacy';
import TopicAdd from '../views/TopicAdd';
import TopicDetails from '../views/TopicDetails';
import Topics from '../views/Topics';
import TopicsReorder from '../views/TopicsReorder';
import TopicUpdate from '../views/TopicUpdate';
import Welcome from '../views/Welcome';

function Router({ isCheckingRefreshToken, isLoggedIn }) {
  if (isCheckingRefreshToken) {
    return (
      <HorizontalCenter justify="center" margin="3rem 0 0">
        <Spinner size="large" />
      </HorizontalCenter>
    );
  }

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/topics/add" component={TopicAdd} />
        <Route path="/topics/reorder" component={TopicsReorder} />
        <Route path="/topics/:topicId" component={TopicDetails} />
        <Route path="/topics/:topicId/update" component={TopicUpdate} />
        <Route path="/topics/:topicId/items/add" component={ItemAdd} />
        <Route path="/topics/:topicId/items/:itemId/update" component={ItemUpdate} />

        <Route path="/account" component={Account} />
        <Route path="/security" component={Security} />
        <Route path="/security/2fa" component={Setup2FA} />
        <Route path="/security/password" component={ChangePassword} />
        <Route path="/encryption" component={Encryption} />
        <Route path="/privacy" component={Privacy} />

        <Route path="/" component={Topics} />
        <Route>{() => <Redirect to="/" />}</Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-in/2fa" component={Verify2FA} />
      <Route path="/encryption" component={Encryption} />
      <Route path="/privacy" component={Privacy} />

      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;
