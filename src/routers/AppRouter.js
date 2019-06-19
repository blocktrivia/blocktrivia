import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header'
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import CreateGamePage from '../components/CreateGamePage';
import LobbyPage from '../components/LobbyPage';
import JoinGamePage from '../components/JoinGamePage';
import QuestionPage from '../components/QuestionPage';
import RenderWithHeader from './RenderWithHeader';


export const history = createHistory();


const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route exact={true} path="/" component={DashboardPage} />
                <RenderWithHeader  path="/create" component={CreateGamePage} />
                <RenderWithHeader path="/join" component={JoinGamePage} />
                <RenderWithHeader  path="/lobby" component={LobbyPage} />
                <RenderWithHeader  path="/play" component={QuestionPage} />
                <RenderWithHeader component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;