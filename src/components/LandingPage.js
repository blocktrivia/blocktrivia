import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { socket } from '../app';
import Fade from 'react-reveal/Fade';
import { appConfig } from '../utils/constants';
import { UserSession } from 'blockstack';
import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { withCookies, Cookies } from 'react-cookie';
export class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.userSession = new UserSession()
        const { cookies } = props;
      }
    
    componentWillMount() {
        const session = this.userSession

        if(!session.isUserSignedIn() && session.isSignInPending()) {
            session.handlePendingSignIn()
            .then((userData) => {
                // if(!userData.username) {
                //     throw new Error('This app requires a username.')
                // }
                window.location = '/';
            })
            // .catch((e) => {
            //     window.alert(e);
            // });
        }
    }

    render() {
        return (
            <div>
                {this.userSession.isUserSignedIn() ?
                    <Redirect to="/game"/>
                :
                    <Redirect to="/sign-in"/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(withCookies(LandingPage));