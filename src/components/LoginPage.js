import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { socket } from '../app';
import Fade from 'react-reveal/Fade';
import { appConfig } from '../utils/constants';
import { UserSession } from 'blockstack';

export class LoginPage extends React.Component {
    state = {
        userSession: new UserSession({ appConfig })
    }

    handleSignIn() {
        const { userSession } = this.state;
        userSession.redirectToSignIn();
    }

    render() {
        return (
            <div className="content-container">
                <Fade>
                    <div 
                    className="btn btn-primary"
                    onClick={this.handleSignIn.bind(this)}>
                        Signs In
                    </div>
                </Fade>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(LoginPage);