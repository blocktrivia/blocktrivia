import React from 'react';
import Header from '../components/Header'
import {Route} from 'react-router-dom';

export const RenderWithHeader = ({
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        <div>
            <Header history={props.history} />
            <Component {...props} />
        </div>
    )}/>
);

export default RenderWithHeader;