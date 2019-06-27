import React from 'react';
import { Router, Route, Switch, Redirect, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header'
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import LandingPage from '../components/LandingPage';
import CreateGamePage from '../components/CreateGamePage';
import LobbyPage from '../components/LobbyPage';
import JoinGamePage from '../components/JoinGamePage';
import QuestionPage from '../components/QuestionPage';
import RenderWithHeader from './RenderWithHeader';
import PrivateRoute from '../components/PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
      <div>
          <Switch>
              <RenderWithHeader exact={true} path="/" component={LandingPage} />
              <PrivateRoute exact path="/game/create" component={CreateGamePage} />
              <PrivateRoute exact path="/game" component={DashboardPage} />
              <PrivateRoute exact path="/game/join" component={JoinGamePage} />
              <RenderWithHeader path="/sign-in" component={LoginPage} />
              <PrivateRoute exact path="/game/lobby" component={LobbyPage} />
              <PrivateRoute exact path="/game/play" component={QuestionPage} />
              <RenderWithHeader component={NotFoundPage} />
          </Switch>
      </div>
  </Router>
);

export default AppRouter;