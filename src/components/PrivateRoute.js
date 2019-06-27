import { appConfig } from '../utils/constants';
import { UserSession } from 'blockstack';
import React from 'react';

import Header from '../components/Header'
import { Route, Redirect, withRouter } from 'react-router-dom';

let userSession = new UserSession({ appConfig });

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
      <div>
          <Header history={props.history} />
          {
            !userSession.isUserSignedIn()
            ? <Redirect to="sign-in"></Redirect>
            : <Component {...props} />
          }
      </div>
  )}/>
);

export default PrivateRoute;